import React from "react";
import classes from "./field.module.scss";
import clsx from "clsx";

const FieldOfOpponent = () => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className={classes["grid-container"]}>
      {cols.map((col) => (
        <div key={col} className={classes.header}>
          {String(col).padStart(2, "0")}
        </div>
      ))}
      <div className={clsx(classes.header, classes.empty)}></div>
      {rows.map((row) => (
        <React.Fragment key={row}>
          {cols.map((col) => (
            <div
              key={row + col}
              className={clsx(classes.cell, classes.pink)}
            ></div>
          ))}
          <div className={classes.header}>{row}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FieldOfOpponent;
