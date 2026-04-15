import { Outlet } from 'react-router'
import Header from './Header'
import ContenuPage from './ContenuPage'

export default function RootLayout() {
  return (
    <div>
      <Header />
      <ContenuPage>
        <Outlet />
      </ContenuPage>
    </div>
  )
}