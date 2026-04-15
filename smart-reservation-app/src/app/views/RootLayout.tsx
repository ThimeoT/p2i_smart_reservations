import { Outlet } from 'react-router';
import Header from './Header';
import FondEcran from './FondEcran';
import Footer from './Footer';

export default function RootLayout() {
  return (
    <>
      <Header />
      <FondEcran>
        <Outlet />
      </FondEcran>
      <Footer />
    </>
  );
}
