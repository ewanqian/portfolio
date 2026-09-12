# 项目资产归档标准

固定规则：**按项目归档，日期只标识上传批次。** 后续 agent 必须复用本标准，不再建立 September、月份英文名或临时自创目录体系。

## 目录

- 作品资产：`assets/works/<project-slug>/`
- 事件资产：`assets/events/<event-slug>/`
- 扫描资产：`assets/library/scans/factory/memory-factory/`
- 项目入口：本目录 `projects/<project-slug>.md`，持续更新。
- 批次清单：本目录 `<YYMMDD>-<NN>-<project-slug>/`。

日期是实际上传准备日期；NN 为当天两位流水号，从 01 递增，不覆盖旧批次。同一项目多次上传，资产继续进同一个项目目录，仅增加批次记录。跨项目交付允许一个批次，由项目入口分别引用。

例如：`260912-01-atmospheric-escape`、`260912-02-no-further-input-required`。本次跨项目包：`260912-01-live-performance`。上传失败重试不另开流水号。

## 文件名

`<project-slug>-<event-or-place>-<content>[-photo-<credit>]-<role>.<ext>`

role 固定：`hero`、`preview`、`thumb`、`poster`、`highlight-16x9`、`highlight-9x16`、`selected-live-16x9`、`motion`。

项目 slug 使用稳定英文小写与连字符；中文项目名称保留在项目标题与清单中。不再使用微信默认名、IMG、最终版、final2。来源清单可以保留原文件名用于追溯。不得猜测摄影署名。已有规范资产名无需为了批次日期重复改名。

事件日期是事件身份，上传日期是批次身份，两者不混用。已存在的事件 slug（例如 `reactor-2026-09-05`）保持固定，后续直接复用。

## 当前项目

- [ATMOSPHERIC ESCAPE](projects/atmospheric-escape.md)
- [无需进一步输入](projects/no-further-input-required.md)
- [REACTOR](projects/reactor.md)
- [Memory Factory](projects/memory-factory.md)

## 当前批次

[260912-01 · 现场演出资产](260912-01-live-performance/README.md)

每次交付保留统一文件：`README.md`、`HANDOFF.md`、`asset-manifest.json`、`asset-manifest.csv`、`source-manifest.json`、`validation.json`。批次文件用于内部交接，不能直接渲染到公开作品页。上传状态以实际远端确认结果为准。
