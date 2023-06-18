import useApp from '../../../hooks/useApp';
import TaskOverview from '../task-overview/TaskOverview';
import styles from './task-list.module.css';

export default function TaskList() {
  const { tasks } = useApp();

  return (
    <div className={styles.list}>
      {tasks.map(task => (
        <TaskOverview key={task.id} {...task} />
      ))}
    </div>
  );
}
