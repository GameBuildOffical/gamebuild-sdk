// src/index.ts
import { initWallet } from './wallet';
import { initOAuth } from './oauth';
import { AssetManagement } from './modules/asset-management';
import { GuildManagement } from './modules/guild-management';
import { DataAnalysis } from './modules/data-analysis';

export class GameBuildSDK {
  private walletClient: ReturnType<typeof initWallet>;
  private oauthClient: ReturnType<typeof initOAuth>;
  private assetManagement: AssetManagement;
  private guildManagement: GuildManagement;
  private dataAnalysis: DataAnalysis;

  constructor(options: any) {
    this.walletClient = initWallet(options.wagmiClientConfig);
    this.oauthClient = initOAuth(options.oauthConfig);
    this.assetManagement = new AssetManagement(options.assetConfig);
    this.guildManagement = new GuildManagement(options.guildConfig);
    this.dataAnalysis = new DataAnalysis(options.dataConfig);
  }

  public getWalletClient() {
    return this.walletClient;
  }

  public getOAuthClient() {
    return this.oauthClient;
  }

  public getAssetManagement() {
    return this.assetManagement;
  }

  public getGuildManagement() {
    return this.guildManagement;
  }

  public getDataAnalysis() {
    return this.dataAnalysis;
  }
}

export default GameBuildSDK;
