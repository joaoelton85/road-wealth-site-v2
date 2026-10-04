import { rmSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
console.log("ROAD clean: dist removido antes do build.");
