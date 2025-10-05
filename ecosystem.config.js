module.exports = {
  apps: [
    {
      name: 'ttrpg-preroller',
      script: './dist/src/app.js',
      instances: 1,
      exec_mode: 'fork',
      watch: true,
      env: {
        PORT: 18890,
        NODE_ENV: 'development',
      },
    },
  ],
};
