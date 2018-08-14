// @flow strict

import * as React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "react-testing-library";

import Cart from "./Cart";

afterEach(cleanup);

test("Один товар", async () => {
  const { getByText, getByTestId, container } = render(
    <Cart
      items={[
        { id: "1", name: "Ле Братец лис", image: "socks/1.png", price: 100 }
      ]}
    />
  );

  expect(getByTestId("totalPrice")).toHaveTextContent("100₽");
});

test("Два одинаковых товара", async () => {
  const { getByText, getByTestId, container } = render(
    <Cart
      items={[
        { id: "1", name: "Ле Братец лис", image: "socks/1.png", price: 100 },
        { id: "1", name: "Ле Братец лис", image: "socks/1.png", price: 100 }
      ]}
    />
  );

  expect(getByTestId("totalPrice")).toHaveTextContent("200₽");
});

test("Три товара и доставка", async () => {
  const { getByText, getByTestId, container } = render(
    <Cart
      items={[
        { id: "1", name: "Ле Братец лис", image: "socks/1.png", price: 100 },
        { id: "2", name: "Ле Кис-Кис", image: "socks/2.png", price: 200 },
        { id: "3", name: "Ле Хохлома", image: "socks/3.png", price: 300 }
      ]}
    />
  );

  fireEvent.click(getByText("Нужна доставка"));

  expect(getByTestId("totalPrice")).toHaveTextContent("1100₽");
});

test("Доставка должна быть бесплатной, если в корзине больше 5000 рублей", async () => {
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

  const { getByText, getByTestId, container } = render(<Cart items={items} />);

  fireEvent.click(getByText("Нужна доставка"));

  expect(getByTestId("totalPrice")).toHaveTextContent("5500₽");
});
