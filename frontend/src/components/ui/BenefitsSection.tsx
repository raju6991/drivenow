import { motion } from "framer-motion";
import {
	Car,
	CreditCard,
	DollarSign,
	FileCheck,
	Heart,
	Shield,
} from "lucide-react";

const benefits = [
	{
		icon: DollarSign,
		title: "Cheapest Rates",
		description: "The most affordable weekly rental rates on the Gold Coast",
	},
	{
		icon: Shield,
		title: "Full Insurance",
		description: "Complete insurance coverage included in every rental",
	},
	{
		icon: FileCheck,
		title: "Rego Included",
		description: "Registration included",
	},

	{
		icon: Car,
		title: "Uber Eats Ready",
		description: "All our cars are approved for food delivery work",
	},
	{
		icon: CreditCard,
		title: "Easy Payments",
		description: "Convenient weekly or fortnightly payment options",
	},

	{
		icon: Heart,
		title: "Friendly Service",
		description: "Owner-operated with personal customer care",
	},
];

export default function BenefitsSection() {
	return (
		<section className="py-24 bg-white">
			<div className="container mx-auto px-6 lg:px-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<span className="text-amber-500 font-semibold text-sm tracking-wider uppercase">
						Why Choose Us
					</span>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
						Everything You Need, Nothing You Don't
					</h2>
					<p className="text-slate-600 mt-4 max-w-2xl mx-auto">
						We've stripped away the complexity of car rental to give you exactly
						what matters—reliable transport at an unbeatable price.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{benefits.map((benefit, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.05 }}
							className="group p-6 rounded-2xl bg-slate-50 hover:bg-slate-900 transition-all duration-300 cursor-default"
						>
							<div className="w-14 h-14 rounded-xl bg-amber-500/10 group-hover:bg-amber-500 flex items-center justify-center mb-5 transition-all duration-300">
								<benefit.icon className="h-7 w-7 text-amber-500 group-hover:text-slate-900 transition-colors" />
							</div>
							<h3 className="font-semibold text-lg text-slate-900 group-hover:text-white mb-2 transition-colors">
								{benefit.title}
							</h3>
							<p className="text-slate-600 group-hover:text-slate-300 text-sm leading-relaxed transition-colors">
								{benefit.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
