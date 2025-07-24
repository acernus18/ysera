import {readFileSync} from "fs";
import {writeFileSync} from "node:fs";

const data = JSON.parse(readFileSync("/Users/maples/Documents/Repository/ysera/data/tableConvert.com_ewrhy1.json", "utf8"));
const content = [];
let genSql = 1;
content.push("begin;");
for (const item of data) {
    // content.push(`-- Updating ${item["id"]} -${genSql++}`);
    content.push(`update inventory_items set properties = JSON_SET(properties, "$.L", ${item["length"]}) where unique_id = "${item["id"]}" and current_weight = ${item["cts"]};`);
    content.push(`update inventory_items set properties = JSON_SET(properties, "$.W", ${item["width"]}) where unique_id = "${item["id"]}" and current_weight = ${item["cts"]};`);
    content.push(`update inventory_items set properties = JSON_SET(properties, "$.H", ${item["height"]}) where unique_id = "${item["id"]}" and current_weight = ${item["cts"]};`);
    content.push(`update inventory_items set properties = JSON_SET(properties, "$.Shape", "${item["shape"]}") where unique_id = "${item["id"]}" and current_weight = ${item["cts"]};`);
    content.push(`update inventory_items set sale_price = ${item["price"]} where unique_id = "${item["id"]}" and current_weight = ${item["cts"]};`);
}
content.push("commit;");
writeFileSync("/Users/maples/Documents/Repository/ysera/data/data.sql", content.join("\n"));

// {"H": 7.28, "L": 6.09, "W": 4.63, "Shape": "Cu", "Vendor": "100"}
