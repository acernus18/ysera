import {downloadImages} from "./download-images";

const main = async () => {
    const url = "https://i2.nhentai.net/galleries/3047440"; // process.argv[2] ?? "https://i2.nhentai.net/galleries/3251909";
    const dist = "/Users/maples/Downloads/temp";
    const count = 312;
    // if (url === "" || dist === "" || count === 0) {
    //     return;
    // }
    const startIndex = 0;// process.argv[5] ? parseInt(process.argv[5]) : 0;
    const contentType = process.argv[6] ?? "jpg";
    const handler = (name: string) => {
        const result = /(\d+)\.jpg/.exec(name);
        if (result === null) {
            return name;
        }
        return `${parseInt(result[1]) + startIndex}.${contentType}`;
    };

    for (let i = 131; i < count; i++) {
        await downloadImages(`${url}/${i + 1}.${contentType}`, dist, handler);
    }
};

main();