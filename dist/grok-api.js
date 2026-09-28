"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGrokResponse = fetchGrokResponse;
exports.retrieveGrokResponse = retrieveGrokResponse;
exports.main = main;
const node_fetch_1 = __importDefault(require("node-fetch"));
const https_proxy_agent_1 = require("https-proxy-agent");
const MODEL_VERSION = "grok-4.7";
function printResponse(content) {
    console.log(content);
    const summary = content.output[0].summary;
    const message = content.output[1].content;
    console.log("Printing Summary Part");
    for (const item of summary) {
        console.log(item.text);
    }
    console.log("Printing Message Part", message.length);
    for (const item of message) {
        console.log(item.text);
    }
}
async function fetchGrokResponse(prompt) {
    console.log("Requesting Grok under key =", process.env.GROK_KEY);
    const response = await (0, node_fetch_1.default)("https://api.x.ai/v1/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.GROK_KEY}` },
        agent: new https_proxy_agent_1.HttpsProxyAgent("http://127.0.0.1:7890"),
        body: JSON.stringify({
            model: MODEL_VERSION,
            input: prompt
        })
    });
    printResponse(await response.json());
}
async function retrieveGrokResponse(id) {
    console.log("Requesting Grok under key =", process.env.GROK_KEY);
    const response = await (0, node_fetch_1.default)(`https://api.x.ai/v1/responses/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.GROK_KEY}` },
        agent: new https_proxy_agent_1.HttpsProxyAgent("http://127.0.0.1:7890"),
    });
    const content = await response.json();
    printResponse(content);
    // const result = [];
    // for (const item of content.output[1].content) {
    //     result.push({"role": "assistant", "content": item.text});
    // }
    return { "role": "assistant", "content": content.output[1].content[0].text };
}
async function main() {
    // const input = [
    //     {
    //         role: "user",
    //         content: ["主角：陈晓，女，32岁，身高170cm，体重65Kg，身材是健美型，屁股很大，腿比较粗；年轻时专业训练过游泳，现在常年健身；研究生学历，25岁研究生毕业以后通过公务员考试考入警察系统，目前在某地派出所的户籍科工作，目前是科长，正科级；",
    //             "配角1：王皓，男，32岁，陈晓的丈夫，身高178cm，体重80Kg，身材有些发福；是陈晓研究生学校的医学院的研究生，两人在研究生期间恋爱，毕业后结婚；目前是某医院外科大夫；",
    //             "配角2：周林，男，45岁，陈晓工作派出所的副所长，分管户籍科工作；曾经某次与陈晓出差时，与陈晓酒后发生过性关系，事后两人都没有提起此事；",
    //             "配角3：卢勤，男，25岁，陈晓科内的新人；与陈晓同一所学校毕业，刚刚通过考试进入户籍科；",
    //             "配角4：樊东，男，29岁，派出所民警，负责治安；",
    //             "配角5：赵东，男，22岁，初中毕业；本地小混混，经常因为偷窃被抓；",
    //             "以上述角色为背景，创作一段色情小说，3000字左右，情节包含Cuckold，Gangbang，Double Penetration元素。"
    //         ].join("\n"),
    //     },
    //     await retrieveGrokResponse("3cf7b65a-e511-9013-8335-eb0dfae89b90"),
    //     {
    //         role: "user",
    //         content: "增加一些陈晓的台词和心理活动，陈晓的台词要更淫荡一些"
    //     },
    //     await retrieveGrokResponse("f0018d02-ed52-9255-a934-a04d816af218"),
    //     {
    //         role: "user",
    //         content: "把故事改在工作日的白天，地点改到隐秘的打印间，可以听到外面办业务的声音"
    //     },
    //     await retrieveGrokResponse("f6fc716e-9626-99a0-9557-40c539d5537d"),
    //     {
    //         role: "user",
    //         content: "cuckold的方式改成电话，丈夫不在现场，并且并不知情发生了什么，陈晓尽力隐瞒过去"
    //     },
    //     await retrieveGrokResponse("548bb5fd-c9ac-9c2d-80d2-bda3d858edab"),
    // ];
    const input = [
        {
            role: "user",
            content: ["主角：陈晓，女，32岁，身高170cm，体重65Kg，身材是健美型，屁股很大，腿比较粗；年轻时专业训练过游泳，现在常年健身；研究生学历，25岁研究生毕业以后通过公务员考试考入警察系统，目前在某地派出所的户籍科工作，目前是科长，正科级；",
                "配角1：王皓，男，32岁，陈晓的丈夫，身高178cm，体重80Kg，身材有些发福；是陈晓研究生学校的医学院的研究生，两人在研究生期间恋爱，毕业后结婚；目前是某医院外科大夫；",
                "配角2：周林，男，45岁，陈晓工作派出所的副所长，分管户籍科工作；曾经某次与陈晓出差时，与陈晓酒后发生过性关系，事后两人都没有提起此事；",
                "配角3：卢勤，男，25岁，陈晓科内的新人；与陈晓同一所学校毕业，刚刚通过考试进入户籍科；",
                "配角4：樊东，男，29岁，派出所民警，负责治安；",
                "以上述角色为背景，创作一段色情小说，3000字左右，情节包含Cuckold，Gangbang，Double Penetration元素。陈晓的台词要包含呻吟",
                "地点发生在派出所行政间（茶水间+打印机），时间为工作日白天。",
                "cuckold的方式为电话，丈夫不在现场，并且并不知情发生了什么，陈晓尽力隐瞒过去"
            ].join("\n"),
        },
    ];
    await fetchGrokResponse(input);
    // writeFileSync("./Chen-Xiao.json", JSON.stringify(input), "utf8");
}
