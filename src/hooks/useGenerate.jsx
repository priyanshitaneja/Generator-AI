import { useContext } from 'react';
import { GenerateContext } from '../context/GenerateContext';

export default function useGenerate() {
  const context = useContext(GenerateContext);
  if (!context)
    throw new Error('useGenerate must be used within a GenerateProvider');
  return context;
}
