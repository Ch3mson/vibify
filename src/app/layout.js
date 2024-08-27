import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vibify",
  description: "Your music suggestions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthProvider>
          {children}
          </AuthProvider>
        </body>
    </html>
  );
}
