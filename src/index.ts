import * as fs from "node:fs";
import {GoSVGBuilder, GoSVGBuilderConfig} from "./go-svg-builder";

const builder = new GoSVGBuilder(JSON.parse(fs.readFileSync(process.argv[2], "utf8")) as GoSVGBuilderConfig);

console.log(builder.generate());