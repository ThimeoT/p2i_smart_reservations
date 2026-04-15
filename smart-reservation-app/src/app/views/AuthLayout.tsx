import { Outlet } from "react-router";
import ContenuPage from "./ContenuPage";

export default function AuthLayout() {
  return (
    <ContenuPage>
      <Outlet />
    </ContenuPage>
  );
}
