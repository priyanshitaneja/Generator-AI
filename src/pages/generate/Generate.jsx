import Editor from '../../components/editor/Editor';
import Options from '../../components/options/Options';
import { GenerateProvider } from '../../context/GenerateContext';
import styles from './generate.module.css';
import Header from './header/Header';

export default function Generate() {
  return (
    <GenerateProvider>
      <div className={styles.generate}>
        <Header />
        <main className={styles.main}>
          <Options />
          <Editor />
        </main>
      </div>
    </GenerateProvider>
  );
}
