import classNames from 'classnames';
import styles from './card.module.css';

export default function Card({ children, className, ...rest }) {
  const combinedClassName = classNames(styles.card, className);

  return (
    <div className={combinedClassName} {...rest}>
      {children}
    </div>
  );
}
