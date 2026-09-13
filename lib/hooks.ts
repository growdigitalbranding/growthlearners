'use client';

import { useEffect, useState } from 'react';
import { DESKTOP_QUERY } from './motion';

/** SSR-safe media query. Returns false on the server and on first paint. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Magnetic and parallax only run here. */
export function useIsDesktop(): boolean {
  return useMediaQuery(DESKTOP_QUERY);
}
