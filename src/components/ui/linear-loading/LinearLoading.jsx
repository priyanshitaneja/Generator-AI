import styles from './linear-loading.module.css';

export default function LinearLoading() {
  return (
    <div className={styles.indicator}>
      <div className={styles.bar}></div>
    </div>
  );
}
