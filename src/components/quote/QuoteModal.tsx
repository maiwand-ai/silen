"use client";

import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { Modal } from "@/components/ui/Modal";
import { QuoteWizard } from "./QuoteWizard";

/** Site-wide quote wizard dialog, opened by any "Get a quote" call to action. */
export function QuoteModal() {
  const { t } = useLocale();
  const { isOpen, closeQuote } = useQuote();
  return (
    <Modal open={isOpen} onClose={closeQuote} label={t.wizard.dialogLabel} closeLabel={t.common.close}>
      <QuoteWizard variant="modal" />
    </Modal>
  );
}
