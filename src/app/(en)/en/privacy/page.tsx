import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "privacy");

export default function Page() {
  return <PrivacyPage />;
}
