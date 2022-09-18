import Transition from "@/components/Transition";
import ProtectRouter from "@/contexts/ProtectRouter";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import "../styles/app.scss";
import { NextComponentType } from "next";
import { Session } from "next-auth";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export interface CustomAppProps extends AppProps {
  Component: NextComponentType & { auth?: boolean; session?: Session };
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  return (
    <ProtectRouter>
      <Transition location={router.pathname}>
        <Provider store={store}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </Provider>
      </Transition>
    </ProtectRouter>
  );
}

export default MyApp;
