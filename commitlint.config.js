const commitMessageRegex = /^(fix|feature|refactor)\(#\)\s=>\s.+:\s.+$/;

module.exports = {
  rules: {
    "header-max-length": [2, "always", 72],
    "type-enum": [2, "always", ["fix", "feature", "refactor"]],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
    "type-case": [0, "never"],
    "type-empty": [0, "never"],
    "scope-empty": [0, "never"],
    "header-min-length": (parsed) => {
      if (!commitMessageRegex.test(parsed.header)) {
        return [2, "Invalid commit message format!"];
      }
      return [0];
    },
  },
};
