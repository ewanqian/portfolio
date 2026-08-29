# Skill 07 — Audio Voice Design

**Use when:** 网页声音太小、太薄、像默认 oscillator demo，或者一叠加就刺耳。

## 核心

优先建立统一的声音系统，而不是给每个键随机一个 synth。

建议：

- 统一 scale / pitch family；
- 不同 role 占不同频段；
- low / mid / high / fx 分工；
- envelope 有明确 attack / sustain / release；
- delay / reverb 使用 send，而不是所有声音同样湿；
- master 使用适度 saturation + compressor + limiter；
- 保留足够响度，但避免不断叠加抬升。

## Prompt Seed

```text
重新整理当前 Web Audio 的 gain staging 和音色，不改变交互结构。
目标：比默认 synth 更饱满、更有层次，同时安全。
要求：
- 固定一个兼容 scale；
- FIELD = pad / air，PULSE = kick / bass，ROUTE = pluck，ORBIT = bright resonant voice，PARTITION = chord / split，RELEASE = tail / noise；
- master 目标响度明显提高，但必须有 compressor + limiter；
- delay / reverb 改成 send；
- 不同 role 避免占满同一频段；
- 提供可调 master gain，默认比旧版高约 4–6 dB；
- 连续演奏 60 秒不得明显 clipping。
```

## 验收

单独听 Audio-only 30 秒也有层次；低频、主体与高频能分辨；总音量足够但没有持续削波。