import classNames from 'classnames';
import useApp from '../../../hooks/useApp';
import styles from './sidebar.module.css';

export default function Sidebar() {
  const { categories, active, setActive, isScreenSm, navOpen, setNavOpen } =
    useApp();

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
    </nav>
  );
}
