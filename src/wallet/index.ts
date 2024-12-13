
import { configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet } from 'wagmi/chains';
import { bindAddressToUID } from './bind';

export function initWallet(config?: any) {
  const { chains, provider } = configureChains(
    config?.chains || [mainnet],
    [publicProvider()]
  );

  const client = createClient({
    autoConnect: config?.autoConnect || true,
    provider,
  });

  return {
    client,
    bindAddressToUID,
  };
}
