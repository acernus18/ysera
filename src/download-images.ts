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
