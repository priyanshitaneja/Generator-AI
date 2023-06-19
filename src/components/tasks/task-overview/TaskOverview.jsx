import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import useApp from "../../../hooks/useApp";
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";

import styles from "./task-overview.module.css";

const OVERVIEW_KEYWORDS_COUNT = 4;

export default function TaskOverview({ title, keywords, ...rest }) {
  const { id } = { ...rest };
  const { store, active, setStore } = useApp();
  const navigate = useNavigate();

  const titleClassName = classNames(styles.title, styles.truncate);
  const keywordsList = keywords.slice(0, OVERVIEW_KEYWORDS_COUNT);

  const moreKeywords =
    keywords.length > OVERVIEW_KEYWORDS_COUNT ? (
      <p className={classNames(styles.keyword, styles.more)}>
        {`+ ${keywords.length - OVERVIEW_KEYWORDS_COUNT} more`}
      </p>
    ) : null;

  const handleNavigation = () => {
    navigate(`/generate?category=${active.id}&task=${id}`);
  };

  const handleDelete = () => {
    const currentCategory = active.category;
    const newTasks = store[currentCategory].tasks.filter(
      (task) => task.id !== id
    );
    setStore({
      ...store,
      [currentCategory]: { ...store[currentCategory], tasks: newTasks },
    });
  };

  return (
    <>
      <Card className={styles.task} {...rest}>
        <div className="card-content">
          <p className={titleClassName}>{title}</p>
          <div className={styles.keywords}>
            {keywordsList.map((keyword) => (
              <p className={styles.keyword} key={keyword}>
                {keyword}
              </p>
            ))}
            {moreKeywords}
          </div>
        </div>
        <div className={classNames(styles.buttons, styles.buttons_wrapper)}>
          <Button type="danger" onClick={handleDelete}>
            delete
          </Button>
          <Button style={{ minWidth: "100px" }} onClick={handleNavigation}>
            write
          </Button>
        </div>
      </Card>
    </>
  );
}
