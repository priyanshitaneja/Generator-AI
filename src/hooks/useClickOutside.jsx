import { useEffect, useRef } from 'react';

export function useClickOutside(fn) {
  const ref = useRef();

  const handleClick = e => {
    const target = e.target;
    if (ref.current && !ref.current.contains(target)) {
      fn();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
