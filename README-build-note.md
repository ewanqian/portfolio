# 构建与发布说明

## 项目结构

- **React 源码位置**: `react/` 子目录
- **GitHub Pages 发布位置**: 根目录（`/`）
- **构建产物来源**: `react/dist/` → 复制到根目录

## 发布流程

每次更新 React 首页后，按以下步骤发布：

```bash
cd react
npm run build
cd ..
cp react/dist/index.html .
cp -r react/dist/assets/* assets/
git add .
git commit -m "update react homepage build"
git push
```

## 重要提示

1. **不要直接修改根目录的 `index.html`**
   - 根目录的 `index.html` 是 React 构建产物
   - 所有修改应该在 `react/src/` 中进行

2. **React 源码在 `react/` 子目录**
   - 组件: `react/src/components/`
   - 数据: `react/src/data/`
   - 样式: `react/src/styles/`

3. **Vite 配置**
   - `base: '/portfolio/'` 已配置，适配 GitHub Pages

4. **本地开发**
   ```bash
   cd react
   npm run dev
   # 访问 http://localhost:5173/portfolio/
   ```

## 线上地址

- **GitHub Pages**: https://ewanqian.github.io/portfolio/

## 备份

- 原有静态首页已备份至: `archive/index-original.html`
