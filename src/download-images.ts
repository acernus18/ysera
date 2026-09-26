import fetch from "node-fetch";
import path from "node:path";
import * as fs from "node:fs";
import {mkdir} from "node:fs/promises";
import {HttpsProxyAgent} from "https-proxy-agent";

function getFilename(url: string, handler?: (file: string) => string): string {
    const elements = url.split("/");
    const filename = elements[elements.length - 1];
    if (handler) {
        return handler(filename);
    }
    return filename;
}

async function download(url: string, dest: string, agent?: HttpsProxyAgent<string>): Promise<void> {
    const response = await fetch(url, {
        headers: new Headers({
            "authority": "i3.nhentai.net",
            "scheme": "https",
        }),
        agent: agent ?? undefined,
    });
}

export async function downloadImages(url: string, dest: string, handler?: (file: string) => string): Promise<void> {
    if (!fs.existsSync(dest)) {
        await mkdir(dest);
    }
    const agent = new HttpsProxyAgent("http://127.0.0.1:7890");
    console.log("Downloading ", url);
    const response = await fetch(url, {
        headers: new Headers({
            "authority": "i3.nhentai.net",
            "scheme": "https",
        }),
        agent: agent,
    });
    const destination = path.resolve(dest, getFilename(url, handler));
    // [Refer]: https://nodejs.org/api/fs.html#file-system-flags
    const fileStream = fs.createWriteStream(destination, {flags: "w"});
    if (response.body !== null) {
        response.body.pipe(fileStream);
    }
}

interface NHentaiConfig {
    url: string;
    dist: string;
    count: number;
    startIndex: number;
    contentType: string;
}

export async function downloadNHentaiComics(config: NHentaiConfig) {
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
