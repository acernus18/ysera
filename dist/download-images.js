"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const fs = __importStar(require("node:fs"));
const promises_1 = require("node:fs/promises");
const node_stream_1 = require("node:stream");
const promises_2 = require("node:stream/promises");
function getFilename(url, handler) {
    const elements = url.split("/");
    const filename = elements[elements.length - 1];
    if (handler) {
        return handler(filename);
    }
    return filename;
}
async function download(url, dest, handler) {
    if (!fs.existsSync(dest)) {
        await (0, promises_1.mkdir)(dest);
    }
    const response = await fetch(url);
    const destination = node_path_1.default.resolve(dest, getFilename(url, handler));
    // [Refer]: https://nodejs.org/api/fs.html#file-system-flags
    const fileStream = fs.createWriteStream(destination, { flags: "w" });
    if (response.body !== null) {
        await (0, promises_2.finished)(node_stream_1.Readable.fromWeb(response.body).pipe(fileStream));
    }
}
const main = async () => {
    var _a, _b, _c;
    const url = (_a = process.argv[2]) !== null && _a !== void 0 ? _a : "";
    const dist = (_b = process.argv[3]) !== null && _b !== void 0 ? _b : "";
    const count = process.argv[4] ? parseInt(process.argv[4]) : 0;
    if (url === "" || dist === "" || count === 0) {
        return;
    }
    const startIndex = process.argv[5] ? parseInt(process.argv[5]) : 0;
    const contentType = (_c = process.argv[6]) !== null && _c !== void 0 ? _c : "jpg";
    const handler = (name) => {
        const result = /(\d+)\.jpg/.exec(name);
        if (result === null) {
            return name;
        }
        return `${parseInt(result[1]) + startIndex}.${contentType}`;
    };
    for (let i = 0; i < count; i++) {
        await download(`${url}/${i + 1}.${contentType}`, dist, handler);
    }
};
main();
