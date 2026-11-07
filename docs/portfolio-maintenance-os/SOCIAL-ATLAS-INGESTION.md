# Social → Personal Atlas · 私人素材进入个人知识图谱的流程

Version 0.1 · 2026-11-07

## 目标与边界
- 网站是永久档案，不是朋友圈或 Instagram 的镜像，也不是自动转发器。
- **入库不等于公开。** 微信朋友圈、朋友评论、定位、未经同意的合照或私信不进入公开 Git 仓库。
- 采用现有 `database/` 与 `public/data/ewan-encyclopedia.json` 作为词条锚点，公开收藏写入 `content/collection-items.json`，避免创建第二套同名项目真相。
- 始终保存：原始发布时间 `created_at`、采集时间 `imported_at`、原始平台、原始文件/原文、稳定来源 ID、外部网址、媒体资产、关联作品 ID、隐私/版权审核结论、是否允许公开。
- 对未知日期用 null；不靠某张照片的专辑发行年份推断签名日期。

## 微信朋友圈：目前无法直接官方批量读取
个人朋友圈没有受支持的公开读档 API，也没有在当前 ChatGPT 连接中找到可读取该账号动态的插件。不要使用需要扫码托管个人微信、逆向协议、群爬取的第三方“朋友圈 API”作为基础设施。

可用的低摩擦方式：在自己的朋友圈打开值得保存的一条 → 保存原图/视频，记录原文与日期（截图可用于核对）→ 分享到自己控制的私人 Drive/本地同步收件箱。只归档**自己发布/有权处理**的资料，不自动同步朋友圈好友评论。

## Instagram：两种路径
1. Personal 个人账号：在 Meta Accounts Center 使用“下载你的信息”，取得本人历史媒体；按正式导出格式制作离线转换器，不能宣称现有官方 API 支持个人号全量读取。
2. Creator/Business 专业账号：可以采用 Instagram API with Instagram Login 并在 OAuth 授权、权限和平台审批范围内读取自身内容。需区分所有者的帖子、Story 失效、媒体链接有效期和帖子更新；只同步被授予访问权的数据。
3. 没有经过账号授权，就不能自动持续抓取 Instagram。也不抓取其他人的私密内容。

官方技术参照：https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api ；https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login

## 归档与筛选流水线
```text
微信手动转存 / Instagram 官方导出 / 相机照片 / 博客文章
  → 私人素材收件箱 (不进入 GitHub 公共提交)
  → 保留原文件 + 原文 + 时间戳 + 取证来源
  → 去重与关联候选 (作品 ID、人物、城市、日期、媒介)
  → 内容分层：正式作品 / 研究片段 / 收藏物 / 生活故事 / 仅私人备份
  → 人工确认事实、第三人隐私与使用权
  → 选中公开内容写入百科或 content/collection-items.json
  → 生成 Atlas / Cabinet / Timeline / 相关项目链接
```

## 批量筛选器（已提交）
`node scripts/triage-social-import.mjs /path/to/normalized.json`

输入示例（不是用户真实记录）：
```json
[
  {
    "source": "wechat_moments",
    "source_id": "my-manual-record-001",
    "created_at": "2025-10-01T08:00:00+08:00",
    "caption": "作品展出当晚的一段感想",
    "media_paths": ["/private/media/example.jpg"],
    "visibility": "friends",
    "contains_others": true,
    "contains_comments": false,
    "rights_confirmed": false
  }
]
```
脚本只写 `inbox/private/social-review-YYYY-MM-DD.json`（现有 .gitignore 已排除），按标题词匹配已知项目、生成 relevance score 和风险原因。**不会修改公开网页、不访问微信/Instagram、不自动发布。** 分数仅用于排序，不是判断艺术价值的结论。

## 公开内容分类
- `work` 作品：已完成且有正式呈现的艺术作品；
- `research` 研究词条：概念、失败实验、方法学，允许“ongoing”，不冒充正式成果；
- `event` 演出、展览、合作与重要时间节点；
- `artifact` 物件：签名 CD、票根、纪念品、手稿、器材；
- `fragment` 片段：某次现场、旅行、日记、朋友圈故事；不要求 CV 级别；
- `reference` 外部阅读：官方报道、访谈、主办方页面、论文/出版物。

## 当前实际落地
- `works/timeline.html`：按 2017–2026 年份组织 61 条 CV 事件（同年没有确切日期不推断排序），未来仅接入经许可的社会媒体片段；
- `works/atlas.html`：从 26 个已经公开的百科记录及 6 条现有研究主题生成 41 个独立词条页；
- `works/cabinet.html`：从已有实体照片发布第一件 @onefive《CLASSY CRUSH》签名 CD 封套；
- `content/collection-items.json`：第一件实物，关联分号 C 制作项目与对应 CV，而不冒充具体歌曲制作证据；
- 卡西瓦签名 CD 没有在仓库找到可准确确认的专属照片，所以暂不补假图；
- 私人朋友圈/Instagram 历史数据**尚未接入**。持续同步需要个人导出或者账户 OAuth 接入。

## 对阅读者的边界
访客查看公开 Atlas 时看到的是作者主动选择的生活与研究片段，不是能窥探其联系人、私密对话或朋友动态的数据镜像。公开图像如有他人肖像、未发表作品和摄影版权，应逐条审阅。


## Instagram Personal ZIP → 私人审核队列（2026-11-07 已补适配器）

个人账号在 Meta 账户中心 → 你的信息和权限 → 导出你的信息，选择 **All time / JSON / High media quality / 帖子、Reels、Stories**。这是一次性历史导出，不等于增量 API。媒体文件可能保存在压缩包中；不同年份的导出目录、字段、缺失媒体并不完全一致。

1. 在本地解压完整 ZIP（如果 Meta 分卷导出，先将各卷解压到同一个专用目录并保留原件）。不得将压缩包提交到公开 GitHub。
2. 在项目根目录运行：`node scripts/import-instagram-export.mjs "/absolute/path/to/extracted-instagram"`。
3. 工具在 gitignored 的 `inbox/private/` 创建 `instagram-normalized-YYYY-MM-DD.json`，输出已识别帖子数、媒体文件缺失数和解析警告。只扫描媒体相关 JSON，跳过私信、联系人和评论；不访问网络、不读取凭证、不自动公开。
4. 确认媒体和日期后运行：`node scripts/triage-social-import.mjs "inbox/private/instagram-normalized-YYYY-MM-DD.json"`。
5. 审核是否含第三者、人像、地理位置、受版权保护的封面、过去的非公开帖子，再选编进入 Atlas / Cabinet / Timeline。**任何媒体都不能因为导出成功而自动变成公开资产。**

局限：本适配器按 Meta 常见的 `media[].uri` / `creation_timestamp` / `title` JSON 结构识别，若你的导出格式不同，可能输出零条或遗漏数据；需按真实样例增加兼容测试。部分 Story、Reel 或删除内容不一定保留在导出中。保留原始 ZIP 用于之后复核。不得以导出文件时间代替原发布时间，无法确定时日期为 null。

平台资料参考：https://www.facebook.com/help/instagram/181231772500920/ ； https://www.facebook.com/help/230304858213063

## 完成标准与下一批

- [x] GitHub 中存在离线 Instagram 个人号 JSON 适配器
- [x] 原有去重、关联、隐私审核流程保持独立
- [ ] 对真实的本人 Instagram ZIP 进行输入测试与字段兼容校验
- [ ] 人工确认首批 30–50 条候选；验证日期、原始媒体、项目/收藏物关联
- [ ] 将被选中的记录逐条提交到公开词条数据中
- [ ] 朋友圈只做自有素材的手动归档 / 受控转存；不开启未经允许的第三人数据同步
