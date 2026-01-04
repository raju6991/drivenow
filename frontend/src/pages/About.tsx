import { Link } from "@tanstack/react-router";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Wrench,
  Heart,
  DollarSign,
  Shield,
  Award,
} from "lucide-react";

const values = [
  {
    icon: DollarSign,
    title: "Affordable Prices",
    description:
      "We believe everyone deserves access to reliable transport without breaking the bank.",
  },
  {
    icon: Shield,
    title: "Reliable Cars",
    description:
      "Every vehicle is thoroughly inspected and maintained by qualified mechanics.",
  },
  {
    icon: Heart,
    title: "Friendly Service",
    description:
      "As a small, owner-operated business, we treat every customer like family.",
  },
];

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-amber-400 font-semibold text-sm tracking-wider uppercase">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              About Us
            </h1>
            <p className="text-xl text-slate-300">
              Locally owned and operated, providing affordable transport
              solutions for everyday people on the Gold Coast.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Goldcoast Cheap Car Rental
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  Goldcoast Cheap Car Rental is a locally owned and operated
                  business providing affordable transport solutions for everyday
                  people.
                </p>
                <p>
                  Our vehicles are serviced and maintained by a qualified
                  mechanic, ensuring every customer drives a safe and reliable
                  car.
                </p>
                <p>
                  Whether you're a student, a worker, or new to the Gold Coast,
                  we make renting simple and stress-free.
                </p>
              </div>

              <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
                <div className="flex items-center gap-4 mb-3">
                  <Wrench className="h-6 w-6 text-amber-600" />
                  <h3 className="font-semibold text-lg text-slate-900">
                    Professional Maintenance
                  </h3>
                </div>
                <p className="text-slate-700">
                  All our vehicles are regularly serviced by qualified
                  mechanics, ensuring you always have a safe and reliable car on
                  the road.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-linear-to-r from-amber-400/20 to-amber-500/20 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
                alt="Our team"
                className="relative rounded-3xl shadow-xl w-full object-cover aspect-4/3"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                    <Award className="h-7 w-7 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Owner Operated</p>
                    <p className="text-slate-500 text-sm">
                      Personal service guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900">Our Values</h2>
            <p className="text-slate-600 mt-3">What drives us every day</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <value.icon className="h-10 w-10 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-3xl p-10 lg:p-16 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Experience the difference of renting from a business that truly
              cares about your needs.
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-10 h-14 text-lg rounded-xl"
              >
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
