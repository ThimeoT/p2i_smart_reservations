import { Outlet } from 'react-router'
import Header from './Header'

export default function RootLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}