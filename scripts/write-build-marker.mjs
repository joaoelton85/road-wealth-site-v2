import { mkdirSync, writeFileSync } from "node:fs";

const version = "52.10.0";
const commit =
  process.env.WORKERS_CI_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  process.env.CF_PAGES_COMMIT_SHA ||
  "local";
const buildId =
  process.env.WORKERS_CI_BUILD_UUID ||
  process.env.CF_PAGES_DEPLOYMENT_ID ||
  new Date().toISOString();

mkdirSync("dist", { recursive: true });

const payload = {
  roadBuild: version,
  commit,
  buildId,
  generatedAt: new Date().toISOString(),
};

writeFileSync("dist/__road-build.json", JSON.stringify(payload, null, 2) + "\n");
console.log(`ROAD asset marker OK — V${version} — ${commit.slice(0, 12)} — ${buildId}`);
