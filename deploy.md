# Deployment Guide สำหรับ PM2

## 🚀 วิธี Deploy บน Server ที่มี PM2

### แบบที่ 1: Manual Deploy (แนะนำ)

```bash
# 1. Clone project บน server
git clone git@github.com:anutakoon/psi-tax-tools.git
cd psi-tax-tools

# 2. Install dependencies
npm install

# 3. Build production
npm run build

# 4. Start ด้วย PM2
pm2 start ecosystem.config.cjs --env production

# 5. Save PM2 config
pm2 save
pm2 startup
```

### แบบที่ 2: PM2 Deploy (Auto)

```bash
# 1. Setup บน server ครั้งแรก
pm2 deploy ecosystem.config.cjs production setup

# 2. Deploy
pm2 deploy ecosystem.config.cjs production

# 3. ครั้งต่อไป (update code)
pm2 deploy ecosystem.config.cjs production update
```

## ⚙️ การตั้งค่า

### 1. แก้ไข `ecosystem.config.cjs`
- `cwd`: path ของโปรเจกต์บน server
- `user`: username บน server  
- `host`: IP หรือ domain ของ server
- `path`: path ที่จะติดตั้งโปรเจกต์

### 2. Port Configuration
- App จะรันที่ port 3000
- ถ้าต้องการเปลี่ยน port แก้ในไฟล์ `ecosystem.config.cjs`

### 3. Nginx Configuration (ถ้าใช้)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📋 คำสั่งที่สำคัญ

```bash
# ดู process ที่รัน
pm2 list

# Restart app
pm2 restart psi-tax-tools

# ดู logs
pm2 logs psi-tax-tools

# Stop app
pm2 stop psi-tax-tools

# Delete app
pm2 delete psi-tax-tools

# Monitor
pm2 monit
```

## 🔄 Update Code

```bash
# วิธี 1: Manual
cd /path/to/psi-tax-tools
git pull origin main
npm install
npm run build
pm2 restart psi-tax-tools

# วิธี 2: Auto deploy
pm2 deploy ecosystem.config.cjs production update
```