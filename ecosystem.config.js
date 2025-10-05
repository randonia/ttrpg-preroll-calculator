module.exports = {
  apps: [
    {
      name: 'tablr',
      script: './dist/app.js',
      instances: 1,
      exec_mode: 'fork',
      watch: true,
      env: {
        PORT: 18889,
        NODE_ENV: 'development',
      },
    },
  ],
};
