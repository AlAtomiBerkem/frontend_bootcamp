import React from "react";
import classes from "./bestPlayers.module.scss";

const BestPlayers = () => {
  return (
    <div className={classes.container}>
      <h1>Best Players: </h1>
      <div className={classes.content}>
        <div>
          <p>1.</p>
          <div className={classes.item}>
            <table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Winrate</th>
                  <th>Game Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Boba</td>
                  <td>98%</td>
                  <td>1000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <p>1.</p>
          <div className={classes.item}>
            <table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Winrate</th>
                  <th>Game Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Boba</td>
                  <td>98%</td>
                  <td>1000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestPlayers;
