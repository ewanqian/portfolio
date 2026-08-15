# Capture Method — 360° → Metashape / COLMAP → Gaussian

这是一份基于现有空间扫描实践整理的工作流记录，主要对应郑州二砂及后续 360° 场景采集。

## Pipeline

```text
360° Camera / Drone / Video
→ 2:1 Equirectangular Panorama
→ Frame Extraction
→ Metashape / COLMAP
→ Camera Poses + Sparse Point Cloud
→ Gaussian Splatting
→ SuperSplat
```

## 01. Capture

可使用 360° 相机、无人机全景或连续视频。设备型号不是前提，重点是覆盖完整、移动稳定、场景具有足够纹理。

## 02. Equirectangular

鱼眼或多镜头素材先合成为 2:1 等距柱状全景，再进入抽帧与重建。

## 03. Frame Sampling

视频通常从 **1 fps** 开始测试。

- 1 fps：多数缓慢移动场景的起点
- 3 fps：移动较快或细节较多时增加覆盖
- 5 fps：目前实践中常用的上限附近

继续提高采样密度往往会显著增加重复图像和计算量，但不一定带来相同比例的重建改善。

## 04. Reconstruction

### Metashape

当前 360° 工作流里使用最直接的一条路线：完成图像对齐、相机位姿和稀疏点云，再把这些已经求解的信息交给后续 Gaussian 流程。

### COLMAP

用于标准多视图图像的特征匹配、相机求解与稀疏重建，也是可替换的重建路径。

两者在这里承担的核心任务相同：**不要让 Gaussian 阶段重新猜一遍已经可以提前求解的相机关系。**

## 05. Gaussian / SuperSplat

Gaussian 阶段读取已经对齐的图像、相机参数和稀疏点云。完成训练或转换后，使用 SuperSplat 做查看、裁切、轻量编辑与分享。

## 二砂 / Zhengzhou Ersha

二砂扫描前期曾尝试把一张全景图拆成多个透视面，再把这些图片重新对齐。实际处理中，这会把大量时间重新花在特征匹配、相机关系和重复图像上。

后来流程收缩为：保留 360° 素材的连续关系，输出 equirectangular 影像，按需要抽帧，在 Metashape 或 COLMAP 中先完成相机求解与稀疏点云，再进入 Gaussian。

这也是目前继续整理其他城市、花园、温室与公共空间扫描时使用的基础方法。

## Current Scene Archive

当前网页中已有可访问 SuperSplat 记录的场景：

- TIMER / Gaussian Spatial Translation
- Drop Flow Collection / Rooooooom719
- Shinjuku Gyoen Greenhouse
- Garden 2 / Tokyo Tower Area
- Shibuya Sakura Stage

二砂目前作为采集方法与过程记录保留；在没有对应 SuperSplat 场景链接前，不作为已发布场景列入场景库。

## Credits / Use

Scene previews and images retain their original project credits and ownership. Materials shown here are used for portfolio documentation, workflow explanation, and non-exclusive sharing unless otherwise stated in the original project record.
