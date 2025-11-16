// layout.tsx
import './globals.css';
import { UserDataContextProvider} from '@/context/userData';
export const metadata = {
  title: "Kids Quiz Game",
  description: "Fun quiz for high‑school competition",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <UserDataContextProvider >
        <div className='flex justify-center items-center p-4'>
    {children}
        </div>
        </UserDataContextProvider>
      </body>
    </html>
  );
}
