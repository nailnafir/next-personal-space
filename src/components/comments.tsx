"use client";

import { FormEvent, JSX } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentItemResponse, SendCommentRequest } from "@/model/models";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/lib/schema/form-schema";
import { createComment } from "@/lib/service/endpoints";
import { toast } from "sonner";
import { ParamValue } from "next/dist/server/request/params";
import { services } from "@/lib/service/services";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatTimeRelativeIndonesia,
  getInitialName,
  getSupabaseURL,
} from "@/lib/utils";
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

interface CommentsProps {
  articleId: ParamValue;
  authorId?: number | null;
}

export default function Comments({
  articleId,
  authorId = null,
}: CommentsProps): JSX.Element {
  const {
    data: comments,
    mutate: refreshComments,
    isLoading,
  } = useSWR<CommentItemResponse[]>(
    `/api/articles/${articleId}/comments`,
    services
  );

  const { trigger: submitComment, isMutating } = useSWRMutation(
    `/api/articles/${articleId}/comments`,
    async (_key, { arg }: { arg: SendCommentRequest }) => {
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isValid = await form.trigger();
    if (!isValid) return;

    const { content } = form.getValues();

    try {
      const payload: SendCommentRequest = {
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
  };

  return (
    <Card className="sticky transition-all duration-300 border rounded-lg shadow-sm bg-background top-24">
      <CardHeader>
        <CardTitle>Komentar ({comments?.length || 0})</CardTitle>
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
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-1/2 h-4 rounded" />
                  <Skeleton className="w-full h-3 rounded" />
                </div>
                <Skeleton className="w-1/4 h-4 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="pt-4 mt-4 space-y-4 overflow-y-auto border-t max-h-96">
            {isMutating && (
              <div className="flex space-x-3 animate-pulse">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-1/2 h-4 rounded" />
                  <Skeleton className="w-full h-3 rounded" />
                </div>
                <Skeleton className="w-1/4 h-4 rounded" />
              </div>
            )}
            {comments?.map((comment, index) => (
              <div key={index} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage
                      src={getSupabaseURL(comment.author?.photoUrl)}
                    />
                    <AvatarFallback>
                      <span className="text-xs">
                        {getInitialName(comment.author?.name)}
                      </span>
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
