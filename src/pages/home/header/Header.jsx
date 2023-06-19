import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import useApp from "../../../hooks/useApp";

import styles from "./header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const { isScreenSm, navOpen, setNavOpen } = useApp();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        Generative AI
      </div>
      <ul>
        {isScreenSm && (
          <li
            className={classNames(styles.hamburger, {
              [styles.open]: navOpen,
            })}
            onClick={() => setNavOpen(!navOpen)}
          >
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </li>
        )}
      </ul>
    </header>
  );
}
