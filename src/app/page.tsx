"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Background job started");
      },
    })
  );

  return (
    <div>
      <Button
        className="p-4 max-w-7xl mx-auto"
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ text: "Saad" })}
      >
        Invoke
      </Button>
    </div>
  );
};

export default Page;
