import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Fuel, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";

interface VehicleCardProps {
	vehicle: {
		id: number;
		make: string;
		model: string;
		year: number;
		weeklyRate: number;
		available: boolean;
		imageUrl?: string;
	};
	featured?: boolean;
}

export default function VehicleCard({
	vehicle,
	featured = false,
}: VehicleCardProps) {
	const cardClass = featured
		? "lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white"
		: "bg-white text-slate-900";

	const textClass = featured ? "text-slate-300" : "text-slate-600";

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${cardClass}`}
		>
			<div className="relative">
				<img
					src={
						vehicle.imageUrl ||
						`https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80`
					}
					alt={`${vehicle.make} ${vehicle.model}`}
					className="w-full h-48 object-cover"
				/>
				{featured && (
					<div className="absolute top-4 left-4 bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
						Featured
					</div>
				)}
				{vehicle.available && (
					<div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
						Available
					</div>
				)}
			</div>

			<div className="p-6">
				<div className="flex justify-between items-start mb-4">
					<div>
						<h3 className="text-xl font-bold mb-1">
							{vehicle.make} {vehicle.model}
						</h3>
						<p className={`text-sm ${textClass}`}>{vehicle.year} • Sedan</p>
					</div>
					<div className="text-right">
						<p className="text-2xl font-bold text-amber-500">
							${vehicle.weeklyRate}
						</p>
						<p className={`text-sm ${textClass}`}>/week</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3 mb-6">
					<div className="flex items-center gap-2">
						<Users className="h-4 w-4 text-amber-500" />
						<span className={`text-sm ${textClass}`}>5 Seats</span>
					</div>
					<div className="flex items-center gap-2">
						<Settings className="h-4 w-4 text-amber-500" />
						<span className={`text-sm ${textClass}`}>Automatic</span>
					</div>
					<div className="flex items-center gap-2">
						<Fuel className="h-4 w-4 text-amber-500" />
						<span className={`text-sm ${textClass}`}>Petrol</span>
					</div>
					<div className="flex items-center gap-2">
						<Calendar className="h-4 w-4 text-amber-500" />
						<span className={`text-sm ${textClass}`}>Weekly Rental</span>
					</div>
				</div>

				<Link to={createPageUrl("Contact")}>
					<Button
						className={`w-full ${
							featured
								? "bg-amber-500 hover:bg-amber-600 text-slate-900"
								: "bg-slate-900 hover:bg-slate-800 text-white"
						} rounded-xl`}
					>
						Book Now
					</Button>
				</Link>
			</div>
		</motion.div>
	);
}
