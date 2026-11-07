# Personal Atlas v1 · 网站可访问版本与修复交接

日期：2026-11-07（Asia/Shanghai）
仓库：`ewanqian/portfolio` / main
范围：仅修复已存在的 Atlas / Cabinet / Timeline / 主页入口与发布校验。没有接入朋友圈或 Instagram，且没有将私人导出上传公开仓库。

## 本轮交付

- 现有 **41 个 Personal Atlas 词条**保持原 ID 与原 URL；修复搜索筛选的 `[hidden]` CSS、补足来自原始记录的日期/地点/作者/角色字段，补充双向（既有显式关系的反向）连接，移除空白占位段落与开发口吻。
- `Cabinet` 第一件藏品沿用原仓库照片：@onefive《CLASSY CRUSH》签名封套。删除虚假的「下一件」占位；`Archive.jsx` 的 ChocoLove / Underground / Overground 三条旧记录移除误用的 CD 实物图。制作署名和收藏事实保持区分。
- `Timeline` 仍来自 **61 条 CV 数据**，保留独立详情与年份分组，移除尚未导入素材的发布预告；发布脚本显式跟踪生成的 `works/timeline.html`。
- React 主导航、主页介绍区、归档页和页脚接入 Atlas；主页同时提供 Cabinet 与 Timeline 入口。
- 新增 `scripts/audit-personal-atlas.mjs` 本地一致性测试，并接入 GitHub Actions 与发布构建步骤；`scripts/audit-portfolio-live.mjs` 正式域名扫描增加 41 个 Atlas 详情、三大入口及第一件藏品的图片 MIME 验证。

## 已实际验收

- 2026-11-07 GitHub Actions [publisher](https://github.com/ewanqian/portfolio/actions/runs/42387899585)：**success**，含 Atlas 生成和审核。
- [Portfolio OS graph health](https://github.com/ewanqian/portfolio/actions/runs/42387899559)：**success**。
- [Portfolio build and archive smoke test](https://github.com/ewanqian/portfolio/actions/runs/42388031412)：**success**。
- [GitHub Pages deployment](https://github.com/ewanqian/portfolio/actions/runs/42388030714)：**success**。
- [正式站点 HTTP 内容与哈希验收](https://github.com/ewanqian/portfolio/actions/runs/42388082724)：**205/205 pass，0 HTTP 失败，0 内容错位，0 网络未核验**；其中 41 条 Atlas 详情独立检查；另含 Cabinet、Timeline、签名封套图片。
- 本轮源码修复基线：`28707075ac6366347b90efd486228f47f34a6c79`；最终源脚本新增线上审计提交：`361b0ca5fd7ce3dfd90f732a8d60634177b61dc2`；静态发布内容由 GitHub Actions 生成。

## 验收边界 / 未做

- HTTP/内容验收不等于完整桌面与手机截图视觉检查。移动端排版、导航操作、辅助技术和现场视频播放没有在本轮全部手动确认。
- 版权/摄影署名仍需针对每张图正式核对；现有 CD 照片的存在不证明作者参与具体单曲 MV 设计。
- 没有任何微信/Instagram 私人素材进入公开站点。后续导入必须另行开始，并遵守私人收件箱与人工选编。
- 研究词条继续基于既有来源，未批量捏造个人故事或将 61 条 CV 拆成新的荣誉。未完成内容留给后续补实物和一手资料。

## 后续唯一现场质量门槛

PORT-01 后续仅做 **390px 手机和桌面端六类页面视觉/可用性抽查**（首选 Atlas、Cabinet、Timeline，结合已有 CV/作品），以及真实视频入口点击验证。不要为了达到数量目标重复建数据库或生成无出处词条。
