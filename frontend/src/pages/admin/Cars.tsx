import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
	Edit,
	Image as ImageIcon,
	Loader2,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

interface CarFormData {
	make: string;
	model: string;
	year: number;
	weeklyRate: number;
	available: boolean;
	imageUrl?: string;
}

export default function AdminCars() {
	const [searchTerm, setSearchTerm] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingCar, setEditingCar] = useState<any>(null);
	const [formData, setFormData] = useState<CarFormData>({
		make: "",
		model: "",
		year: new Date().getFullYear(),
		weeklyRate: 0,
		available: true,
		imageUrl: "",
	});
	const [error, setError] = useState("");

	const queryClient = useQueryClient();

	const { data: cars = [], isLoading } = useQuery({
		queryKey: ["admin-cars"],
		queryFn: () => api.get("/cars", true),
	});

	const createMutation = useMutation({
		mutationFn: (data: CarFormData) => api.post("/cars", data, true),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
			setIsDialogOpen(false);
			resetForm();
			toast.success("Car created successfully!");
		},
		onError: (error: any) => {
			setError(error.response?.data?.error || "Failed to create car");
			toast.error(error.response?.data?.error || "Failed to create car");
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: number; data: CarFormData }) =>
			api.put(`/cars/${id}`, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
			setIsDialogOpen(false);
			resetForm();
			toast.success("Car updated successfully!");
		},
		onError: (error: any) => {
			setError(error.response?.data?.error || "Failed to update car");
			toast.error(error.response?.data?.error || "Failed to update car");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (id: number) => api.delete(`/cars/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
			toast.success("Car deleted successfully!");
		},
		onError: (error: any) => {
			setError(error.response?.data?.error || "Failed to delete car");
			toast.error(error.response?.data?.error || "Failed to delete car");
		},
	});

	const filteredCars = cars.filter(
		(car: any) =>
			car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
			car.model.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const resetForm = () => {
		setFormData({
			make: "",
			model: "",
			year: 0,
			weeklyRate: 0,
			available: true,
			imageUrl: "",
		});
		setEditingCar(null);
		setError("");
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		console.log("Form submission started with data:", formData);

		if (
			!formData.make ||
			!formData.model ||
			!formData.year ||
			!formData.weeklyRate
		) {
			setError("Please fill in all required fields");
			return;
		}

		// Convert form data to correct types
		const carData = {
			make: formData.make,
			model: formData.model,
			year: formData.year,
			weeklyRate: formData.weeklyRate,
			available: formData.available,
			imageUrl: formData.imageUrl || "",
		};

		console.log("Submitting car data:", carData);

		if (editingCar) {
			console.log("Updating existing car:", editingCar.id);
			updateMutation.mutate({ id: editingCar.id, data: carData });
		} else {
			console.log("Creating new car");
			createMutation.mutate(carData);
		}
	};

	const handleEdit = (car: any) => {
		setEditingCar(car);
		setFormData({
			make: car.make,
			model: car.model,
			year: car.year,
			weeklyRate: car.weeklyRate,
			available: car.available,
			imageUrl: car.imageUrl || "",
		});
		setIsDialogOpen(true);
	};

	const handleDelete = (car: any) => {
		if (
			window.confirm(
				`Are you sure you want to delete ${car.make} ${car.model}?`,
			)
		) {
			deleteMutation.mutate(car.id);
		}
	};

	const openCreateDialog = () => {
		resetForm();
		setIsDialogOpen(true);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<Loader2 className="h-8 w-8 animate-spin text-amber-500" />
			</div>
		);
	}

	return (
		<div className="w-full space-y-6">
			{/* Header */}
			<div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-slate-900">Cars Management</h1>
					<p className="text-slate-600 mt-2">Manage your vehicle fleet</p>
				</div>
				<Button
					onClick={openCreateDialog}
					className="bg-amber-500 hover:bg-amber-600 text-slate-900"
				>
					<Plus className="mr-2 h-4 w-4" />
					Add Car
				</Button>
			</div>

			{/* Search */}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
				<Input
					placeholder="Search cars by make or model..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="pl-10"
				/>
			</div>

			{/* Error Alert */}
			{error && (
				<Alert variant="destructive">
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{/* Cars Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredCars.map((car: any, index: number) => (
					<motion.div
						key={car.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
					>
						<Card className="overflow-hidden hover:shadow-lg transition-shadow">
							<div className="relative">
								{car.imageUrl ? (
									<img
										src={car.imageUrl}
										alt={`${car.make} ${car.model}`}
										className="w-full h-48 object-cover"
									/>
								) : (
									<div className="w-full h-48 bg-slate-100 flex items-center justify-center">
										<ImageIcon className="h-12 w-12 text-slate-400" />
									</div>
								)}
								<Badge
									className={`absolute top-4 right-4 ${
										car.available
											? "bg-green-500 text-white"
											: "bg-red-500 text-white"
									}`}
								>
									{car.available ? "Available" : "Unavailable"}
								</Badge>
							</div>

							<CardContent className="p-6">
								<div className="flex justify-between items-start mb-4">
									<div>
										<h3 className="text-lg font-bold text-slate-900">
											{car.make} {car.model}
										</h3>
										<p className="text-slate-600">{car.year}</p>
									</div>
									<div className="text-right">
										<p className="text-xl font-bold text-amber-500">
											${car.weeklyRate}
										</p>
										<p className="text-sm text-slate-500">/week</p>
									</div>
								</div>

								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(car)}
										className="flex-1"
									>
										<Edit className="mr-2 h-4 w-4" />
										Edit
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleDelete(car)}
										className="text-red-600 hover:text-red-700 hover:border-red-300"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>

			{/* Create/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{editingCar ? "Edit Car" : "Add New Car"}</DialogTitle>
						<DialogDescription>
							{editingCar
								? "Update the car information below."
								: "Fill in the details to add a new car to your fleet."}
						</DialogDescription>
					</DialogHeader>

					<form onSubmit={handleSubmit}>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="make">Make</Label>
									<Input
										id="make"
										value={formData.make}
										onChange={(e) =>
											setFormData((prev) => ({ ...prev, make: e.target.value }))
										}
										placeholder="Toyota"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="model">Model</Label>
									<Input
										id="model"
										value={formData.model}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												model: e.target.value,
											}))
										}
										placeholder="Camry"
										required
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="year">Year</Label>
									<Input
										id="year"
										type="number"
										value={formData.year}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												year: parseInt(e.target.value) || 0,
											}))
										}
										placeholder="2023"
										min="2000"
										max="2030"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="weeklyRate">Weekly Rate ($)</Label>
									<Input
										id="weeklyRate"
										type="number"
										value={formData.weeklyRate}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												weeklyRate: parseFloat(e.target.value) || 0,
											}))
										}
										placeholder="150"
										min="0"
										step="0.01"
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="imageUrl">Image URL (optional)</Label>
								<Input
									id="imageUrl"
									type="url"
									value={formData.imageUrl}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											imageUrl: e.target.value,
										}))
									}
									placeholder="https://example.com/car-image.jpg"
								/>
							</div>

							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="available"
									checked={formData.available}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											available: e.target.checked,
										}))
									}
									className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
								/>
								<Label htmlFor="available">Available for rental</Label>
							</div>
						</div>

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								className="bg-amber-500 hover:bg-amber-600 text-slate-900"
								disabled={createMutation.isPending || updateMutation.isPending}
							>
								{createMutation.isPending || updateMutation.isPending ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										{editingCar ? "Updating..." : "Creating..."}
									</>
								) : editingCar ? (
									"Update Car"
								) : (
									"Create Car"
								)}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
