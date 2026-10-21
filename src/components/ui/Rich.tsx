import { Fragment } from "react";

/** Renders text where *words* become the italic serif accent. */
export function Rich({ text, accentClassName = "accent" }: { text: string; accentClassName?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className={accentClassName}>
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain text version (asterisks removed), for metadata and aria labels. */
export const plain = (text: string) => text.replace(/\*/g, "");
