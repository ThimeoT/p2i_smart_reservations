import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

interface NavigationHistoryContextType {
  previousPath: string | null;
}

const NavigationHistoryContext = createContext<NavigationHistoryContextType>({
  previousPath: null,
});

export function NavigationHistoryProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const currentPath = useRef<string>(location.pathname);

  useEffect(() => {
    if (location.pathname !== currentPath.current) {
      setPreviousPath(currentPath.current);
      currentPath.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <NavigationHistoryContext.Provider value={{ previousPath }}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}

export function useNavigationHistory() {
  return useContext(NavigationHistoryContext);
}
