import { RouterProvider } from "react-router";
import { router } from "../router/AppRoutes";
import { AuthProvider } from "../../features/auth/context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools /> */}
      </AuthProvider>
    </QueryClientProvider>
  );
}
