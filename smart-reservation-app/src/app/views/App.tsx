import { useInitializeApp } from '../hooks/useInitializeApp'
import AppRoutes from './AppRoutes'

export default function App() {
  useInitializeApp()
  return <AppRoutes />
}