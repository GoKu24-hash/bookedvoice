import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

type DemoRequestInput = typeof api.demoRequests.create.input._type;

export function useCreateDemoRequest() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: DemoRequestInput) => {
      const validated = api.demoRequests.create.input.parse(data);
      const res = await fetch(api.demoRequests.create.path, {
        method: api.demoRequests.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.demoRequests.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit request");
      }

      return api.demoRequests.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Received!",
        description: "We'll be in touch shortly to show you how BookedVoice works.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
