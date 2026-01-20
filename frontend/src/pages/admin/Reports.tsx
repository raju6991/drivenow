import { useQuery } from "@tanstack/react-query";
import {
	ArrowDownRight,
	ArrowUpRight,
	Calendar,
	Car,
	DollarSign,
	TrendingUp,
	Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

interface ReportStats {
	totalRevenue: number;
	monthlyRevenue: number;
	totalRentals: number;
	activeRentals: number;
	totalCars: number;
	availableCars: number;
	averageRentalDuration: number;
	revenueGrowth: number;
	rentalGrowth: number;
}

export default function AdminReports() {
	const { data: stats = {}, isLoading } = useQuery({
		queryKey: ["admin-reports"],
		queryFn: () => api.get("/admin/reports", true),
	});

	const reportStats = stats as ReportStats;

	const StatCard = ({
		title,
		value,
		change,
		changeLabel,
		icon,
	}: {
		title: string;
		value: string | number;
		change?: number;
		changeLabel?: string;
		icon: React.ReactNode;
	}) => (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-slate-600">
					{title}
				</CardTitle>
				<div className="h-8 w-8 text-amber-500">{icon}</div>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold text-slate-900">{value}</div>
				{change !== undefined && (
					<div
						className={`flex items-center text-xs mt-2 ${
							change >= 0 ? "text-green-600" : "text-red-600"
						}`}
					>
						{change >= 0 ? (
							<ArrowUpRight className="h-3 w-3 mr-1" />
						) : (
							<ArrowDownRight className="h-3 w-3 mr-1" />
						)}
						{Math.abs(change)}% {changeLabel}
					</div>
				)}
			</CardContent>
		</Card>
	);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-slate-900 mb-6">
					Reports & Analytics
				</h1>

				{/* Revenue Stats */}
				<div className="mb-8">
					<h2 className="text-lg font-semibold text-slate-800 mb-4">
						Revenue Overview
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<StatCard
							title="Total Revenue"
							value={`$${(reportStats.totalRevenue || 0).toLocaleString()}`}
							change={reportStats.revenueGrowth}
							changeLabel="from last month"
							icon={<DollarSign className="h-6 w-6" />}
						/>
						<StatCard
							title="Monthly Revenue"
							value={`$${(reportStats.monthlyRevenue || 0).toLocaleString()}`}
							icon={<TrendingUp className="h-6 w-6" />}
						/>
						<StatCard
							title="Average Rental Value"
							value={`$${((reportStats.totalRevenue || 0) / (reportStats.totalRentals || 1)).toFixed(2)}`}
							icon={<DollarSign className="h-6 w-6" />}
						/>
						<StatCard
							title="Revenue per Car"
							value={`$${((reportStats.totalRevenue || 0) / (reportStats.totalCars || 1)).toFixed(2)}`}
							icon={<Car className="h-6 w-6" />}
						/>
					</div>
				</div>

				{/* Rental Stats */}
				<div className="mb-8">
					<h2 className="text-lg font-semibold text-slate-800 mb-4">
						Rental Analytics
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<StatCard
							title="Total Rentals"
							value={reportStats.totalRentals || 0}
							change={reportStats.rentalGrowth}
							changeLabel="from last month"
							icon={<Calendar className="h-6 w-6" />}
						/>
						<StatCard
							title="Active Rentals"
							value={reportStats.activeRentals || 0}
							icon={<Users className="h-6 w-6" />}
						/>
						<StatCard
							title="Average Duration"
							value={`${(reportStats.averageRentalDuration || 0).toFixed(1)} days`}
							icon={<Calendar className="h-6 w-6" />}
						/>
						<StatCard
							title="Car Utilization"
							value={`${(((reportStats.totalCars - reportStats.availableCars) / (reportStats.totalCars || 1)) * 100).toFixed(1)}%`}
							icon={<Car className="h-6 w-6" />}
						/>
					</div>
				</div>

				{/* Fleet Stats */}
				<div>
					<h2 className="text-lg font-semibold text-slate-800 mb-4">
						Fleet Overview
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<StatCard
							title="Total Cars"
							value={reportStats.totalCars || 0}
							icon={<Car className="h-6 w-6" />}
						/>
						<StatCard
							title="Available Cars"
							value={reportStats.availableCars || 0}
							icon={<Car className="h-6 w-6" />}
						/>
						<StatCard
							title="Cars in Use"
							value={
								(reportStats.totalCars || 0) - (reportStats.availableCars || 0)
							}
							icon={<Car className="h-6 w-6" />}
						/>
						<StatCard
							title="Utilization Rate"
							value={`${(((reportStats.totalCars - reportStats.availableCars) / (reportStats.totalCars || 1)) * 100).toFixed(1)}%`}
							icon={<TrendingUp className="h-6 w-6" />}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
