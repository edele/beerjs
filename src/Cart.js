// @flow strict

import * as React from "react";
import type { Item } from "./Shop";
import Switch from "./Switch";
import countTotalPrice from "./countTotalPrice";

import "./Cart.css";

type Props = {
  items: Item[]
};

type State = { needsDelivery: boolean };

export default class Cart extends React.Component<Props, State> {
  state = { needsDelivery: false };

  render() {
    return (
      <div className="cart">
        {this.props.items.length > 0 ? (
          <React.Fragment>
            <div className="cart-header">Ваш заказ</div>

            <table className="cart-table">
              <tbody>
                {groupAndCountItems(this.props.items).map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}₽</td>
                    <td>{item.count} шт</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-footer">
              <label>
                <Switch
                  checked={this.state.needsDelivery}
                  onChange={e => {
                    this.setState({
                      needsDelivery: e.currentTarget.checked
                    });
                  }}
                />{" "}
                Нужна доставка
              </label>
              <div className="cart-total">
                Полная стоимость:{" "}
                <span data-testid="totalPrice">
                  {countTotalPrice(this.props.items, this.state.needsDelivery)}₽
                </span>
              </div>
            </div>
          </React.Fragment>
        ) : (
          "Ваш заказ пуст"
        )}
      </div>
    );
  }
}

function groupAndCountItems(items) {
  const idToCount = {};

  for (const item of items) {
    if (idToCount[item.id] === undefined) {
      idToCount[item.id] = 1;
    } else {
      idToCount[item.id] += 1;
    }
  }

  return Object.keys(idToCount).map(id => ({
    ...items.find(x => x.id === id),
    count: idToCount[id]
  }));
}
