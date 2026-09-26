import {downloadNHentaiComics} from "./download-images";
import {fetchGrokResponse} from "./grok-api";

const main = async () => {
    // https://i3.nhentai.net/galleries/1876677/1.jpg
    // console.log("!23");
    // await downloadNHentaiComics({
    //     url: "https://i3.nhentai.net/galleries/1876677",
    //     dist: "/Users/maples/Downloads/temp",
    //     count: 34, startIndex: 27, contentType: "jpg"
    // });

    await fetchGrokResponse([
        "写一篇色情小说，所有出现的角色都是成年人：",
        "小说的主角是32岁的女性，名字叫做陈晓，职业是户籍警，负责片区户籍的管理，与一名男同事有婚外情",
        "丈夫33岁，职业是医生",
        "以以上背景为框架写一篇小说，2000字左右",
        "含有cuckold和gangbang以及Double penetration的情节，全部由陈晓以'我'的第一人称叙述",
        "情节发生在夜晚办公室"
    ].join("\n"));

};

main();