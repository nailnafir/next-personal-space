"use client";

import Link from "next/link";
import TableOfContents from "@/components/table-of-contents";
import Comments from "@/components/comments";
import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Section {
  id: string;
  title: string;
}

export default function ArticleDetailsPage() {
  const { id } = useParams();

  const sections: Section[] = [
    { id: "introduction", title: "Introduction" },
    { id: "getting-started", title: "Getting Started" },
    { id: "main-concepts", title: "Main Concepts" },
    { id: "advanced-topics", title: "Advanced Topics" },
    { id: "best-practices", title: "Best Practices" },
    { id: "conclusion", title: "Conclusion" },
  ];

  return (
    <div className="transition-all duration-300 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-8 py-6">
          {/* Table of contents on the left */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <Card className="mb-6 transition-all duration-300 border rounded-xl bg-background">
                <CardContent>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href="/articles">Artikel</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{id}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </CardContent>
              </Card>

              <TableOfContents sections={sections} />
            </div>
          </aside>

          {/* Main content in the center */}
          <main className="col-span-12 lg:col-span-6">
            <div className="mb-8">
              <h1 className="mb-4 text-4xl font-bold">
                Complete Guide to Modern Web Development
              </h1>
              <p className="text-xl leading-relaxed text-muted-foreground">
                Learn the fundamentals and advanced concepts of modern web
                development with practical examples and best practices.
              </p>
              <div className="flex items-center pt-6 mt-6 border-t">
                <div className="flex items-center space-x-4 text-sm font-light text-muted-foreground">
                  <span>By John Doe</span>
                  <span>•</span>
                  <span>March 15, 2024</span>
                  <span>•</span>
                  <span>12 min read</span>
                </div>
              </div>
            </div>

            <section id="introduction" className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Introduction
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Web development has evolved significantly over the past decade.
                Modern frameworks, tools, and practices have transformed how we
                build applications for the web. This comprehensive guide will
                walk you through everything you need to know.
              </p>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Whether you&apos;re a beginner just starting out or an
                experienced developer looking to update your skills, this guide
                covers the essential concepts and techniques used in
                today&apos;s web development landscape.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                We&apos;ll explore various topics from basic HTML and CSS to
                advanced JavaScript frameworks, build tools, and deployment
                strategies. By the end of this guide, you&apos;ll have a solid
                understanding of modern web development practices.
              </p>
            </section>

            <section id="getting-started" className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Getting Started
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Before diving into advanced topics, it&apos;s important to
                establish a solid foundation. Make sure you have a good
                understanding of HTML, CSS, and JavaScript fundamentals.
              </p>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Set up your development environment with a code editor, version
                control system, and basic development tools. We recommend using
                VS Code, Git, and Node.js as your starting toolkit.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Create your first project and familiarize yourself with the
                development workflow. Practice writing clean, semantic HTML and
                organizing your CSS effectively.
              </p>
            </section>

            <section id="main-concepts" className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Main Concepts
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Modern web development revolves around several key concepts that
                you should master. These include component-based architecture,
                state management, and reactive programming.
              </p>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Understanding how to structure your applications using
                components makes your code more maintainable and reusable. Learn
                about props, state, and the component lifecycle.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Explore different approaches to managing application state, from
                simple local state to complex global state management solutions.
              </p>
            </section>

            <section id="advanced-topics" className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Advanced Topics
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Once you&apos;ve mastered the basics, it&apos;s time to explore
                advanced topics that will take your skills to the next level.
                These include performance optimization, security considerations,
                and scalability patterns.
              </p>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Learn about code splitting, lazy loading, and other techniques
                to improve your application&apos;s performance. Understand how
                to implement proper error handling and logging strategies.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Explore advanced patterns like higher-order components, render
                props, and hooks. These patterns will help you write more
                flexible and reusable code.
              </p>
            </section>

            <section id="best-practices" className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Best Practices
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Following best practices is crucial for writing maintainable and
                scalable code. This includes proper code organization,
                consistent naming conventions, and thorough testing strategies.
              </p>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Implement continuous integration and deployment pipelines to
                automate your development workflow. Use linting tools and code
                formatters to maintain consistent code quality.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Document your code properly and write comprehensive tests. This
                will make your codebase easier to maintain and extend over time.
              </p>
            </section>

            <section id="conclusion" className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Conclusion
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Modern web development is an exciting and rapidly evolving
                field. By mastering the concepts and practices covered in this
                guide, you&apos;ll be well-equipped to build robust, scalable
                web applications.
              </p>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Remember that learning is an ongoing process. Stay curious, keep
                experimenting with new technologies, and don&apos;t be afraid to
                challenge yourself with complex projects.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                The web development community is vibrant and supportive. Engage
                with other developers, contribute to open source projects, and
                share your knowledge with others.
              </p>
            </section>
          </main>

          {/* Comments section on the right */}
          <aside className="hidden lg:block lg:col-span-3">
            <Comments />
          </aside>
        </div>
      </div>
    </div>
  );
}
