# Skill 11 — Video Reference Analysis / 用 Agent 拆解参考视频

**Use when:** 有一段参考视频，希望研究它的节奏、视觉变化、声音密度与段落结构，再把这些结构迁移到自己的网页乐器。

## 原则

参考视频先被转换成**时间数据与结构判断**，再决定哪些关系值得迁移。

```text
VIDEO
↓
FRAME SAMPLES + SCENE CHANGES
↓
AUDIO TRACK + ONSETS + RMS + TEMPO
↓
TIMELINE / JSON
↓
STRUCTURAL OBSERVATIONS
↓
NEW EXPERIMENT
```

不要把“分析参考”直接变成“复制画面”。优先提取：变化速度、段落长度、密度、重复方式、音画关系与状态迁移。

## 推荐目录

```text
references/
  reference.mp4
analysis/
  video-study/
    frames/
    scene-cuts/
    contact-sheet.jpg
    audio.wav
    structure.json
    NOTES.md
```

## Prompt Seed

```text
读取 references/reference.mp4，先不要修改项目。

请建立 analysis/video-study/ 并完成：

1. 用 ffprobe 读取时长、帧率、分辨率、音频采样率；
2. 用 ffmpeg 每 2 秒提取一帧；
3. 再使用 scene-change threshold 提取明显切镜帧；
4. 生成 contact sheet；
5. 抽取 mono WAV 音轨；
6. 如果环境允许，使用 Python + librosa 分析：
   - estimated tempo
   - RMS
   - onset timestamps
   - spectral centroid
   如果不能安装 librosa，就使用 ffmpeg / ffprobe 能完成的基础统计；
7. 输出 analysis/video-study/structure.json，字段至少包括：
   - time
   - sceneChange
   - visualDensity
   - brightnessEstimate
   - audioRMS
   - onset
   - sectionGuess
8. 写 NOTES.md，只总结可以迁移的结构：
   - 节奏密度
   - 段落长度
   - 视觉变化速度
   - 重复 / 变奏方式
   - 声音与视觉是同步、错位还是共享状态
9. 最后提出 3 个适合当前网页乐器的小实验，不直接复制原视频素材。
```

## 可继续扩展

- 把 `structure.json` 直接加载进网页，让参考视频的 section timing 控制自己的 Scene；
- 根据 onset timestamps 生成可编辑 sequencer；
- 根据 RMS 生成 density curve，但不要简单做 audio-reactive；
- 将 scene cuts 转成 `OPEN / BUILD / PEAK / BREAK` 的候选段落；
- 把 contact sheet 作为视觉讨论材料，而不是最终素材。

## 验收

- 原视频与分析结果分开保存；
- 可以从 JSON 中看到明确时间轴；
- NOTES.md 描述的是结构，不是“像某某风格”；
- 最后至少形成一个新的、自主的网页实验。
