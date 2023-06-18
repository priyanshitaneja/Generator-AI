import classNames from 'classnames';
import styles from './button.module.css';

export default function Button({
  className,
  type = 'primary',
  children,
  ...rest
}) {
  const combinedClassName = classNames(styles.button, styles[type], className);
  return (
    <button className={combinedClassName} {...rest}>
      {children}
    </button>
  );
}
