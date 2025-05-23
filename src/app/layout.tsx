"use client"

import "./globals.css"
import "@rainbow-me/rainbowkit/styles.css"

import Script from "next/script"
import { Press_Start_2P } from "next/font/google"
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { hardhat, sepolia } from "wagmi/chains"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

import { Toaster } from "react-hot-toast"

const config = getDefaultConfig({
  appName: "cartbit",
  projectId: "f5dc276367eb7e124550036ec4aab6df",
  chains: [hardhat, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
})

const queryClient = new QueryClient()

const press = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  weight: "400",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Script src="/n64wasm.js" />
      <Toaster
        containerClassName="mt-2.5"
        toastOptions={{
          className: "!rounded-xl !shadow-lg !px-3 !font-sans",
        }}
      />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <body className={press.className}>{children}</body>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </html>
  )
}
