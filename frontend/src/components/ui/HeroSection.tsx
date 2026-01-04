
import { Link } from '@tanstack/react-router';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Calendar, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Gold Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-medium">Gold Coast's Most Affordable Rentals</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Drive More,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                Spend Less
              </span>
            </h1>
            
            <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
              Your affordable, reliable, and hassle-free car rental service on the Gold Coast. 
              Perfect for students, workers, new arrivals, and anyone who needs a car without the big cost of buying one.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to={createPageUrl('CarsAvailable')}>
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 h-14 text-lg rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30">
                  View Our Cars
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('Contact')}>
                <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 h-14 px-8 text-lg rounded-xl">
                  Book Now
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Shield, label: 'Full Insurance' },
                { icon: Calendar, label: 'Flexible Terms' },
                { icon: Wrench, label: 'Free Servicing' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-amber-400" />
                  </div>
                  <p className="text-slate-400 text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-amber-500/20 rounded-3xl blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80"
                alt="Car rental"
                className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                <p className="text-slate-500 text-sm">Starting from</p>
                <p className="text-3xl font-bold text-slate-900">$180<span className="text-lg font-normal text-slate-500">/week</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}