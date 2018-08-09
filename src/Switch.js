// @flow strict

import * as React from "react";
import "./Switch.css";

type Props = {
  onChange: (SyntheticEvent<HTMLInputElement>) => void,
  checked: boolean
};

export default function Switch(props: Props) {
  return (
    <label className="ios7-switch" style={{ fontSize: 48 }}>
      <input type="checkbox" {...props} />
      <span />
    </label>
  );
}
