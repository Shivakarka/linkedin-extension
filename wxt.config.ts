import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    name: "LinkedIn Auto Connect",
    version: "1.0",
    description: "Automatically accept all LinkedIn connection requests",
    permissions: ["activeTab"],
  },
  entrypointsDir: "entrypoints",
});
