import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

interface NavigationHistoryContextType {
  history: string[];
  popTo: (path: string) => void;
}

const NavigationHistoryContext = createContext<NavigationHistoryContextType>({
  history: [],
  popTo: () => {},
});

export function NavigationHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const [history, setHistory] = useState<string[]>([location.pathname]);
  const currentPath = useRef<string>(location.pathname);
  const navigatingBack = useRef(false);

  useEffect(() => {
    if (location.pathname === currentPath.current) return;
    if (!navigatingBack.current) {
      setHistory((prev) => {
        if (location.pathname === '/home') return ['/home'];
        return [...prev, location.pathname];
      });
    }
    navigatingBack.current = false;
    currentPath.current = location.pathname;
  }, [location.pathname]);

  const popTo = (path: string) => {
    navigatingBack.current = true;
    setHistory((prev) => {
      const idx = prev.lastIndexOf(path);
      return idx >= 0 ? prev.slice(0, idx + 1) : prev;
    });
  };

  return (
    <NavigationHistoryContext.Provider value={{ history, popTo }}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}

export function useNavigationHistory() {
  return useContext(NavigationHistoryContext);
}
