import { createContext, useState } from 'react';
import useMedia from '../hooks/useMedia';
import data from './../utils/data.json';

export const AppContext = createContext();
AppContext.displayName = 'AppContext';

export function AppProvider(props) {
  const [store, setStore] = useState(data);
  const categories = store
    ? Object.keys(store).map(key => ({ category: key, id: store[key].id }))
    : [];
  const [active, setActive] = useState(() =>
    categories && categories.length ? categories[0] : null
  );
  const tasks = active ? store[active.category].tasks : null;
  const [navOpen, setNavOpen] = useState(false);

  const isScreenSm = useMedia('(max-width: 576px)');
  const isScreenMd = useMedia('(max-width: 767px)');
  const isScreenLg = useMedia('(min-width: 1024px');

  return (
    <AppContext.Provider
      {...props}
      value={{
        isScreenLg,
        isScreenMd,
        isScreenSm,
        active,
        categories,
        tasks,
        setActive,
        setStore,
        store,
        navOpen,
        setNavOpen,
      }}
    />
  );
}
