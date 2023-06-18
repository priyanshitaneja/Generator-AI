import useModal from '../../../hooks/useModal';
import TaskExpanded from '../task-expanded/TaskExpanded';
import classNames from 'classnames';
import Card from '../../ui/card/Card';
import styles from './task-overview.module.css';

const OVERVIEW_KEYWORDS_COUNT = 4;

export default function TaskOverview({ title, keywords, ...rest }) {
  const { Modal, openModal, isModalOpen } = useModal(
    <TaskExpanded title={title} keywords={keywords} {...rest} />
  );
  const titleClassName = classNames(styles.title, styles.truncate);
  const keywordsList = keywords.slice(0, OVERVIEW_KEYWORDS_COUNT);

  const moreKeywords =
    keywords.length > OVERVIEW_KEYWORDS_COUNT ? (
      <p className={classNames(styles.keyword, styles.more)}>
        {`+ ${keywords.length - OVERVIEW_KEYWORDS_COUNT} more`}
      </p>
    ) : null;

  return (
    <>
      <Card className={styles.task} {...rest} onClick={openModal}>
        <p className={titleClassName}>{title}</p>
        <div className={styles.keywords}>
          {keywordsList.map(keyword => (
            <p className={styles.keyword} key={keyword}>
              {keyword}
            </p>
          ))}
          {moreKeywords}
        </div>
      </Card>
      {isModalOpen && <Modal />}
    </>
  );
}
