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
exports.downloadNHentaiComics = downloadNHentaiComics;
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_path_1 = __importDefault(require("node:path"));
const fs = __importStar(require("node:fs"));
const promises_1 = require("node:fs/promises");
const https_proxy_agent_1 = require("https-proxy-agent");
function getFilename(url, handler) {
    const elements = url.split("/");
    const filename = elements[elements.length - 1];
    if (handler) {
        return handler(filename);
    }
    return filename;
}
async function download(url, dest, agent) {
    const response = await (0, node_fetch_1.default)(url, {
        headers: new Headers({
            "authority": "i3.nhentai.net",
            "scheme": "https",
        }),
        agent: agent !== null && agent !== void 0 ? agent : undefined,
    });
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
            "scheme": "https",
        }),
        agent: agent,
    });
    const destination = node_path_1.default.resolve(dest, getFilename(url, handler));
    // [Refer]: https://nodejs.org/api/fs.html#file-system-flags
    const fileStream = fs.createWriteStream(destination, { flags: "w" });
    if (response.body !== null) {
        response.body.pipe(fileStream);
    }
}
async function downloadNHentaiComics(config) {
    for (let i = config.startIndex; i < config.count; i++) {
        console.log(`Downloading ${config.url}`);
        await downloadImages(`${config.url}/${i + 1}.${config.contentType}`, config.dist);
    }
}
// const main = async () => {
//     // https://i2.nhentai.net/galleries/2290290/8.jpg
//     await downloadNHentaiComics({
//         url: "https://i2.nhentai.net/galleries/2290290",
//         dist: "/Users/maples/Downloads/temp",
//         count: 218, startIndex: 150, contentType: "jpg"
//     });
// };
//
// main();
