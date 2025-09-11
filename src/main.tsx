import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OnchainKitProvider, type AppConfig } from '@coinbase/onchainkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, type Hex } from 'viem'
import { WagmiProvider, createConfig } from 'wagmi'
import { base, polygon, arbitrum } from 'wagmi/chains'
import { 
  BalanceProvider, 
  BetSwirlSDKProvider, 
  FreebetsProvider, 
  LeaderboardProvider, 
  TokenProvider, 
  type TokenWithImage 
} from '@betswirl/ui-react'
import './index.css'
import '@betswirl/ui-react/styles.css'
import App from './App.tsx'

const queryClient = new QueryClient()
// Use custom RPC if provided in .env, otherwise use default
const baseRpc = import.meta.env.VITE_BASE_RPC_URL
const polygonRpc = import.meta.env.VITE_POLYGON_RPC_URL  
const arbitrumRpc = import.meta.env.VITE_ARBITRUM_RPC_URL

const config = createConfig({
  chains: [base, polygon, arbitrum],
  transports: {
    [base.id]: baseRpc ? http(baseRpc) : http(),
    [polygon.id]: polygonRpc ? http(polygonRpc) : http(),
    [arbitrum.id]: arbitrumRpc ? http(arbitrumRpc) : http(),
  },
})

const onChainKitConfig: AppConfig = {
  wallet: {
    display: "modal",
  }
}

// Optional: Define tokens for your application
const DEGEN_TOKEN: TokenWithImage = {
  address: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed" as Hex,
  symbol: "DEGEN",
  decimals: 18,
  image: "https://www.betswirl.com/img/tokens/DEGEN.svg"
}

const ETH_TOKEN: TokenWithImage = {
  address: "0x0000000000000000000000000000000000000000" as Hex,
  symbol: "ETH",
  decimals: 18,
  image: "https://www.betswirl.com/img/tokens/ETH.svg"
}

// Optional: Limit available tokens to specific ones
const ALLOWED_TOKENS = [
  DEGEN_TOKEN.address,
  ETH_TOKEN.address,
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Hex, // USDC
  "0x94025780a1aB58868D9B2dBBB775f44b32e8E6e5" as Hex, // BETS
]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider chain={base} config={onChainKitConfig}>
          <BetSwirlSDKProvider
            initialChainId={base.id}
            supportedChains={[base.id, polygon.id, arbitrum.id]}
            bankrollToken={DEGEN_TOKEN}     // Optional: set default betting token
            filteredTokens={ALLOWED_TOKENS} // Optional: limit available tokens
          >
            <TokenProvider>
              <BalanceProvider>
                <FreebetsProvider>
                  <LeaderboardProvider>
                    <App />
                  </LeaderboardProvider>
                </FreebetsProvider>
              </BalanceProvider>
            </TokenProvider>
          </BetSwirlSDKProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
