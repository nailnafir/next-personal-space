"use client";

import { JSX } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentItemModel, SendCommentPayload } from "@/types/models";
import { formatTimeRelativeIndonesia } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/lib/schema/form-schema";
import { createComment } from "@/lib/network/endpoint";
import { toast } from "sonner";
import { ParamValue } from "next/dist/server/request/params";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import z from "zod";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { service } from "@/lib/network/service";
import { Skeleton } from "./ui/skeleton";

interface CommentsProps {
  articleId: ParamValue;
  authorId?: number | null;
}

export default function Comments({
  articleId,
  authorId = null,
}: CommentsProps): JSX.Element {
  const {
    data: commentsData,
    mutate: refreshComments,
    isLoading,
  } = useSWR<CommentItemModel[]>(
    `/api/articles/${articleId}/comments`,
    service
  );

  const { trigger: submitComment, isMutating } = useSWRMutation(
    `/api/articles/${articleId}/comments`,
    async (_key, { arg }: { arg: SendCommentPayload }) => {
      return await createComment(arg);
    }
  );

  const commentContentSchema = commentSchema.pick({ content: true });

  const form = useForm<z.infer<typeof commentContentSchema>>({
    resolver: zodResolver(commentContentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = form.handleSubmit(async ({ content }) => {
    try {
      const payload: SendCommentPayload = {
        articleId,
        content,
        authorId,
      };

      await submitComment(payload);

      toast.success("Komentar berhasil dikirim!");
      form.reset();

      await refreshComments();
    } catch (error) {
      toast.error("Tidak dapat kirim komentar", {
        description:
          error instanceof Error ? error.message : "Masalah tidak diketahui",
      });
    }
  });

  return (
    <Card className="sticky transition-all duration-300 border rounded-lg shadow-sm bg-background top-24">
      <CardHeader>
        <CardTitle>Komentar ({commentsData?.length || 0})</CardTitle>
        <CardDescription>
          Diskusi dengan pembaca lain tentang artikel ini
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Ketik komentar disini...."
                      maxLength={255}
                      rows={3}
                      disabled={isMutating}
                      className="w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-foreground focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isMutating}
              className="flex items-center w-full gap-2 px-4 py-2 text-sm transition duration-300 rounded-full bg-primary hover:bg-primary/75 disabled:opacity-50"
            >
              {isMutating ? (
                <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-primary-foreground" />
              )}
              <span className="text-primary-foreground">
                {isMutating ? "Mengirim..." : "Kirim Komentar"}
              </span>
            </Button>
          </form>
        </Form>

        {isLoading ? (
          <div className="pt-4 mt-4 space-y-4 overflow-y-auto border-t max-h-96">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex space-x-3 animate-pulse">
                <div className="flex-shrink-0">
                  <Skeleton className="w-10 h-10 rounded-full" />
                </div>
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-1/4 h-4 rounded" />
                  <Skeleton className="w-3/4 h-3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pt-4 mt-4 space-y-4 overflow-y-auto border-t max-h-96">
            {commentsData?.map((comment, index) => (
              <div key={index} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={comment.author?.photoUrl || undefined} />
                    <AvatarFallback>
                      <span className="text-xs">PM</span>
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1 space-x-2">
                    <h4 className="text-sm font-medium text-foreground">
                      {comment.author?.name || "Pengguna Misterius"}
                    </h4>
                    <span className="text-xs font-light text-right text-muted-foreground">
                      {formatTimeRelativeIndonesia(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        Semua komentar ditulis oleh pembaca dan tidak mewakili penulis
      </CardFooter>
    </Card>
  );
}
