import React from "react";
import { BlocksType } from "../../types";
import { PortableText } from "./portableText";
import { SanityImage } from "./image";

type HeroBlockProps = BlocksType<"heroBlock">;

export const Hero = ({ text, image }: HeroBlockProps) => {
  return (
    <div className="relative bg-zinc-100 dark:bg-zinc-900 rounded-md isolate w-full h-full overflow-hidden grid place-items-center min-h-[600px]">
      {/* <PortableText value={text} /> */}
      <h1 className="text-foreground font-bold text-5xl z-1 relative">
        {text}
      </h1>
      {image && (
        <div className="absolute inset-0 z-0 aspect-video w-full">
          <SanityImage
            asset={image}
            loading="eager"
            width={1024}
            height={800}
            priority
            quality={80}
            className="h-full w-full object-cover rounded-md opacity-80"
          />
        </div>
      )}
    </div>
  );
};
