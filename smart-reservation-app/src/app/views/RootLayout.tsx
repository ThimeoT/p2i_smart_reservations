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
      <FondEcran>
        <BackLink />
        <div className="mx-8 md:mx-auto md:max-w-2/4">
          <Outlet />
        </div>
      </FondEcran>
      <Footer />
    </NavigationHistoryProvider>
  );
}
