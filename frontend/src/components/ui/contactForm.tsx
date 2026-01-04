import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function ContactForm({
  prefilledVehicle = "",
}: {
  prefilledVehicle?: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    rental_duration: "",
    vehicle_interest: prefilledVehicle,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send enquiry to backend API
      await api.post("/enquiries", formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
      // You could show an error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 lg:p-12 text-center shadow-xl"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">Thank You!</h3>
        <p className="text-slate-600 mb-6">
          We've received your enquiry and will get back to you within 24 hours.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              phone: "",
              email: "",
              rental_duration: "",
              vehicle_interest: "",
              message: "",
            });
          }}
          variant="outline"
          className="rounded-xl"
        >
          Send Another Enquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl"
    >
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Quick Enquiry</h3>
      <p className="text-slate-500 mb-8">
        Fill out the form and we'll get back to you ASAP
      </p>

      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">
              Full Name *
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-12 rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500"
              placeholder="John Smith"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-700">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="h-12 rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500"
              placeholder="0400 000 000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="h-12 rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500"
            placeholder="john@example.com"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-slate-700">Rental Duration</Label>
            <Select
              value={formData.rental_duration}
              onValueChange={(value: string) =>
                setFormData({ ...formData, rental_duration: value })
              }
            >
              <SelectTrigger className="h-12 rounded-xl border-slate-200">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2-weeks">2 Weeks</SelectItem>
                <SelectItem value="1-month">1 Month</SelectItem>
                <SelectItem value="2-months">2 Months</SelectItem>
                <SelectItem value="3-months">3+ Months</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicle" className="text-slate-700">
              Vehicle Interest
            </Label>
            <Input
              id="vehicle"
              value={formData.vehicle_interest}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, vehicle_interest: e.target.value })
              }
              className="h-12 rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500"
              placeholder="e.g., Nissan Tiida"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-slate-700">
            Message
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="min-h-[120px] rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500 resize-none"
            placeholder="Tell us about your rental needs..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-20 w-20 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-20 w-2- text-white" />
              Send Enquiry
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
}
