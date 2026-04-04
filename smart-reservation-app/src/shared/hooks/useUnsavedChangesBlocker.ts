import { useBlocker } from 'react-router';

export function useUnsavedChangesBlocker(isDirty: boolean) {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  const confirm = () => blocker.proceed?.();
  const cancel = () => blocker.reset?.();

  return {
    isBlocked: blocker.state === 'blocked',
    confirm,
    cancel,
  };
}