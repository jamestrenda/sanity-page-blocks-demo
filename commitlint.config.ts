import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: [
    "@commitlint/config-conventional",
    "@commitlint/config-pnpm-scopes",
  ],
  formatter: "@commitlint/format",
};

export default Configuration;
