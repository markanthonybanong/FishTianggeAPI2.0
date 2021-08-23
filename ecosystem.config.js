module.exports = {
    apps: [{
        name: 'FISH_TIANGGE_API',
        script: 'index.js',
        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        instances: 1,
        autorestart: true,
        watch: ['src/'],
        watch_options: {
          followSymlinks: false,
        },
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'development',
          HOST: 'localhost',
          USER: 'root',
          PORT: '3000',
          PASSWORD: '',
          DATABASE: 'fish_tiangge',
        },
        env_production: { //pm2 start ecosystem.config.js --env production.
          NODE_ENV: 'production',
          HOST : 'localhost',
          USER: 'fishtdll_root',
          PORT: '3000',
          PASSWORD: '*lYhse@GW!sG',
          DATABASE: 'fishtdll_fish_tiangge',
        },
    }],
    
    deploy: {
        production: {},
        staging: {},
        development: {},
    }
};