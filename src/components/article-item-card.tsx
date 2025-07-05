import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArticleItemResponse,
  CommentsResponse,
  LikeItemResponse,
  ViewItemResponse,
} from "@/model/models";
import {
  readArticleComments,
  readArticleLikes,
  readArticleViews,
} from "@/lib/service/endpoints";
import {
  encodeId,
  formatDateTimeIndonesia,
  formatTimeRelativeIndonesia,
  getInitialName,
  getSupabaseURL,
} from "@/lib/utils";
import { ArrowUp, Clock, Eye, Heart, MessageCircle, Tag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

interface ArticleCardProps {
  article: ArticleItemResponse;
  userId?: number | null;
}

export default function ArticleItemCard({ article, userId }: ArticleCardProps) {
  const encodedId = encodeId(article.id);

  const { data: views } = useSWR<ViewItemResponse>(
    `/api/articles/${encodedId}/views`,
    () => readArticleViews(encodedId, userId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: likes } = useSWR<LikeItemResponse>(
    `/api/articles/${encodedId}/likes`,
    () => readArticleLikes(encodedId, userId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: comments } = useSWR<CommentsResponse>(
    `/api/articles/${encodedId}/comments`,
    () => readArticleComments(encodedId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <Card className="!py-0 transition duration-300 hover:scale-105 w-full sm:w-[23rem]">
      <CardHeader className="flex-1 px-0 space-y-0">
        <CardTitle className="text-lg line-clamp-2">
          {article.thumbnailUrl && (
            <Image
              src={getSupabaseURL(article.thumbnailUrl)}
              alt={article.title || "Artikel"}
              width={280}
              height={48}
              className="object-cover w-full h-48 rounded-t-xl"
            />
          )}
        </CardTitle>
        <CardDescription className="px-6 py-2 text-sm line-clamp-3">
          <div className="flex flex-row items-center justify-between">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatTimeRelativeIndonesia(article.publishedAt)}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {formatDateTimeIndonesia(article.publishedAt)}
              </TooltipContent>
            </Tooltip>

            <div className="flex flex-wrap justify-center gap-2">
              {article.tags?.map((tag, indexBadge) => (
                <Badge
                  key={indexBadge}
                  className="flex flex-row gap-2 rounded-xl"
                >
                  <Tag className="w-4 h-4" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pb-4 text-xs text-muted-foreground">
        <div className="flex flex-col">
          <h1 className="text-xl font-medium text-foreground">
            {article.title}
          </h1>
          <h3>{article.subtitle}</h3>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={getSupabaseURL(article.author?.photoUrl)} />
              <AvatarFallback className="text-xs">
                {getInitialName(article.author?.name)}
              </AvatarFallback>
            </Avatar>
            <h4 className="text-sm font-medium text-foreground">
              {article.author?.name || "Pengguna Misterius"}
            </h4>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {views?.totalViews || 0}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dibaca</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {likes?.totalLikes || 0}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Suka</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {comments?.totalComments || 0}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Komentar</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pb-6">
        <Button asChild className="w-full gap-2 rounded-full">
          <Link href={`/articles/${encodeId(article.id)}`}>
            <ArrowUp className="w-4 h-4" />
            Kunjungi
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
