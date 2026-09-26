"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGrokResponse = fetchGrokResponse;
const node_fetch_1 = __importDefault(require("node-fetch"));
const https_proxy_agent_1 = require("https-proxy-agent");
const MODEL_VERSION = "grok-4.7";
async function fetchGrokResponse(prompt) {
    console.log("Requesting Grok under key = ", process.env.GROK_KEY);
    const response = await (0, node_fetch_1.default)("https://api.x.ai/v1/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.GROK_KEY}` },
        agent: new https_proxy_agent_1.HttpsProxyAgent("http://127.0.0.1:7890"),
        body: JSON.stringify({ model: MODEL_VERSION, input: prompt })
    });
    const content = await response.json();
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
