import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OnchainKitProvider, type AppConfig } from '@coinbase/onchainkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, type Hex } from 'viem'
import { WagmiProvider, createConfig } from 'wagmi'
import { base, polygon, arbitrum, bsc, avalanche  } from 'wagmi/chains'
import { 
  BalanceProvider, 
  BetSwirlSDKProvider, 
  FreebetsProvider, 
  LeaderboardProvider, 
  TokenProvider, 
} from '@betswirl/ui-react'
import './index.css'
import '@betswirl/ui-react/styles.css'
import App from './App.tsx'

const queryClient = new QueryClient()
// Use custom RPC if provided in .env, otherwise use default
const baseRpc = import.meta.env.VITE_BASE_RPC_URL
const polygonRpc = import.meta.env.VITE_POLYGON_RPC_URL  
const arbitrumRpc = import.meta.env.VITE_ARBITRUM_RPC_URL
const bscRpc = import.meta.env.VITE_BSC_RPC_URL
const avalancheRpc = import.meta.env.VITE_AVALANCHE_RPC_URL

const affiliateAddress = import.meta.env.VITE_AFFILIATE_ADDRESS
const testMode = import.meta.env.VITE_TEST_MODE == 'true'

const config = createConfig({
  chains: [base, polygon, arbitrum],
  transports: {
    [base.id]: baseRpc ? http(baseRpc) : http(),
    [polygon.id]: polygonRpc ? http(polygonRpc) : http(),
    [arbitrum.id]: arbitrumRpc ? http(arbitrumRpc) : http(),
    [bsc.id]: bscRpc ? http(bscRpc) : http(),
    [avalanche.id]: avalancheRpc ? http(avalancheRpc) : http(),
  },
})

const onChainKitConfig: AppConfig = {
  wallet: {
    display: "modal",
  }
}

// Optional: Limit available tokens to specific ones
const ALLOWED_TOKENS = [
  "0x0000000000000000000000000000000000000000", // gas token on all chains
  "0x94025780a1aB58868D9B2dBBB775f44b32e8E6e5", // BETS on all chains
  "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed", // DEGEN ton Base
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
] as Hex[]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider chain={base} config={onChainKitConfig}>
          <BetSwirlSDKProvider
            initialChainId={base.id} // set the initial chain
            supportedChains={[base.id, polygon.id, arbitrum.id, bsc.id, avalanche.id]} // limit supported chains
            filteredTokens={ALLOWED_TOKENS} // Optional: limit available tokens, let empty if you want to show all tokens
            affiliate={affiliateAddress} // important to set to be able to receive your affiliate rewards
            testMode={testMode} // Optional: set to true to enable test mode
            withExternalBankrollFreebets={true} // Optional: enable your users to use freebets created by bankroll providers on your app
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
