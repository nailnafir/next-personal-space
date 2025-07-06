"use client";

import { FormEvent, JSX, useEffect, useState } from "react";
import { Heart, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommentsResponse,
  LikeItemResponse,
  SendCommentRequest,
} from "@/model/models";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/lib/schema/form-schema";
import { toast } from "sonner";
import { ParamValue } from "next/dist/server/request/params";
import { Skeleton } from "@/components/ui/skeleton";
import {
  cn,
  formatTimeRelativeIndonesia,
  getInitialName,
  getSupabaseURL,
} from "@/lib/utils";
import {
  createArticleComment,
  createArticleLikes,
  readArticleComments,
  readArticleLikes,
} from "@/lib/service/endpoints";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import z from "zod";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

interface CommentsProps {
  articleId: ParamValue;
  authorId?: number | null;
}

export default function LikesComments({
  articleId,
  authorId = null,
}: CommentsProps): JSX.Element {
  const { data: likes, mutate: refreshLikes } = useSWR<LikeItemResponse>(
    `/api/articles/${articleId}/likes`,
    () => readArticleLikes(articleId, authorId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { trigger: changeLikes } = useSWRMutation(
    `/api/articles/${articleId}/likes/action`,
    async () => await createArticleLikes(articleId, authorId)
  );

  const {
    data: comments,
    mutate: refreshComments,
    isLoading: loadingComments,
  } = useSWR<CommentsResponse>(
    `/api/articles/${articleId}/comments`,
    () => readArticleComments(articleId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { trigger: submitComment, isMutating } = useSWRMutation(
    `/api/articles/${articleId}/comments/create`,
    async (_key, { arg }: { arg: SendCommentRequest }) => {
      return await createArticleComment(articleId, arg);
    }
  );

  const commentContentSchema = commentSchema.pick({ content: true });

  const form = useForm<z.infer<typeof commentContentSchema>>({
    resolver: zodResolver(commentContentSchema),
    defaultValues: {
      content: "",
    },
  });

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const isLikedArticle =
      likes?.likedByUser ||
      (typeof window !== "undefined" &&
        localStorage.getItem(`isLikedArticle_${articleId}`) === "YES");

    setIsLiked(isLikedArticle);
  }, [articleId, likes?.likedByUser]);

  const actionComments = async (e: FormEvent) => {
    e.preventDefault();

    const isValid = await form.trigger();
    if (!isValid) return;

    const { content } = form.getValues();

    try {
      await submitComment({
        articleId,
        content,
        authorId,
      });

      await refreshComments();
      toast.success("Sip! Berhasil kirim komentar");
      form.reset();
    } catch (error) {
      toast.error("Tidak dapat kirim komentar", {
        description:
          error instanceof Error ? error.message : "Masalah tidak diketahui",
      });
    }
  };

  const actionLikes = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!isLiked) {
        setIsLiked(true);

        if (!authorId) {
          localStorage.setItem(`isLikedArticle_${articleId}`, "YES");
        }

        await changeLikes();
        await refreshLikes();

        toast.success("Sip! Artikel disukai");
      } else if (isLiked && authorId) {
        setIsLiked(false);

        localStorage.removeItem(`isLikedArticle_${articleId}`);

        await changeLikes();
        await refreshLikes();

        toast.success("Sip! Batal suka artikel");
      } else {
        toast.warning("Masuk dulu kalo mau batal sukai artikel");
      }
    } catch (error) {
      toast.error("Tidak dapat menyukai artikel", {
        description:
          error instanceof Error ? error.message : "Masalah tidak diketahui",
      });
    }
  };

  return (
    <Card className="!py-0 sticky transition-all duration-300 border rounded-lg shadow-sm bg-background top-24">
      <CardContent className="pt-6">
        <div className="flex flex-row justify-between pb-6">
          <h3 className="text-lg font-semibold">
            Suka ({likes?.totalLikes || 0})
          </h3>
          <Heart
            onClick={actionLikes}
            className={cn(
              "w-5 h-5 cursor-pointer transition duration-300 hover:scale-110",
              isLiked ? "fill-foreground text-foreground" : "text-muted-foreground"
            )}
          />
        </div>
        <div className="flex flex-col gap-2 py-6 border-t border-b">
          <h3 className="text-lg font-semibold">
            Komentar ({comments?.totalComments || 0})
          </h3>
          <Form {...form}>
            <form onSubmit={actionComments} className="space-y-4">
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
                  {isMutating ? "Mengirim..." : "Kirim"}
                </span>
              </Button>
            </form>
          </Form>
        </div>
        {loadingComments ? (
          <div className="relative py-4">
            <div className="absolute inset-x-0 z-10 h-4 transition duration-300 pointer-events-none top-4 bg-gradient-to-b from-background to-transparent" />
            <div className="absolute inset-x-0 z-10 h-4 transition duration-300 pointer-events-none bottom-4 bg-gradient-to-t from-background to-transparent" />

            <div className="py-6 space-y-4 overflow-y-auto max-h-96">
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
          </div>
        ) : (
          <div className="relative py-4">
            <div className="absolute inset-x-0 z-10 h-6 transition duration-300 pointer-events-none top-4 bg-gradient-to-b from-background via-background/75 to-transparent" />
            <div className="absolute inset-x-0 z-10 h-6 transition duration-300 pointer-events-none bottom-4 bg-gradient-to-t from-background via-background/75 to-transparent" />
            <div className="py-6 space-y-4 overflow-y-auto max-h-96">
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
              {comments?.comments.map((comment, index) => (
                <div key={index} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <Avatar>
                      <AvatarImage
                        src={getSupabaseURL(comment.author?.photoUrl)}
                      />
                      <AvatarFallback className="text-xs">
                        {getInitialName(comment.author?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-row items-start my-1 space-x-2">
                      <h4 className="text-sm w-full font-medium text-foreground">
                        {comment.author?.name || "Pengguna Misterius"}
                      </h4>
                      <span className="text-xs font-light text-right justify-end text-muted-foreground">
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
