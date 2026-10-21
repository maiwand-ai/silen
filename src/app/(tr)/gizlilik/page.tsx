import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("tr", "privacy");

export default function Page() {
  return <PrivacyPage />;
}
