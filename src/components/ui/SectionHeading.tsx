import { Rich } from "./Rich";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`eyebrow ${dark ? "text-lime" : "text-navy"}`}>{eyebrow}</p>
      <h2 id={id} className={`display-2 mt-4 ${dark ? "text-white" : "text-navy"}`}>
        <Rich text={title} accentClassName={dark ? "accent text-lime" : "accent"} />
      </h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/75" : "text-muted"}`}>{intro}</p>}
    </Reveal>
  );
}
