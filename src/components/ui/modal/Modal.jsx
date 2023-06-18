import { createPortal } from 'react-dom';
import styles from './modal.module.css';

export default function Modal({ children, ...rest }) {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal} {...rest}>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  );
}
