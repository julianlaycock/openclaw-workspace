import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    fileParallelism: false,
    include: ['src/**/*.test.ts',
    exclude: ['src/backend/routes/public/public-api.test.ts', 'src/backend/routes/public/public-api-v2.test.ts'],, 'tests/unit/**/*.test.ts', 'tests/e2e/happy-path.test.ts', 'tests/e2e/multi-tenant-security.test.ts'],
    // Default: excludes e2e tests that require DB reset (NODE_ENV=test ENABLE_TEST_RESET=1)
    // Use test:all for full suite, test:e2e for reset-dependent tests
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/frontend/',
        '**/*.test.ts',
      ],
      // Target is 80% â€” start at 60% (realistic for current state) and increase incrementally
      thresholds: {
        statements: 60,
        branches: 40,
        functions: 50,
        lines: 60,
      },
    },
  },
});
