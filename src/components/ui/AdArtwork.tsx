import Image from "next/image";
import type { ReactNode } from "react";

export type ArtworkTone = "photo" | "navy" | "lime" | "light";

/**
 * Presents a photo as advertising artwork: image, headline and a brand band.
 * Used across the showcase, portfolio and social media mockups.
 */
export function AdArtwork({
  image,
  alt,
  overlay,
  tone = "photo",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  className = "",
  textSize = "md",
  focus,
  priority,
  children,
}: {
  image: string;
  alt: string;
  overlay?: string;
  tone?: ArtworkTone;
  sizes?: string;
  className?: string;
  textSize?: "sm" | "md" | "lg";
  focus?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  const text = { sm: "text-lg", md: "text-2xl sm:text-3xl", lg: "text-4xl sm:text-5xl" }[textSize];
  const band = {
    navy: "bg-navy text-lime",
    lime: "bg-lime text-navy",
    light: "bg-white text-navy",
    photo: "",
  }[tone];

  return (
    <div className={`relative overflow-hidden bg-mist ${className}`}>
      {tone === "photo" ? (
        <>
          <Image src={image} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition duration-700 group-hover:scale-[1.04]" style={focus ? { objectPosition: focus } : undefined} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
          {overlay && (
            <p className={`absolute bottom-0 left-0 right-0 p-4 font-serif italic leading-[0.95] text-white sm:p-5 ${text}`}>
              {overlay}
              <span className="mt-2 block h-1 w-10 rounded bg-lime" aria-hidden="true" />
            </p>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col">
          <div className="relative flex-1">
            <Image src={image} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition duration-700 group-hover:scale-[1.04]" style={focus ? { objectPosition: focus } : undefined} />
          </div>
          {overlay && (
            <p className={`px-4 py-3 font-serif italic leading-none sm:px-5 sm:py-4 ${band} ${text}`}>{overlay}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
