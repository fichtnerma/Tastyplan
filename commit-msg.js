const fs = require("fs");

const commitMessageRegex = /^(fix|feature|refactor)\(.+\)\s=>\s.+:.+/;

const commitMessage = fs
  .readFileSync(process.env.HUSKY_GIT_PARAMS, "utf-8")
  .trim();

if (!commitMessageRegex.test(commitMessage)) {
  console.error("Invalid commit message format!");
  process.exit(1);
}
