import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        Generative AI
      </div>
    </header>
  );
}
