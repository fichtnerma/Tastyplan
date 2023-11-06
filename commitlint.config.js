module.exports = {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        "header-regex": (parsed) => {
          const commitMessageRegex =
            /^(ci|chore|docs|ticket|feat|fix|perf|refactor|revert|style)\(.+\)\s?=>\s?.+/;
          const isMatch = commitMessageRegex.test(parsed.raw);
          return [isMatch, "Invalid commit message format!"];
        },
      },
    },
  ],
  rules: {
    "header-regex": [2, "always"],
    "type-enum": [
      2,
      "always",
      [
        "ci",
        "chore",
        "docs",
        "ticket",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
      ],
    ],
    "subject-empty": [0, "never"],
    "type-empty": [0, "never"],
  },
};
