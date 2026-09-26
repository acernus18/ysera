import {readFileSync} from "fs";
import {writeFileSync} from "node:fs";

const data = JSON.parse(readFileSync("/Users/maples/Documents/Repository/ysera/data/a.json", "utf8"));
const content = [];
let index = 1;
content.push("begin;");
for (const item of data) {
    // content.push(`-- Updating ${item["id"]} -${index++}`);
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.L", ${item["length"]}) where unique_id = "${item["id"]}" and current_weight = ${item["cts"]};`);
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.W", ${item["width"]}) where unique_id = "${item["id"]}" and current_weight = ${item["cts"]};`);
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.H", ${item["height"]}) where unique_id = "${item["id"]}" and current_weight = ${item["cts"]};`);
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.Shape", "${item["shape"]}") where unique_id = "${item["id"]}" and current_weight = ${item["cts"]};`);
    // content.push(`update inventory_items set sale_price = ${item["price"]} where unique_id = "${item["id"]}" and current_weight = ${item["cts"]};`);
    // content.push(`-- Updating ${item["id"]} -${index++}`);
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.DC", ${item["DC"]}) where unique_id = "${item["id"]}";`);
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.DQ", ${item["DQ"]}) where unique_id = "${item["id"]}";`);
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.GW", ${item["GW"]}) where unique_id = "${item["id"]}";`);
    // if (item["JSize"] === "") {
    //     continue;
    // }
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.JSize", ${parseInt(item["JSize"])}) where unique_id = "${item["id"]}";`);
    // content.push(`update inventory_items set sale_price = ${item["price"]} where unique_id = "${item["id"]}" and current_weight = ${item["cts"]};`);
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.GP", 762.75) where unique_id = "${item["id"]}";`);
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.DP", 4000) where unique_id = "${item["id"]}";`);
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.MP", 450) where unique_id = "${item["id"]}";`);
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.SP", 5) where unique_id = "${item["id"]}";`);
    // content.push(`update inventory_items set properties = JSON_SET(properties, "$.MainUP", ${item["MainUP"]}) where unique_id = "${item["id"]}";`);
    // content.push(`update inventory_items set sale_price = ${item["target"]} where unique_id = "${item["id"]}" and sale_price = ${item["source"]};`);
    content.push(`"${item["id"]}"`);
}
writeFileSync("/Users/maples/Documents/Repository/ysera/data/data.sql", content.join(", "));

// {"H": 7.28, "L": 6.09, "W": 4.63, "Shape": "Cu", "Vendor": "100"}

// -- SELECT
// --     *
// -- FROM
// --     inventory_items
// -- WHERE
// --     unique_id = "2625";
// -- update inventory_items set properties = JSON_SET(properties, "$.GP", 900) where unique_id = "2625";
// -- update inventory_items set properties = JSON_SET(properties, "$.DP", 4000) where unique_id = "2625";
// -- update inventory_items set properties = JSON_SET(properties, "$.MP", 450) where unique_id = "2625";
// -- update inventory_items set properties = JSON_SET(properties, "$.SP", 5) where unique_id = "2625";
// -- update inventory_items set properties = JSON_SET(properties, "$.MainUP", 4388) where unique_id = "2625";
// SELECT
// ((properties->"$.MainUP" * current_weight) +
//     (properties->"$.GP" * properties->"$.GW") +
//     (properties->"$.DP" * properties->"$.DC") +
//     (properties->"$.SP" * properties->"$.DQ") +
//     (properties->"$.MP"))/0.3
// FROM
// inventory_items
// WHERE
// unique_id = "2625"
// SELECT
// floor(((properties->"$.MainUP" * current_weight) +
//     (properties->"$.GP" * properties->"$.GW") +
//     (properties->"$.DP" * properties->"$.DC") +
//     (properties->"$.SP" * properties->"$.DQ") +
//     (properties->"$.MP"))/30)*100
// FROM
// inventory_items
// WHERE
// unique_id = "12029"

// SELECT
// --         unique_id,
//     --         description,
//     --         `code`,
//     --         `type`,
//     --         current_weight,
//     --         certificate,
//     --         sale_price
// --         properties->"$.L",
//     --         properties->"$.W",
//     --         properties->"$.H",
//     --         properties->"$.Shape"
// unique_id,
//     description,
//     `code`,
//     `type`,
//     current_weight,
//     certificate,
//     sale_price,
//     cost_price,
//     properties -> "$.DC",
//     properties -> "$.DQ",
//     properties -> "$.GW"
// FROM
// inventory_items
// WHERE
// (current_weight * weighable + current_quantity * countable) != 0
// AND deleted_at IS NULL
// AND `unique` = 1
// AND (`type` LIKE "J%")

// SELECT
// unique_id,
//     description,
//     `code`,
//     `type`,
//     current_weight,
//     certificate,
//     sale_price,
//     --     cost_price,
//     --     properties -> "$.DC",
//     --     properties -> "$.DQ",
//     --     properties -> "$.GW",
//     floor(
//         (
//             (properties -> "$.MainUP" * current_weight) + (properties -> "$.GP" * properties -> "$.GW") + (properties -> "$.DP" * properties -> "$.DC") + (properties -> "$.SP" * properties -> "$.DQ") + (properties -> "$.MP")
// ) / 30
// ) * 100 as `Pre`
// FROM
// inventory_items
// WHERE
// (current_weight * weighable + current_quantity * countable) != 0
// AND deleted_at IS NULL
// AND `unique` = 1
// AND (`type` LIKE "J%")