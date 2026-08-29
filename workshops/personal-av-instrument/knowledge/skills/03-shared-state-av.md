# Skill 03 — Shared-State Audio Visual

**Use when:** 视觉只是“跟着音量动”，或者声音与视觉像两个后期拼在一起的系统。

## 核心

让声音和视觉读取同一个高层状态，而不是互相驱动。

```text
STATE = {energy, tension, density, space, memory}
       ↙                               ↘
   Audio interpretation            Visual interpretation
```

## Prompt Seed

```text
不要做 audio-reactive mapping。
请建立一个 shared state object，至少包含 energy / density / space。
同一次输入只修改 shared state；Audio 与 Visual 各自读取并解释。
例如 energy 上升：
- Audio 可以增加 subdivision 或高频；
- Visual 可以增加 fragmentation 或速度；
两者不要做完全 1:1 的数值复制。
保留当前视觉风格和声音素材。
```

## 验收

- 静音后视觉仍有自身逻辑；
- 隐藏视觉后声音仍有结构；
- 两者一起出现时能感觉在解释同一状态。