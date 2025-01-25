import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { UserProvider } from "@/context/user";
import { CartProvider } from "@/context/cart";
import { ProductProvider } from "@/context/product";
import {
  ClerkProvider
} from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <ProductProvider>
      <UserProvider>
        <CartProvider>
        <body>
        <Navbar /> 
          {children}
          <Footer />
        </body>
        </CartProvider>
      </UserProvider>
      </ProductProvider>
    </html>
    </ClerkProvider>
  );
}
