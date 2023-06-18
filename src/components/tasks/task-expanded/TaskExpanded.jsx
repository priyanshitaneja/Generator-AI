import { useNavigate } from 'react-router-dom';
import useApp from '../../../hooks/useApp';
import Button from '../../ui/button/Button';
import Card from '../../ui/card/Card';
import styles from './task-expanded.module.css';

export default function TaskExpanded({ id, title, keywords, closeModal }) {
  const { store, active, setStore } = useApp();
  const navigate = useNavigate();

  const handleNavigation = () => {
    closeModal();
    navigate(`/generate?category=${active.id}&task=${id}`);
  };

  const handleDelete = () => {
    const currentCategory = active.category;
    const newTasks = store[currentCategory].tasks.filter(
      task => task.id !== id
    );
    setStore({
      ...store,
      [currentCategory]: { ...store[currentCategory], tasks: newTasks },
    });
    closeModal();
  };

  return (
    <Card className={styles.task_exp}>
      <h3>{title}</h3>
      <div className={styles.keywords}>
        {keywords.map(keyword => {
          return (
            <p className={styles.keyword} key={keyword}>
              {keyword}
            </p>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <Button type="danger" onClick={handleDelete}>
          delete
        </Button>
        <Button style={{ minWidth: '100px' }} onClick={handleNavigation}>
          write
        </Button>
      </div>
    </Card>
  );
}
