"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { subscribeSchema } from "@/lib/form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function SubscribeForm() {
  const form = useForm<z.infer<typeof subscribeSchema>>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof subscribeSchema>) => {
    toast.success("Berhasil dikirim", {
      description: `Email '${values.email}' udah didaftarin`,
    });

    form.reset();
  };

  return (
    <div className="flex flex-col">
      <h3 className="mb-4 font-semibold">Langganan</h3>
      <p className="mb-4 text-sm text-muted-foreground/75">
        Masukin email kamu buat baca konten baru setiap minggu
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col max-w-md gap-2 sm:flex-row"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email kamu"
                    type="email"
                    {...field}
                    className="border-ring/50 text-muted-foreground/75 hover:text-foreground"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="sm"
            className="transition duration-300 bg-foreground hover:bg-foreground/75"
          >
            <Send className="w-4 h-4 text-background" />
            <span className="sr-only">Langganan</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
