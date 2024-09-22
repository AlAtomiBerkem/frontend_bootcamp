import classes from "./stats.module.scss";
import React from "react";
import SvgSelector from "../../components/SvgSelector";

const Stats = () => {
  return (
    <div className={classes.container}>
      <h1>Game Stats:</h1>
      <div className={classes.content}>
        <div className={classes["left-container"]}>
          <table>
            <tbody>
              <tr>
                <td>Game played: </td>
                <td>50</td>
              </tr>
              <tr>
                <td>Win rate:</td>
                <td>100%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={classes["right-container"]}>
          <p>
            Ships destroyed: <span>500</span>
          </p>
          <table>
            <tbody>
              <tr>
                <td>
                  <SvgSelector id="ship4" />
                </td>
                <td>4x cage:</td>
                <td>50</td>
              </tr>
              <tr>
                <td>
                  <SvgSelector id="ship3" />
                </td>
                <td>4x cage:</td>
                <td>100</td>
              </tr>
              <tr>
                <td>
                  <SvgSelector id="ship2" />
                </td>
                <td>4x cage:</td>
                <td>150</td>
              </tr>
              <tr>
                <td>
                  <SvgSelector id="ship1" />
                </td>
                <td>4x cage:</td>
                <td>200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stats;
