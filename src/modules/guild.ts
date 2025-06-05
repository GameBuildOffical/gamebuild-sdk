// Guild Management Module

export interface Guild {
  id: string;
  name: string;
  emblem?: string;
  rules?: string;
  members: string[]; // userIds
  resources?: Record<string, number>;
  leaderboardScore?: number;
}

export class GuildManagement {
  private guilds: Map<string, Guild> = new Map();

  constructor(config?: any) {
    // Optionally use config for integration with storage or external services
  }

  // Guild Creation and Customization
  public createGuild(data: Omit<Guild, 'id' | 'members'> & { creatorId: string }): Guild {
    const id = `guild-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const guild: Guild = {
      id,
      name: data.name,
      emblem: data.emblem,
      rules: data.rules,
      members: [data.creatorId],
      resources: data.resources || {},
      leaderboardScore: 0,
    };
    this.guilds.set(id, guild);
    return guild;
  }

  // Guild Membership Management
  public joinGuild(guildId: string, userId: string): boolean {
    const guild = this.guilds.get(guildId);
    if (!guild || guild.members.includes(userId)) return false;
    guild.members.push(userId);
    this.guilds.set(guildId, guild);
    return true;
  }

  public leaveGuild(guildId: string, userId: string): boolean {
    const guild = this.guilds.get(guildId);
    if (!guild || !guild.members.includes(userId)) return false;
    guild.members = guild.members.filter(id => id !== userId);
    this.guilds.set(guildId, guild);
    return true;
  }

  // Manage membership requests (simple accept/reject simulation)
  // In a real system, you'd have a request queue and approval flow

  // Guild Economy: Manage resources
  public updateGuildResources(guildId: string, resources: Record<string, number>): boolean {
    const guild = this.guilds.get(guildId);
    if (!guild) return false;
    guild.resources = { ...guild.resources, ...resources };
    this.guilds.set(guildId, guild);
    return true;
  }

  // Guild Leaderboards: Update and get leaderboard scores
  public updateLeaderboardScore(guildId: string, score: number): boolean {
    const guild = this.guilds.get(guildId);
    if (!guild) return false;
    guild.leaderboardScore = (guild.leaderboardScore || 0) + score;
    this.guilds.set(guildId, guild);
    return true;
  }

  public getGuildLeaderboard(): Guild[] {
    return Array.from(this.guilds.values()).sort(
      (a, b) => (b.leaderboardScore || 0) - (a.leaderboardScore || 0)
    );
  }

  // Get guild by ID
  public getGuild(guildId: string): Guild | undefined {
    return this.guilds.get(guildId);
  }

  // List all guilds
  public listGuilds(): Guild[] {
    return Array.from(this.guilds.values());
  }
}