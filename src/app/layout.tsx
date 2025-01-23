import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       <Navbar /> 
        {children}
        <Footer />
      </body>
    </html>
  );
}
