# 星之栞服务器部署

正式站点：<https://junjiee.online/>

## 架构

- 系统：OpenCloudOS 9.6
- Web：Nginx
- 构建：Node.js 22 + pnpm 9.14.4
- 源码目录：`/srv/hoshi-no-shiori/source`
- 发布目录：`/var/www/hoshi-no-shiori/releases/<timestamp>`
- 当前版本：`/var/www/hoshi-no-shiori/current` 符号链接
- Nginx 配置：`/etc/nginx/conf.d/hoshi-no-shiori.conf`
- HTTPS：Let's Encrypt，Certbot 自动续期

## 发布

在 Minis 中运行：

```sh
sh /var/minis/workspace/anime-blog/scripts/deploy-server.sh
```

脚本会同步源码和媒体文件，在服务器构建根路径版本，创建时间戳发布目录，原子切换 `current`，保留最近 5 个版本并完成线上检查。

## 手动回滚

```sh
ssh -i ~/.ssh/hoshi_server_ed25519 hoshi-deploy@1.14.95.171
ls -1dt /var/www/hoshi-no-shiori/releases/*
ln -sfn /var/www/hoshi-no-shiori/releases/<目标版本> /var/www/hoshi-no-shiori/current
sudo nginx -t && sudo systemctl reload nginx
```

## 域名

- `http://junjiee.online` → `https://junjiee.online`
- `http://www.junjiee.online` → `https://junjiee.online`
- `https://www.junjiee.online` → `https://junjiee.online`

GitHub Pages 不再是正式运行环境；服务器部署无需依赖 GitHub Actions。
