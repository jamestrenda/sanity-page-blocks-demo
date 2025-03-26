import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"] as const),
  SANITY_STUDIO_PROJECT_ID: z.string(),
  SANITY_STUDIO_DATASET: z.enum(["production", "staging"] as const),
  SANITY_STUDIO_API_VERSION: z.string(),
  NEXT_PUBLIC_SANITY_DATASET: z.string(),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string(),
  NEXT_PUBLIC_SANITY_STUDIO_URL: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof schema> {}
  }
}

export function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
    SANITY_STUDIO_API_VERSION: process.env.SANITY_STUDIO_API_VERSION,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SANITY_STUDIO_URL: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  };
}

export const SANITY_STUDIO_PROJECT_ID =
  typeof document === "undefined"
    ? getEnv().SANITY_STUDIO_PROJECT_ID
    : window.ENV?.SANITY_STUDIO_PROJECT_ID;
export const SANITY_STUDIO_DATASET =
  typeof document === "undefined"
    ? getEnv().SANITY_STUDIO_DATASET
    : window.ENV?.SANITY_STUDIO_DATASET;
export const SANITY_STUDIO_API_VERSION =
  typeof document === "undefined"
    ? getEnv().SANITY_STUDIO_API_VERSION
    : window.ENV?.SANITY_STUDIO_API_VERSION;
export const NEXT_PUBLIC_SANITY_DATASET =
  typeof document === "undefined"
    ? getEnv().NEXT_PUBLIC_SANITY_DATASET
    : window.ENV?.NEXT_PUBLIC_SANITY_DATASET;
export const NEXT_PUBLIC_SANITY_PROJECT_ID =
  typeof document === "undefined"
    ? getEnv().NEXT_PUBLIC_SANITY_PROJECT_ID
    : window.ENV?.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const NEXT_PUBLIC_SANITY_API_VERSION =
  typeof document === "undefined"
    ? getEnv().NEXT_PUBLIC_SANITY_API_VERSION
    : window.ENV?.NEXT_PUBLIC_SANITY_API_VERSION;
export const NEXT_PUBLIC_SANITY_STUDIO_URL =
  typeof document === "undefined"
    ? getEnv().NEXT_PUBLIC_SANITY_STUDIO_URL
    : window.ENV?.NEXT_PUBLIC_SANITY_STUDIO_URL;

type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
