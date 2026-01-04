import { useState } from "react";
import { Outlet, Link, useMatchRoute, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Car,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", page: "Home" },
  { name: "Cars Available", page: "CarsAvailable" },
  { name: "Requirements", page: "Requirements" },
  { name: "Terms", page: "Terms" },
  { name: "About", page: "About" },
  { name: "Contact", page: "Contact" },
];

export function RootComponent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const matchRoute = useMatchRoute();
  const location = useLocation();

  // Check if current route is admin route (except login/register)
  const isAdminRoute = location.pathname.startsWith('/admin') && 
    !location.pathname.startsWith('/admin/login') && 
    !location.pathname.startsWith('/admin/register');

  // For admin routes, just render outlet without website layout
  if (isAdminRoute) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a
              href="tel:0420919298"
              className="flex items-center gap-2 hover:text-amber-400 transition-colors"
            >
              <Phone className="h-4 w-4" />
              0420 919 298
            </a>
            <a
              href="mailto:ganiautocare@gmail.com"
              className="flex items-center gap-2 hover:text-amber-400 transition-colors"
            >
              <Mail className="h-4 w-4" />
              ganiautocare@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-400" />
            <span className="hover:text-amber-400">Southport, Gold Coast</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to={createPageUrl("Home")}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                <Car className="h-7 w-7 text-white/90" />
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-slate-900 text-lg leading-tight">
                  Goldcoast
                </p>
                <p className="text-amber-500 text-sm font-medium -mt-0.5">
                  Cheap Car Rental
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = Boolean(
                  matchRoute({ to: createPageUrl(link.page) })
                );
                return (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-amber-100/80 text-amber-600 font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:0420919298">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-900" />
              ) : (
                <Menu className="h-6 w-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100"
            >
              <nav className="container mx-auto px-6 py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = Boolean(
                    matchRoute({ to: createPageUrl(link.page) })
                  );
                  return (
                    <Link
                      key={link.page}
                      to={createPageUrl(link.page)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? "bg-amber-100 text-amber-600 font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-slate-100 mt-4">
                  <a href="tel:0420919298" className="block">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-xl h-12">
                      <Phone className="mr-2 h-5 w-5" />
                      0420 919 298
                    </Button>
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <Car className="h-7 w-7 text-slate-900" />
                </div>
                <div>
                  <p className="font-bold text-white text-lg">
                    Goldcoast Cheap Car Rental
                  </p>
                </div>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Your affordable, reliable, and hassle-free car rental service on
                the Gold Coast. Perfect for students, workers, and new arrivals.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-500 flex items-center justify-center transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-500 flex items-center justify-center transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://wa.me/61420919298"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-500 flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.page}>
                    <Link
                      to={createPageUrl(link.page)}
                      className="text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact Us</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:0420919298"
                    className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-amber-500" />
                    0420 919 298
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ganiautocare@gmail.com"
                    className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-amber-500" />
                    ganiautocare@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Southport, Gold Coast</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Goldcoast Cheap Car Rental. All
              rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to={createPageUrl("Terms")}
                className="text-slate-500 hover:text-amber-400 transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <TanStackRouterDevtools />
    </div>
  );
}
