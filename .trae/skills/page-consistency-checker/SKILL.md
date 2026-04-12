---
name: "page-consistency-checker"
description: "Checks portfolio pages for consistency in structure, branding, links, and content. Invoke when updating multiple pages or ensuring uniform design across the site."
---

# Page Consistency Checker

这个技能用于检查 Portfolio 网站中各个页面的一致性，确保所有页面遵循统一的结构、品牌和链接规范。

## 检查项目

### 1. 品牌一致性
- 检查页面标题格式是否统一（如 "Ewan Qian / Kashiwa"）
- 检查 header 中的 branding 文字是否一致
- 检查 footer 版权信息格式

### 2. 链接结构
- 返回首页链接是否统一使用 `../index.html#works`
- GitHub 文档链接是否指向正确的仓库路径
- 外部链接（如 MANA、微信文章）是否使用统一命名

### 3. 视觉组件
- 检查是否使用统一的 CSS 类名（如 `.gallery`, `.work-item`, `.work-grid`）
- 检查响应式断点是否一致（`@media (max-width: 760px)`）
- 检查主题切换功能是否在所有页面中正确实现

### 4. 内容结构
- 检查页面是否遵循：header → main → sections → footer 的结构
- 检查 collapsible sections（可展开内容）的 JavaScript 事件绑定是否正确
- 检查 iframe 嵌入是否使用统一的容器和样式

### 5. 外部平台引用
- MANA 平台链接统一使用 "MANA"（不是 "ManaMana"）
- 所有外部链接应添加 `target="_blank" rel="noreferrer"`
- 微信文章、GitHub 等链接应使用 descriptive text

## 使用方法

当需要：
1. 添加新作品页面时
2. 更新多个页面的共同元素时
3. 检查网站整体一致性时
4. 修复跨页面的样式或功能问题时

使用此技能检查所有 `.html` 文件，确保遵循上述规范。

## 常见问题

- **JavaScript 解析错误**：检查箭头函数是否使用了正确的 `=>` 而不是 HTML 实体 `=&gt;`
- **CSS 重复定义**：确保样式在 `<style>` 标签中只定义一次
- **响应式失效**：检查 `@media` 查询是否包含所有必要的类名
- **自动播放问题**：Bilibili iframe 不应添加 `autoplay=1` 参数，除非明确要求

## 输出格式

检查后应提供：
1. ✅ 符合规范的项目列表
2. ❌ 需要修复的问题列表
3. 🔧 具体的修复建议
4. 📝 需要统一的内容建议
