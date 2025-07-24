import path from "node:path";
import * as fs from "node:fs";
import {mkdir} from "node:fs/promises";
import {Readable} from "node:stream";
import {finished} from "node:stream/promises";

import {ReadableStream} from "stream/web";

type FilenameHandler = (file: string) => string;

function getFilename(url: string, handler?: FilenameHandler): string {
    const elements = url.split("/");
    const filename = elements[elements.length - 1];
    if (handler) {
        return handler(filename);
    }
    return filename;
}

async function downloadImages(url: string, dest: string, handler?: FilenameHandler): Promise<void> {
    if (!fs.existsSync(dest)) {
        await mkdir(dest);
    }

    console.log("Downloading ", url);
    const response = await fetch(url, {
        headers: new Headers({
            "authority": "i2.nhentai.net",
            "method": "GET",
            "path": "/galleries/3251909/1.webp",
            "scheme": "https",
        }),
    });
    const destination = path.resolve(dest, getFilename(url, handler));
    // [Refer]: https://nodejs.org/api/fs.html#file-system-flags
    const fileStream = fs.createWriteStream(destination, {flags: "w"});
    if (response.body !== null) {
        await finished(Readable.fromWeb(response.body as ReadableStream).pipe(fileStream));
    }
}

const main = async () => {
    const url = process.argv[2] ?? "https://i2.nhentai.net/galleries/3251909";
    const dist = process.argv[3] ?? "/Users/maples/Downloads/temp";
    const count = process.argv[4] ? parseInt(process.argv[4]) : 107;
    if (url === "" || dist === "" || count === 0) {
        return;
    }
    const startIndex = process.argv[5] ? parseInt(process.argv[5]) : 0;
    const contentType = process.argv[6] ?? "webp";
    const handler = (name: string) => {
        const result = /(\d+)\.jpg/.exec(name);
        if (result === null) {
            return name;
        }
        return `${parseInt(result[1]) + startIndex}.${contentType}`;
    };

    for (let i = 0; i < count; i++) {
        await downloadImages(`${url}/${i + 1}.${contentType}`, dist, handler);
    }
};

main();