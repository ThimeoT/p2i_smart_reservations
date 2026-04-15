import { Outlet } from 'react-router';
import FondEcran from './FondEcran';

export default function AuthLayout() {
  return (
    <FondEcran>
      <Outlet />
    </FondEcran>
  );
}
