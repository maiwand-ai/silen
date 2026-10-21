import { BoutiquePage } from "@/components/pages/BoutiquePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("tr", "boutique");

export default function Page() {
  return <BoutiquePage />;
}
