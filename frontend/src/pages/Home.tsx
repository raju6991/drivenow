import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Fuel, Settings, Users } from "lucide-react";
import BenefitsSection from "@/components/ui/BenefitsSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/ui/CTASection";
import { Card, CardContent } from "@/components/ui/card";

import HeroSection from "@/components/ui/HeroSection";
import { api } from "@/lib/api";
import { createPageUrl } from "@/utils";

export default function Home() {
	const { data: vehicles = [] } = useQuery({
		queryKey: ["vehicles"],
		queryFn: () => api.get("/cars"),
	});

	const featuredVehicles = vehicles
		.filter((v: { available?: boolean }) => v.available)
		.slice(0, 3);

	return (
		<div>
			<HeroSection />
			<BenefitsSection />

			{/* Featured Vehicles Section */}
			<section className="py-24 bg-slate-50">
				<div className="container mx-auto px-6 lg:px-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="flex flex-col md:flex-row md:items-end justify-between mb-12"
					>
						<div>
							<span className="text-amber-500 font-semibold text-sm tracking-wider uppercase">
								Our Fleet
							</span>
							<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
								Featured Vehicles
							</h2>
							<p className="text-slate-600 mt-3 max-w-xl">
								Quality, reliable vehicles at unbeatable weekly rates. All fully
								insured and ready to drive.
							</p>
						</div>
						<Link to={createPageUrl("CarsAvailable")} className="mt-6 md:mt-0">
							<Button
								variant="outline"
								className="rounded-xl border-slate-300 hover:bg-slate-100"
							>
								View All Cars
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</motion.div>

					{featuredVehicles.length > 0 ? (
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{featuredVehicles.map(
								(
									vehicle: {
										id: number;
										make: string;
										model: string;
										year: number;
										weeklyRate: number;
										available?: boolean;
										imageUrl?: string;
									},
									idx: number,
								) => (
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
													{idx === 0 && (
														<Badge className="absolute top-4 left-4 bg-amber-500 text-white">
															Featured
														</Badge>
													)}
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
															<p className="text-slate-600">
																{vehicle.year} • Sedan
															</p>
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
															<span className="text-sm text-slate-600">
																5 Seats
															</span>
														</div>
														<div className="flex items-center gap-2">
															<Settings className="h-4 w-4 text-amber-500" />
															<span className="text-sm text-slate-600">
																Automatic
															</span>
														</div>
														<div className="flex items-center gap-2">
															<Fuel className="h-4 w-4 text-amber-500" />
															<span className="text-sm text-slate-600">
																Petrol
															</span>
														</div>
														<div className="flex items-center gap-2">
															<Calendar className="h-4 w-4 text-amber-500" />
															<span className="text-sm text-slate-600">
																Weekly
															</span>
														</div>
													</div>

													{/* CTA Button */}
													<Button
														className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
														onClick={() => {
															window.location.href = `/contact?vehicle=${encodeURIComponent(`${vehicle.make} ${vehicle.model}`)}`;
														}}
													>
														Book This Car
													</Button>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								),
							)}
						</div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100"
						>
							<div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
								<span className="text-4xl">🚗</span>
							</div>
							<h3 className="text-xl font-bold text-slate-900 mb-2">
								Coming Soon
							</h3>
							<p className="text-slate-600 mb-6">
								We're preparing our fleet. Contact us to be the first to know
								when vehicles are available.
							</p>
							<Link to={createPageUrl("Contact")}>
								<Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl">
									Get Notified
								</Button>
							</Link>
						</motion.div>
					)}
				</div>
			</section>

			<CTASection />
		</div>
	);
}
