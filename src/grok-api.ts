import fetch from "node-fetch";
import {HttpsProxyAgent} from "https-proxy-agent";

const MODEL_VERSION = "grok-4.7";

interface GrokResponse {
    output: [
        { id: string; summary: { text: string, type: string }[] },
        { content: { text: string, type: string }[] }
    ];
}

export async function fetchGrokResponse(prompt: string) {
    console.log("Requesting Grok under key =", process.env.GROK_KEY);
    const response = await fetch("https://api.x.ai/v1/responses", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${process.env.GROK_KEY}`},
        agent: new HttpsProxyAgent("http://127.0.0.1:7890"),
        body: JSON.stringify({model: MODEL_VERSION, input: prompt})
    });
    const content = await response.json() as GrokResponse;
    console.log(content);

    const summary = content.output[0].summary;
    const message = content.output[1].content;

    console.log("Printing Summary Part");
    for (const item of summary) {
        console.log(item.text);
    }
    console.log("Printing Message Part");
    for (const item of message) {
        console.log(item.text);
    }
}