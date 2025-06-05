// Asset Management Module

export interface Asset {
  id: string;
  name: string;
  type: 'FT' | 'NFT';
  owner: string;
  metadata?: Record<string, any>;
}

export class AssetManagement {
  private assets: Map<string, Asset> = new Map();

  constructor(config?: any) {
    // Optionally use config for integration with blockchain or storage
  }

  // Tokenization: Create a new asset (FT or NFT)
  public createAsset(asset: Omit<Asset, 'id'>): Asset {
    const id = `${asset.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newAsset: Asset = { id, ...asset };
    this.assets.set(id, newAsset);
    return newAsset;
  }

  // Ownership and Transfer: Transfer asset to another owner
  public transferAsset(assetId: string, newOwner: string): boolean {
    const asset = this.assets.get(assetId);
    if (!asset) return false;
    asset.owner = newOwner;
    this.assets.set(assetId, asset);
    return true;
  }

  // Get asset by ID
  public getAsset(assetId: string): Asset | undefined {
    return this.assets.get(assetId);
  }

  // Interoperable Assets: List all assets (could be filtered by game, owner, etc.)
  public listAssets(filter?: Partial<Asset>): Asset[] {
    let assets = Array.from(this.assets.values());
    if (filter) {
      assets = assets.filter(asset =>
        Object.entries(filter).every(([key, value]) => (asset as any)[key] === value)
      );
    }
    return assets;
  }
}