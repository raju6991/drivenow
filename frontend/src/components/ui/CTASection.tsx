
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-500 to-amber-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Drive Your Affordable Car?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join hundreds of satisfied customers on the Gold Coast who are already saving money with our weekly car rentals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to={createPageUrl('Contact')}>
              <Button 
                size="lg" 
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 h-14 text-lg rounded-xl shadow-lg transition-all"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('CarsAvailable')}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 h-14 px-8 text-lg rounded-xl"
              >
                View Available Cars
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-white/80">0412 345 678</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-white/80">gccheapcarrental@gmail.com</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quick Approval</h3>
              <p className="text-white/80">Get approved in minutes</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}