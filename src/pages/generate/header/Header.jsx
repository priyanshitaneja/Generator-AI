import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/button/Button';
import styles from './header.module.css';
import useGenerate from '../../../hooks/useGenerate';

export default function Header() {
  const navigate = useNavigate();
  const [, dispatch] = useGenerate();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        Generator AI
      </div>
      <ul>
        {/* <li>
          <Button type="secondary">Copy</Button> TODO: copy & download
        </li> */}
        <li>
          <Button onClick={() => dispatch({ type: 'generate' })}>
            Generate
          </Button>
        </li>
      </ul>
    </header>
  );
}
