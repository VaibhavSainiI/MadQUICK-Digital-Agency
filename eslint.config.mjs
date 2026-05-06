export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {},
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
