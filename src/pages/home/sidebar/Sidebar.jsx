import classNames from "classnames";

import useApp from "../../../hooks/useApp";
import useModal from "../../../hooks/useModal";
import Button from "../../../components/ui/button/Button";
import CreateTask from "../../../components/tasks/create-task/CreateTask";

import styles from "./sidebar.module.css";

export default function Sidebar() {
  const { categories, active, setActive, isScreenSm, navOpen, setNavOpen } =
    useApp();
  const {
    Modal: CreateTaskModal,
    isModalOpen,
    openModal,
  } = useModal(<CreateTask />);

  return (
    <nav
      className={classNames(styles.nav, {
        [styles.open]: isScreenSm && navOpen,
        [styles.close]: isScreenSm && !navOpen,
      })}
    >
      {/* <p className={styles.title}>All Categories ({categories.length})</p> */}
      <ul>
        {categories.map(({ category, id }) => (
          <li
            key={id}
            className={classNames(styles.li, {
              [styles.active]: active.category === category,
            })}
            onClick={() => {
              setActive({ category, id });
              if (navOpen) setNavOpen(false);
            }}
          >
            {category}
          </li>
        ))}
      </ul>
      {!navOpen && (
        <Button onClick={openModal}>
          <span>+</span> {isScreenSm ? "Add" : "add task"}
        </Button>
      )}
      {isModalOpen && <CreateTaskModal />}
    </nav>
  );
}
