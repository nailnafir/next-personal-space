import { useCount } from "@/hooks/use-count";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export default function InfoCard({
  icon,
  label,
  count,
  iconColor,
}: {
  icon: LucideIcon;
  label: string;
  count: number;
  iconColor: string;
}) {
  const Icon = icon;

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg w-40 dark:bg-white/10 bg-black/10">
      <Icon className={cn("w-5 h-5", iconColor)} />
      <span className="font-bold">{useCount(count)}+</span>
      <span className="dark:text-gray-300 text-gray-700">{label}</span>
    </div>
  );
}
