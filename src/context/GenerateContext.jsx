import { createContext, useReducer } from 'react';

export const GenerateContext = createContext();
GenerateContext.displayName = 'GenerateContext';

const initialState = {
  content: '',
  isLoading: false,
  tone: null,
  isGenerating: false,
};

function generateReducer(state, action) {
  switch (action.type) {
    case 'generate':
      return { ...state, isLoading: true };
    case 'set status':
      return {
        ...state,
        isGenerating: action.isGenerating,
        isLoading: action.isLoading,
      };
    case 'set generating':
      return { ...state, isGenerating: action.isGenerating };
    case 'set loading':
      return { ...state, isLoading: action.isLoading };
    case 'set content':
      return { ...state, tone: action.content };
    case 'set tone':
      return { ...state, tone: action.tone };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export function GenerateProvider(props) {
  const [state, dispatch] = useReducer(generateReducer, initialState);
  const value = [state, dispatch];
  return <GenerateContext.Provider {...props} value={value} />;
}
