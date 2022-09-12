import Transition from "@/components/Transition";
import ProtectRouter from "@/contexts/ProtectRouter";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/app.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ProtectRouter>
      <Transition location={router.pathname}>
        <Component {...pageProps} />
      </Transition>
    </ProtectRouter>
  );
}

export default MyApp;
