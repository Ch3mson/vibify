import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vibify",
  description: "Your music suggestions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              >
            <Container>
              <Header />
              {children}
            </Container>
            <Footer />
            </ThemeProvider>
          </AuthProvider>
        </body>
    </html>
  );
}
