import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Settings } from "lucide-react";

import ContactForm from "@/components/ui/contactForm";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "0420 919 298",
    href: "tel:0420919298",
  },
  {
    icon: Mail,
    label: "Email",
    value: "gccheapcarrental@gmail.com",
    href: "mailto:gccheapcarrental@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Southport, Gold Coast",
    href: null,
  },
  {
    icon: Settings,
    label: "ABN",
    value: "82 537 705 280",
    href: null,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/61420919298",
  },
];

export default function Contact() {
  const urlParams = new URLSearchParams(window.location.search);
  const prefilledVehicle = urlParams.get("vehicle") || "";

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
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-slate-300">
              Ready to hit the road? Get in touch with us today and we'll help
              you find the perfect car for your needs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Get in Touch
              </h2>

              <div className="space-y-4 mb-10">
                {contactInfo.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                          <item.icon className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">{item.label}</p>
                          <p className="font-semibold text-slate-900">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                          <item.icon className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">{item.label}</p>
                          <p className="font-semibold text-slate-900">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-amber-400" />
                  <h3 className="font-semibold text-white">Response Time</h3>
                </div>
                <p className="text-slate-400">
                  We aim to respond to all enquiries within 24 hours. For urgent
                  matters, please call us directly.
                </p>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm prefilledVehicle={prefilledVehicle} />
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 bg-slate-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">Southport, Gold Coast</p>
            <p className="text-slate-500">Queensland, Australia</p>
          </div>
        </div>
      </section>
    </div>
  );
}
