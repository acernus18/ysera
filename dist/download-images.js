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
exports.downloadImages = downloadImages;
const node_path_1 = __importDefault(require("node:path"));
const fs = __importStar(require("node:fs"));
const promises_1 = require("node:fs/promises");
const https_proxy_agent_1 = require("https-proxy-agent");
const node_fetch_1 = __importDefault(require("node-fetch"));
function getFilename(url, handler) {
    const elements = url.split("/");
    const filename = elements[elements.length - 1];
    if (handler) {
        return handler(filename);
    }
    return filename;
}
async function downloadImages(url, dest, handler) {
    if (!fs.existsSync(dest)) {
        await (0, promises_1.mkdir)(dest);
    }
    const agent = new https_proxy_agent_1.HttpsProxyAgent("http://127.0.0.1:7890");
    console.log("Downloading ", url);
    const response = await (0, node_fetch_1.default)(url, {
        headers: new Headers({
            "authority": "i3.nhentai.net",
            "method": "GET",
            "path": "/galleries/3222212/3.webp",
            "scheme": "https",
        }),
        agent: agent,
    });
    const destination = node_path_1.default.resolve(dest, getFilename(url, handler));
    // [Refer]: https://nodejs.org/api/fs.html#file-system-flags
    const fileStream = fs.createWriteStream(destination, { flags: "w" });
    if (response.body !== null) {
        // await finished(Readable.fromWeb(response.body as ReadableStream).pipe(fileStream));
        response.body.pipe(fileStream);
    }
}
// const main = async () => {
//     const url = process.argv[2] ?? "https://i2.nhentai.net/galleries/3251909";
//     const dist = process.argv[3] ?? "/Users/maples/Downloads/temp";
//     const count = process.argv[4] ? parseInt(process.argv[4]) : 107;
//     if (url === "" || dist === "" || count === 0) {
//         return;
//     }
//     const startIndex = process.argv[5] ? parseInt(process.argv[5]) : 0;
//     const contentType = process.argv[6] ?? "webp";
//     const handler = (name: string) => {
//         const result = /(\d+)\.jpg/.exec(name);
//         if (result === null) {
//             return name;
//         }
//         return `${parseInt(result[1]) + startIndex}.${contentType}`;
//     };
//
//     for (let i = 0; i < count; i++) {
//         await downloadImages(`${url}/${i + 1}.${contentType}`, dist, handler);
//     }
// };
//
// main();
