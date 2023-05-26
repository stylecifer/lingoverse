// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import {useSSR} from '@nextui-org/react';
import { Session } from 'inspector';

const darkTheme = createTheme({type: "dark"});

export default function App({ Component, pageProps }: AppProps<{initialSession: Session,}>) {
  const { isBrowser } = useSSR()
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return( 
    isBrowser && (
    <SessionContextProvider
            supabaseClient={supabaseClient}
    >
          <NextUIProvider theme={darkTheme}>
            <Component {...pageProps} />
          </NextUIProvider>
        </SessionContextProvider>
    ))
}