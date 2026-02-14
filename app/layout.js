export const metadata = {
    title: "Valentine's Sunflower Garden 🌻",
    description: "A special Valentine's gift for you",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body style={{ margin: 0, padding: 0 }}>{children}</body>
      </html>
    );
  }