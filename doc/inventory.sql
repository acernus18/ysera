-- SELECT
--     unique_id,
--     description,
--     `code`,
--     `type`,
--     current_weight,
--     certificate,
--     sale_price,
--     properties->"$.L",
--     properties->"$.W",
--     properties->"$.H",
--     properties->"$.Shape"
-- FROM
--     inventory_items
-- WHERE
--     (current_weight * weighable + current_quantity * countable) != 0
--     AND deleted_at IS NULL
--     AND `unique` = 1
--     and unique_id in (2150,2594,4762,4786,4795,4809,5126,5133,5107,5108,5102)
--     AND (
--         `type` LIKE "G/EM%" or `type` LIKE "G/SS%" or `type` LIKE "G/CE%" or `type` LIKE "G/CB%" or `type` LIKE "G/GS%"
--     )

SELECT
    unique_id,
    description,
    `code`,
    `type`,
    current_weight,
    certificate,
    sale_price,
    properties->"$.L",
    properties->"$.W",
    properties->"$.H",
    properties->"$.Shape"
FROM
    inventory_items
WHERE
    (current_weight * weighable + current_quantity * countable) != 0
    AND deleted_at IS NULL
    AND `unique` = 1
    AND (
        `type` LIKE "G/RB%"
    )

SELECT unique_id,
       description,
       `type`,
       `code`,
       current_weight,
--        current_quantity,
       properties->"$.DC",
       properties->"$.DQ",
       properties->"$.GW",
       properties->"$.Jsize",
--        properties,
       remarks
-- *
FROM inventory_items
WHERE (current_weight * weighable + current_quantity * countable) != 0
    AND `type` LIKE "J%";
-- select * from inventory_items where current_weight >= 0.0 and current_weight < 0.08 and deleted_at is null;
-- select * from inventory_ledger_entries WHERE inventory_id = "13479";
-- update inventory_items set deleted_at = now() where unique_id like "DX%" and deleted_at is null