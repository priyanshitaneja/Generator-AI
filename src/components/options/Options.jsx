import { useEffect } from 'react';
import useGenerate from '../../hooks/useGenerate';
import Card from '../ui/card/Card';
import styles from './options.module.css';

const tones = ['compelling', 'authentic', 'persuasive', 'informative', 'funny'];

export default function Options() {
  const [{ tone: selectedTone, isLoading, isGenerating }, dispatch] =
    useGenerate();

  useEffect(() => {
    if (!selectedTone) dispatch({ type: 'set tone', tone: tones[0] });
  }, [dispatch, selectedTone]);

  const disabled = isGenerating || isLoading;

  return (
    <Card className={styles.container}>
      <div className={styles.title}>Select a tone</div>
      <div className={styles.options}>
        {tones.map(tone => {
          return (
            <div className={styles.option} key={tone}>
              <input
                type="radio"
                name="tone"
                id={tone}
                checked={selectedTone === tone}
                disabled={disabled}
                onChange={() => {
                  dispatch({ type: 'set tone', tone: tone });
                }}
              />
              <label htmlFor={tone}>{tone}</label>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
