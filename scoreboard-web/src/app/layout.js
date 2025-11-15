// layout.tsx
import './globals.css';

export const metadata = {
  title: "Kids Quiz Game",
  description: "Fun quiz for high‑school competition",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
    {children}
        </div>
      </body>
    </html>
  );
}
