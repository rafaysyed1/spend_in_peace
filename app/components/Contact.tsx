"use client";

import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function ContactUsForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: { name: string; email: string; message: string }) {
    try {
      setIsLoading(true);
  
      const { data } = await axios.post("/api/contact", values);
  
      toast({
        title: "Success",
        description: data.message || "Your message has been sent successfully.",
      });
  
      reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className="border-b border-white/10 py-32 border-t">
       <div className="w-full max-w-md p-8 bg-[#0D0D0D] rounded-xl shadow-xl border border-gray-800 mx-auto">
      <h2 className="text-2xl font-semibold text-white text-center">Contact Us</h2>
      <p className="text-gray-400 text-sm text-center mt-2">
        Have questions? Reach out and we'll respond as soon as possible.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-300 text-sm mb-2">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            disabled={isLoading}
            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
            })}
            placeholder="Enter your email"
            disabled={isLoading}
            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2">Message</label>
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Enter your message"
            disabled={isLoading}
            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <Button 
          size="lg" 
          type="submit" 
          className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-opacity-90 transition duration-300 shadow-md" 
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
    </section>
   
  );
}
