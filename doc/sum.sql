-- J
SELECT sum(current_quantity)
FROM inventory_items
WHERE (current_weight * weighable + current_quantity * countable) != 0
    AND deleted_at IS NULL
    AND `shelf` like "1-J%";

-- RB
SELECT sum(current_quantity)
FROM inventory_items
WHERE (current_weight * weighable + current_quantity * countable) != 0
    AND deleted_at IS NULL
    AND `shelf` = "1-G.RB";

-- BS
SELECT sum(current_quantity)
FROM inventory_items
WHERE (current_weight * weighable + current_quantity * countable) != 0
    AND deleted_at IS NULL
    AND `shelf` = "1-G.BS";

-- EM
SELECT sum(current_quantity)
FROM inventory_items
WHERE (current_weight * weighable + current_quantity * countable) != 0
    AND deleted_at IS NULL
    AND `shelf` = "1-G.EM";

-- CS
SELECT sum(current_quantity)
FROM inventory_items
WHERE (current_weight * weighable + current_quantity * countable) != 0
    AND deleted_at IS NULL
    AND `shelf` = "1-G.CS";

-- CB
SELECT sum(current_quantity)
FROM inventory_items
WHERE (current_weight * weighable + current_quantity * countable) != 0
    AND deleted_at IS NULL
    AND `shelf` in ("1-G.CB", "1-G.CE", "1-G.SS");