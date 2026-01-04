import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/router";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}
