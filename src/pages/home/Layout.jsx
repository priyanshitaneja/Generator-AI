import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import TaskList from '../../components/tasks/tasks-list/TaskList';

import styles from './layout.module.css';

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
