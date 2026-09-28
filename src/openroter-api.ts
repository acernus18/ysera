import fetch from "node-fetch";

async function fetchResponse(prompt: any[]) {
    console.log("Requesting open router under key =", process.env.OPEN_KEY);
    const response = await fetch("https://openrouter.ai/api/v1/responses", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${process.env.OPEN_KEY}`},
        body: JSON.stringify({
            // model: "cognitivecomputations/dolphin-mistral-24b-venice-edition",
            model: "x-ai/grok-4.7",
            input: prompt
        })
    });
    const content = await response.json();
    console.log(content);
    // printResponse(await response.json() as GrokResponse);

    // @ts-ignore
    console.log(content.output[0].content);
    // @ts-ignore
    console.log(content.output[1].content);
}

export async function main() {

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

    await fetchResponse(input);
}