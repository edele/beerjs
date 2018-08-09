// @flow strict

import * as React from "react";
import socks from "./items";
import "./Shop.css";
import Cart from "./Cart";

export type Item = { id: string, name: string, image: string, price: number };

type State = {
  cart: Item[],
  isCartOpened: boolean
};

class App extends React.Component<{}, State> {
  state = { cart: [], isCartOpened: false };

  render() {
    return (
      <div className="shop">
        <header>
          <h1>Ле Носкишоп Муа</h1>
          <button
            className="cart-button"
            onClick={() =>
              this.setState({ isCartOpened: !this.state.isCartOpened })
            }
          >
            Ле Корзинуа ({this.state.cart.length})
          </button>
          {this.state.isCartOpened && <Cart items={this.state.cart} />}
        </header>
        <Items
          items={socks}
          onAdd={item => {
            this.setState({ cart: [...this.state.cart, item] });
          }}
        />

        <div style={{ padding: 10, borderTop: "1px solid", marginTop: 30 }}>
          2018 © You gotta fight for your right to paaaaaaartyyyy!
        </div>
      </div>
    );
  }
}

function Items({ items, onAdd }) {
  return (
    <div className="items">
      {items.map(item => (
        <div className="item" key={item.name}>
          <div className="item-name">{item.name}</div>
          <div className="item-price">{item.price}₽</div>
          <button onClick={() => onAdd(item)} className="item-add">
            В корзину
          </button>
          <img className="item-image" src={item.image} alt="" />
        </div>
      ))}
    </div>
  );
}

export default App;
