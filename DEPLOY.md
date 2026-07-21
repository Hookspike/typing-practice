# 部署指南

## 部署到 GitHub Pages

### 仓库信息
- 仓库地址：`https://github.com/Hookspike/typing-practice.git`
- 部署后访问：`https://hookspike.github.io/typing-practice/`

### 前置条件
1. 确保网络正常连接
2. 安装 Node.js (v16+) 和 npm
3. 安装 Git
4. GitHub 账号已配置 SSH 密钥或 HTTPS 认证

### 步骤

#### 1. 配置远程仓库（如果尚未配置）

```bash
# 添加远程仓库
git remote add origin https://github.com/Hookspike/typing-practice.git

# 或者使用 SSH
git remote add origin git@github.com:Hookspike/typing-practice.git
```

#### 2. 推送代码到 GitHub

```bash
# 推送到 master 分支
git push -u origin master
```

#### 3. 安装依赖

```bash
npm install
```

#### 4. 构建项目

```bash
npm run build
```

构建成功后会生成 `dist` 目录。

#### 5. 部署到 GitHub Pages

```bash
npm run deploy
```

此命令会自动将 `dist` 目录的内容推送到 `gh-pages` 分支。

#### 6. 配置 GitHub Pages

1. 打开 GitHub 仓库页面：`https://github.com/Hookspike/typing-practice`
2. 点击 "Settings"（设置）
3. 在左侧菜单选择 "Pages"
4. 在 "Source" 部分选择 `gh-pages` 分支，点击 "Save"

#### 7. 访问网站

部署完成后，网站将在以下地址可用：
```
https://hookspike.github.io/typing-practice/
```

### 部署脚本

也可以直接运行 PowerShell 脚本：

```powershell
.\deploy.ps1
```

### 配置说明

#### vite.config.ts

```typescript
const isGitHubPages = process.env.NODE_ENV === 'production'
const repoName = 'typing-practice'

export default defineConfig({
  base: isGitHubPages ? `/${repoName}/` : '/',
})
```

- `base` 配置确保在 GitHub Pages 子路径下正确加载静态资源
- 开发环境使用 `/`，生产环境使用 `/typing-practice/`

#### package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist"
  }
}
```

- `deploy` 脚本使用 `gh-pages` 工具部署 `dist` 目录

### 常见问题

**Q: 部署后页面空白？**
A: 检查 `vite.config.ts` 中的 `base` 配置是否正确，确保与仓库名称一致。

**Q: 静态资源加载失败（404）？**
A: 确保 `base` 配置正确，且构建时使用了 `NODE_ENV=production`。

**Q: gh-pages 部署失败？**
A: 确保 Git 已正确配置远程仓库，且拥有仓库的推送权限。

### 部署到其他平台

#### Fly.io（可选）

1. 安装 Fly CLI：
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. 登录 Fly：
   ```bash
   fly auth login
   ```

3. 创建应用：
   ```bash
   fly launch
   ```

4. 部署：
   ```bash
   fly deploy
   ```

#### Vercel（可选）

1. 安装 Vercel CLI：
   ```bash
   npm install -g vercel
   ```

2. 登录并部署：
   ```bash
   vercel
   ```