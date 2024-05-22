import { AppProvider } from "@/app/ui/AppContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
