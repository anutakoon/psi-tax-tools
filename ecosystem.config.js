module.exports = {
  apps: [
    {
      name: 'psi-tax-tools',
      script: 'npm',
      args: 'start',
      cwd: '/path/to/your/psi-tax-tools', // เปลี่ยนเป็น path จริงบน server
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ],

  deploy: {
    production: {
      user: 'your-username', // เปลี่ยนเป็น username บน server
      host: 'your-server-ip', // เปลี่ยนเป็น IP หรือ domain
      ref: 'origin/main',
      repo: 'git@github.com:anutakoon/psi-tax-tools.git',
      path: '/var/www/psi-tax-tools', // เปลี่ยนเป็น path ที่ต้องการ
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};