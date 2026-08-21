import "./globals.css";
import Providers from "@/store/Providers";
import Sidebar from "@/components/Sidebar";

export const metadata = { title: "3D Bharat Investment OS", description: "Investor and corporate analytics dashboard" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Providers><div className="appShell"><Sidebar/><main className="main">{children}</main></div></Providers></body></html>;
}
