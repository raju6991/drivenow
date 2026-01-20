import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
	Calendar,
	Car as CarIcon,
	Fuel,
	Mail,
	Phone,
	Settings,
	Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";

interface Vehicle {
	id: number;
	make: string;
	model: string;
	year: number;
	weeklyRate: number;
	available: boolean;
	imageUrl?: string;
}

export default function CarsAvailable() {
	const {
		data: vehicles = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["vehicles"],
		queryFn: () => api.get("/cars"),
	});

	const availableVehicles = vehicles.filter((v: Vehicle) => v.available);

	if (isLoading) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
					<p className="text-slate-600 mt-4">Loading available vehicles...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center">
					<CarIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
					<h1 className="text-4xl font-bold text-slate-900 mb-4">
						Unable to Load Vehicles
					</h1>
					<p className="text-slate-600 mb-6">
						Please try again later or contact us directly.
					</p>
					<Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
						<Phone className="mr-2 h-4 w-4" />
						Call Us
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Header */}
			<div className="text-center mb-12">
				<h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
					Available Vehicles
				</h1>
				<p className="text-xl text-slate-600 max-w-2xl mx-auto">
					Choose from our selection of well-maintained, affordable rental cars.
					All vehicles include insurance and maintenance.
				</p>
			</div>

			{availableVehicles.length === 0 ? (
				<div className="text-center py-16">
					<CarIcon className="h-20 w-20 text-slate-400 mx-auto mb-6" />
					<h2 className="text-2xl font-bold text-slate-900 mb-4">
						No Vehicles Available
					</h2>
					<p className="text-slate-600 mb-8">
						We're currently preparing our fleet. Contact us to be notified when
						vehicles become available.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
							<Phone className="mr-2 h-4 w-4" />
							Call Now
						</Button>
						<Button variant="outline">
							<Mail className="mr-2 h-4 w-4" />
							Email Us
						</Button>
					</div>
				</div>
			) : (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{availableVehicles.map((vehicle: Vehicle, idx: number) => (
						<motion.div
							key={vehicle.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
						>
							<Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
								<CardContent className="p-0">
									{/* Vehicle Image */}
									<div className="relative">
										<img
											src={
												vehicle.imageUrl ||
												`https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80`
											}
											alt={`${vehicle.make} ${vehicle.model}`}
											className="w-full h-48 object-cover"
										/>
										{vehicle.available && (
											<Badge className="absolute top-4 right-4 bg-green-500 text-white">
												Available
											</Badge>
										)}
									</div>

									{/* Vehicle Details */}
									<div className="p-6">
										<div className="flex justify-between items-start mb-4">
											<div>
												<h3 className="text-xl font-bold text-slate-900">
													{vehicle.make} {vehicle.model}
												</h3>
												<p className="text-slate-600">{vehicle.year} • Sedan</p>
											</div>
											<div className="text-right">
												<p className="text-2xl font-bold text-amber-500">
													${vehicle.weeklyRate}
												</p>
												<p className="text-sm text-slate-500">/week</p>
											</div>
										</div>

										{/* Features */}
										<div className="grid grid-cols-2 gap-3 mb-6">
											<div className="flex items-center gap-2">
												<Users className="h-4 w-4 text-amber-500" />
												<span className="text-sm text-slate-600">5 Seats</span>
											</div>
											<div className="flex items-center gap-2">
												<Settings className="h-4 w-4 text-amber-500" />
												<span className="text-sm text-slate-600">
													Automatic
												</span>
											</div>
											<div className="flex items-center gap-2">
												<Fuel className="h-4 w-4 text-amber-500" />
												<span className="text-sm text-slate-600">Petrol</span>
											</div>
											<div className="flex items-center gap-2">
												<Calendar className="h-4 w-4 text-amber-500" />
												<span className="text-sm text-slate-600">Weekly</span>
											</div>
										</div>

										{/* CTA Button */}
										<Button
											className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
											onClick={() => {
												// Navigate to contact with vehicle pre-filled
												window.location.href = `/contact?vehicle=${encodeURIComponent(
													`${vehicle.make} ${vehicle.model}`,
												)}`;
											}}
										>
											Book This Car
										</Button>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			)}

			{/* Contact CTA */}
			<div className="mt-16 text-center">
				<div className="bg-slate-900 rounded-3xl p-10 lg:p-16">
					<h2 className="text-3xl font-bold text-white mb-4">
						Need Help Choosing?
					</h2>
					<p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
						Our team is here to help you find the perfect vehicle for your needs
						and budget.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
							<Phone className="mr-2 h-5 w-5" />
							0420 919 298
						</Button>
						<Button
							variant="outline"
							className="border-white text-slate-700 hover:bg-white hover:text-slate-900"
						>
							<Mail className="mr-2 h-5 w-5" />
							gccheapcarrental@gmail.com
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
