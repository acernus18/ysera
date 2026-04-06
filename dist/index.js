"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const download_images_1 = require("./download-images");
// console.log("Hello World!");
const main = async () => {
    var _a;
    const url = "https://i2.nhentai.net/galleries/3047440"; // process.argv[2] ?? "https://i2.nhentai.net/galleries/3251909";
    const dist = "/Users/maples/Downloads/temp";
    const count = 312;
    // if (url === "" || dist === "" || count === 0) {
    //     return;
    // }
    const startIndex = 0; // process.argv[5] ? parseInt(process.argv[5]) : 0;
    const contentType = (_a = process.argv[6]) !== null && _a !== void 0 ? _a : "jpg";
    const handler = (name) => {
        const result = /(\d+)\.jpg/.exec(name);
        if (result === null) {
            return name;
        }
        return `${parseInt(result[1]) + startIndex}.${contentType}`;
    };
    for (let i = 131; i < count; i++) {
        await (0, download_images_1.downloadImages)(`${url}/${i + 1}.${contentType}`, dist, handler);
    }
};
main();
