import { SessionProvider } from "next-auth/react";
import { AppProps } from 'next/app';
import "../styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Head from "next/head";
import { useState, useEffect } from "react";


function MyApp({ Component, pageProps }: AppProps) {

  const mockSession = {
    user: {
      name: "Ander Zubizarreta",
      email: "ander.zubizarreta@ikasle.aeg.eus",
      image: "",
    },
    expires: "2025-12-31T23:59:59.999Z",
    accessToken: "fake-access-token",
    refreshToken: "fake-refresh-token",
    email: "jon.pazos@ikasle.aeg.eus",
  };


  return (
    <SessionProvider session={mockSession}>
      <NextUIProvider>
          <Head>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  );

}

export default MyApp;