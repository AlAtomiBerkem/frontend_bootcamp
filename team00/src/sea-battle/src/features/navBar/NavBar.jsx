import classes from "./navBar.module.scss";
import SvgSelector from "../../components/SvgSelector";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { logoutUser } from "../../api/api";
import { useGame } from "../../contexts/gameContext";

const NavBar = () => {
  const { currentGame } = useGame();
  const navList = [
    { title: "Game", path: "/", img: "game", func: () => {} },
    { title: "Stats", path: "stats", img: "stats", func: () => {} },
    {
      title: "Best Players",
      path: "/bestPlayers",
      img: "bestPlayers",
    },
    {
      title: "Online Game",
      path: "/rooms",
      img: "online",
    },
    {
      title: "Logout",
      path: "/",
      img: "logout",
    },
  ];
  const navigate = useNavigate();
  const [active, setActive] = useState("Game");
  const click = (item) => {
    if (!currentGame) {
      navigate(item.path);
      setActive(item.title);
    }
    if (item.title === "Logout" && !currentGame) {
      logoutUser();
      navigate("/signin");
    }
  };
  return (
    <div className={classes.navbar}>
      <h1>Sea Battle</h1>
      <ul>
        {navList.map((item, i) => (
          <li
            key={i}
            className={clsx(
              classes.list,
              item.title === active && classes.active,
              currentGame && classes.disabled
            )}
            onClick={() => {
              click(item);
            }}
          >
            <SvgSelector id={item.img} />
            <p>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
