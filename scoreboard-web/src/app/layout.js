// layout.tsx
import './globals.css';
import { UserDataContextProvider } from '@/context/userData';
export const metadata = {
  title: "Scoreboard",
  description: "A scoreboard for Subway Surfers IRL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundImage: "url('/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          minHeight: '100vh',
        }}
      >
         <UserDataContextProvider>
  <div className="flex justify-center items-center p-4 min-h-screen w-full">
    {children}
  </div>
</UserDataContextProvider>

      </body>
    </html>
  );
}
