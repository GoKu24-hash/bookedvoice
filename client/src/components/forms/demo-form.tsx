import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(7, "Please enter a valid phone number"),
});

type FormValues = z.infer<typeof formSchema>;

const FORMSPREE_URL = "https://formspree.io/f/mreyrppy";

export function DemoForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Full Name": data.fullName,
          "Email": data.email,
          "Phone Number": data.phoneNumber,
        }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#F4F6F8] rounded-2xl p-8 md:p-12 text-center border border-[#0B3C5D]/10">
        <div className="mx-auto w-16 h-16 bg-[#1FA463]/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#1FA463]" />
        </div>
        <h3 className="text-2xl font-display font-bold text-[#0B3C5D] mb-3">
          Request Received!
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          Thank you. Our team will contact you shortly to schedule your personalized BookedVoice demo.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSubmitted(false)}
          className="font-bold"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-[#0B3C5D]/5 border border-gray-100 p-8 md:p-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0B3C5D] font-semibold text-base">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    data-testid="input-full-name"
                    className="h-14 text-lg bg-[#F4F6F8] border-transparent focus:bg-white focus:border-[#1FA463] focus:ring-[#1FA463]/20 rounded-xl transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0B3C5D] font-semibold text-base">Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@hvaccompany.com"
                    data-testid="input-email"
                    className="h-14 text-lg bg-[#F4F6F8] border-transparent focus:bg-white focus:border-[#1FA463] focus:ring-[#1FA463]/20 rounded-xl transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0B3C5D] font-semibold text-base">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    data-testid="input-phone"
                    className="h-14 text-lg bg-[#F4F6F8] border-transparent focus:bg-white focus:border-[#1FA463] focus:ring-[#1FA463]/20 rounded-xl transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            size="lg"
            data-testid="button-submit-demo"
            className="w-full text-xl mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Book a FREE Demo"}
          </Button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Fast and easy setup.
          </p>
        </form>
      </Form>
    </div>
  );
}
