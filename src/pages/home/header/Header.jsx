import useApp from "../../../hooks/useApp";
import useModal from "../../../hooks/useModal";
import CreateTask from "../../../components/tasks/create-task/CreateTask";
import Button from "../../../components/ui/button/Button";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

export default function Header() {
  const navigate = useNavigate();
  const { isScreenSm, navOpen, setNavOpen } = useApp();
  const {
    Modal: CreateTaskModal,
    isModalOpen,
    openModal,
  } = useModal(<CreateTask />);

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        Generator AI
      </div>
      <ul>
        {!navOpen && (
          <Button onClick={openModal}>
            <span>+</span> {isScreenSm ? "Add" : "add task"}
          </Button>
        )}

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
      {isModalOpen && <CreateTaskModal />}
    </header>
  );
}
