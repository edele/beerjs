// @flow strict

import countTotalPrice from "./countTotalPrice";

it("Простой сценарий", () => {
  const items = [
    { id: "1", name: "Ле Братец лис", image: "socks/1.png", price: 100 },
    { id: "1", name: "Ле Братец лис", image: "socks/1.png", price: 100 }
  ];

  const totalPrice = countTotalPrice(items, false);

  expect(totalPrice).toBe(200);
});

it("Наценка за доставку", () => {
  const items = [
    { id: "1", name: "Ле Братец лис", image: "socks/1.png", price: 100 },
    { id: "1", name: "Ле Братец лис", image: "socks/1.png", price: 100 }
  ];

  const totalPrice = countTotalPrice(items, true);

  expect(totalPrice).toBe(700);
});

it("Доставка должна быть бесплатной, если в корзине больше 5000 рублей", () => {
  const items = [
    { id: "5", name: "Ле Жгучий перец", image: "socks/5.png", price: 500 },
    { id: "5", name: "Ле Жгучий перец", image: "socks/5.png", price: 500 },
    { id: "5", name: "Ле Жгучий перец", image: "socks/5.png", price: 500 },
    { id: "5", name: "Ле Жгучий перец", image: "socks/5.png", price: 500 },
    { id: "5", name: "Ле Жгучий перец", image: "socks/5.png", price: 500 },
    { id: "5", name: "Ле Жгучий перец", image: "socks/5.png", price: 500 },
    { id: "5", name: "Ле Жгучий перец", image: "socks/5.png", price: 500 },
    { id: "5", name: "Ле Жгучий перец", image: "socks/5.png", price: 500 },
    { id: "5", name: "Ле Жгучий перец", image: "socks/5.png", price: 500 },
    { id: "5", name: "Ле Жгучий перец", image: "socks/5.png", price: 500 },
    { id: "5", name: "Ле Жгучий перец", image: "socks/5.png", price: 500 }
  ];

  expect(countTotalPrice(items, true)).toBe(5500);
});
