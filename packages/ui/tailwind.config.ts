import tailwindcssTypography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config = {
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  plugins: [tailwindcssTypography],
} satisfies Config;

export default config;
