import Transition from "@/components/Transition";
import ProtectRouter from "@/contexts/ProtectRouter";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import "../styles/app.scss";
import { NextComponentType } from "next";
import { Session } from "next-auth";

export interface CustomAppProps extends AppProps {
  Component: NextComponentType & { auth?: boolean; session?: Session };
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  return (
    <ProtectRouter>
      <Transition location={router.pathname}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Transition>
    </ProtectRouter>
  );
}

export default MyApp;
