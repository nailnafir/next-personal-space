"use client";

import { JSX, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
}

export default function Comments(): JSX.Element {
  const [comments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Chen",
      content:
        "Great article! The section on modern frameworks was particularly helpful. I've been struggling with choosing the right tools for my project.",
      timestamp: "2 hours ago",
      avatar: "SC",
    },
    {
      id: "2",
      author: "Mike Rodriguez",
      content:
        "Thanks for sharing this comprehensive guide. The best practices section should be required reading for all developers.",
      timestamp: "5 hours ago",
      avatar: "MR",
    },
    {
      id: "3",
      author: "Emma Thompson",
      content:
        "Could you elaborate more on state management patterns? I'd love to see some practical examples with Redux or Zustand.",
      timestamp: "1 day ago",
      avatar: "ET",
    },
    {
      id: "4",
      author: "David Kim",
      content:
        "The performance optimization tips are gold! Implemented lazy loading in my app and saw immediate improvements.",
      timestamp: "2 days ago",
      avatar: "DK",
    },
  ]);

  return (
    <Card className="sticky transition-all duration-300 border rounded-lg shadow-sm bg-background top-24">
      <CardHeader>
        <CardTitle>Komentar ({comments.length})</CardTitle>
        <CardDescription>
          Diskusi dengan pembaca lain tentang artikel ini
        </CardDescription>
      </CardHeader>
      <CardContent>
        <textarea
          placeholder="Ketik komentar disini...."
          className="w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-foreground focus:border-transparent"
          rows={3}
        />
        <Button className="flex items-center w-full gap-2 px-4 py-2 mt-2 mb-8 text-sm rounded-full">
          <Send className="w-4 h-4" />
          Kirim Komentar
        </Button>

        <div className="space-y-4 overflow-y-auto max-h-96">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 text-xs font-medium rounded-full bg-foreground text-background">
                  {comment.avatar}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-1 space-x-2">
                  <h4 className="text-sm font-medium text-foreground">
                    {comment.author}
                  </h4>
                  <span className="text-xs font-light text-muted-foreground">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        Semua komentar ditulis oleh pembaca dan tidak mewakili penulis
      </CardFooter>
    </Card>
  );
}
