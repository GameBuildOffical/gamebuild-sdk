// src/index.ts
import { initWallet } from './wallet';
import { initOAuth } from './oauth';

export class GameBuildSDK {
  private walletClient: ReturnType<typeof initWallet>;
  private oauthClient: ReturnType<typeof initOAuth>;

  constructor(options: any) {
    this.walletClient = initWallet(options.wagmiClientConfig);
    this.oauthClient = initOAuth(options.oauthConfig);
  }

  public getWalletClient() {
    return this.walletClient;
  }

  public getOAuthClient() {
    return this.oauthClient;
  }
}

export default GameBuildSDK;
