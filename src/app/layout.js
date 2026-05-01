import "./globals.css";

export const metadata = {
  title: "Medical Admin Dashboard",
  description: "Manage your medical products with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
