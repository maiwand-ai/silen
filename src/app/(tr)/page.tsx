import { HomePage } from "@/components/pages/HomePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("tr", "home");

export default function Page() {
  return <HomePage />;
}
