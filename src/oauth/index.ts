import { getUserUID } from './user';

export function initOAuth(config: any) {
  if (!config) {
    throw new Error('OAuth configuration is missing.');
  }

  const { clientId, redirectUri, scopes } = config;

  return {
    login: () => {
      const authUrl = `https://game.build/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes?.join(',') || 'default'}`;
      window.location.href = authUrl;
    },
    getUserUID,
  };
}
