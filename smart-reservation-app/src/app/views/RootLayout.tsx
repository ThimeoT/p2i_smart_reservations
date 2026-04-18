import { Outlet } from 'react-router';
import Header from './Header';
import FondEcran from './FondEcran';
import Footer from './Footer';
import BackLink from '../../shared/components/BackLink';
import { NavigationHistoryProvider } from '../context/NavigationHistoryContext';

export default function RootLayout() {
  return (
    <NavigationHistoryProvider>
      <Header />
      <BackLink />
      <FondEcran>
        <Outlet />
      </FondEcran>
      <Footer />
    </NavigationHistoryProvider>
  );
}
