import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  clean: true,
  // Bundle @mbti/shared into the CLI output so it works standalone via npx
  noExternal: ['@mbti/shared'],
  banner: {
    js: '#!/usr/bin/env node',
  },
});
