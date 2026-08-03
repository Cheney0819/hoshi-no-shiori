# 星之栞 · Hoshi no Shiori

一个记录动画感想、技术探索与生活碎片的年轻化二次元个人空间。

本项目使用 [Firefly](https://github.com/CuteLeaf/Firefly) 作为正式主题底座，Firefly 基于 [Fuwari](https://github.com/saicaca/fuwari) 开发。通用博客能力跟随上游维护，本仓库只维护品牌、内容、配置和必要删减。

## 当前定制

- 品牌：星之栞
- 作者：Aster
- 语言：简体中文
- 风格：暮光紫、动漫动态横幅、双侧栏卡片布局
- 内容：动画随笔、技术笔记、生活记录
- 搜索：Pagefind
- 评论：暂未启用
- 背景：桌面端双 MP4 轮播，手机端双高清动画 WebP 轮播
- 音乐：本地背景音乐播放器，支持自动播放尝试、暂停、音量和单曲循环
- 已关闭：看板娘、动态、友链、留言、打赏、相册、番组页面

## 开发

需要 Node.js 22+ 和 pnpm 9+。

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
```

## 内容创作

```bash
pnpm new-post "文章标题"
```

新文章默认以草稿状态创建。分类、标签、Slug 和发布检查请参考：

- [内容规范](docs/CONTENT_GUIDE.md)
- [文章模板](docs/POST_TEMPLATE.md)

## 主要配置

- `src/config/siteConfig.ts`：站点名称、域名、主题和页面开关
- `src/config/profileConfig.ts`：头像、昵称和社交链接
- `src/config/backgroundWallpaper.ts`：横幅背景和欢迎语
- `src/config/navBarConfig.ts`：导航菜单
- `src/config/sidebarConfig.ts`：左右侧栏
- `src/config/commentConfig.ts`：评论系统
- `src/content/posts/`：文章
- `src/content/spec/about.md`：关于页面

## 正式上线前

- 完成功能与内容后，将站点部署到自己的服务器并替换正式域名
- 确认横幅、头像和文章封面的图片授权
- 如需评论，配置自己的 Giscus 仓库参数
- 如需番组页面，填写自己的 Bangumi/Bilibili 数据

## 上游

完整的 Firefly 使用文档保存在 [UPSTREAM_README.md](UPSTREAM_README.md)。

## License

主题代码遵循 Firefly 的 MIT License；文章内容默认使用 CC BY-NC-SA 4.0。第三方图片按各自来源许可执行。
