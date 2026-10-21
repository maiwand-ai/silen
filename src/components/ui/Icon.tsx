import {
  Calendar,
  Clapperboard,
  LayoutGrid,
  MessagesSquare,
  Monitor,
  Shirt,
  Sparkles,
  Target,
  TrendingUp,
  WandSparkles,
  type LucideProps,
} from "lucide-react";

const icons = {
  calendar: Calendar,
  clapperboard: Clapperboard,
  "layout-grid": LayoutGrid,
  messages: MessagesSquare,
  monitor: Monitor,
  shirt: Shirt,
  sparkles: Sparkles,
  target: Target,
  "trending-up": TrendingUp,
  wand: WandSparkles,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = icons[name as keyof typeof icons] ?? Sparkles;
  return <Component aria-hidden="true" {...props} />;
}
