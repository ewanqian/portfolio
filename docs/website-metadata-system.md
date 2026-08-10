# Website Metadata System

> Portfolio sharing, SEO, and social preview optimization

## Background

目前作品页面通过 GitHub / Cloudflare 部署后，单独分享项目链接时，微信、社交平台等抓取的信息仍可能显示网站总标题，而不是具体项目内容。

原因是页面缺少针对每个作品页面生成独立的 Open Graph metadata。

## Goal

让每一个作品页面都具备独立的分享身份：

- 项目标题
- 项目简介
- 封面图片
- 分享链接
- SEO 描述

分享效果应类似一个独立项目网站，而不是个人主页入口。

## Required Metadata

每个项目页面需要生成：

```html
<title>Project Title</title>
<meta name="description" content="Project description">
<meta property="og:title" content="Project Title">
<meta property="og:description" content="Project summary">
<meta property="og:image" content="Project cover image">
<meta property="og:url" content="Project URL">
```

## Recommended Structure

使用项目数据驱动页面：

```
content/
 └── works/
      ├── drop-flow.json
      ├── timer.json
      └── vrplay.json

assets/
 └── projects/
      ├── drop-flow-og.jpg
      ├── timer-og.jpg
      └── vrplay-og.jpg
```

每个项目包含：

- title
- description
- cover
- year
- category
- keywords
- social image

## Implementation Direction

根据当前 React / Cloudflare 部署结构，建议：

1. 页面路由读取项目 metadata
2. 动态生成 title 和 meta 标签
3. 为每个项目制作独立 OG 图片
4. 部署后清理 Cloudflare cache
5. 使用微信等平台重新检测分享信息

## Priority

### High Priority

- Selected Works 页面
- Current / WIP 项目
- 新增公开案例

### Future

- 自动生成 SEO
- 自动生成分享图片
- CMS 管理项目数据

## Purpose

Portfolio 不只是展示网页，而应该让每一个作品成为一个可被独立传播、搜索和理解的数字案例。
