import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import styles from './layout.module.css';
import TaskList from '../../components/tasks/tasks-list/TaskList';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Sidebar />
      <main className={styles.main}>
        <TaskList />
      </main>
    </div>
  );
}
