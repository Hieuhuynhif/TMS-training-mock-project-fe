import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { SWRConfig } from "swr";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <SWRConfig
            value={{
              revalidateOnFocus: false,
              revalidateOnReconnect: false,
              revalidateIfStale: false,
            }}
          >
            {children}
          </SWRConfig>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
