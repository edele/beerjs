// @flow strict

import type { Item } from "./Shop";

export default function countTotalPrice(
  items: Item[],
  includeDeliveryCost: boolean = false
) {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }

  if (includeDeliveryCost === true) {
    total += 500;
  }

  return total;
}
