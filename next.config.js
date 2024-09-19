module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: We provide webpack for our customers to ensure it's the same webpack version used by Next.js.
      config.resolve.fallback = { crypto: false };
  
      return config;
    },
  };