# MBTI/SBTI 人格测试 - 产品需求文档（V3.3 - 萌萌哒版）

## Overview
- **Summary**: 升级为萌萌哒风格的MBTI测试，修复图片同步问题，增加背景音乐，移动端适配，微信分享友好！
- **Purpose**: 让测试更有趣、更可爱，视觉和听觉都萌萌哒！手机上完美运行，微信分享给朋友！
- **Target Users**: 喜欢可爱风格、对MBTI测试感兴趣的年轻用户，手机端微信用户。

## Goals
- 修复图片与倒计时同步问题
- 让所有图片风格更萌萌哒
- 增加萌萌风格背景音乐
- 完美移动端适配
- 微信分享优化
- 保持现有沙雕风格和算法逻辑不变

## Non-Goals (Out of Scope)
- 本次不实现微信小程序（网页版可以在微信里直接打开）
- 不改变测试流程和算法
- 不增加新的测试情绪

## Background & Context
- 用户反馈图片与倒计时不同步
- 希望整体风格更可爱
- 想要背景音乐增加氛围
- 需要在微信里打开和分享

## Functional Requirements
- **FR-1**: 修复图片与倒计时同步问题
- **FR-2**: 更换为萌萌哒风格图片（使用卡通、可爱风格图片源）
- **FR-3**: 增加萌萌风格背景音乐，有播放/暂停控制
- **FR-4**: 优化界面元素，更萌萌哒（增加emoji装饰）
- **FR-5**: 完美移动端适配
- **FR-6**: 添加微信分享功能（分享卡片）

## Non-Functional Requirements
- **NFR-1**: 音乐加载要快，不影响页面性能
- **NFR-2**: 图片加载要稳定
- **NFR-3**: 保持页面响应流畅
- **NFR-4**: 手机上操作流畅

## Constraints
- **Technical**: 纯前端实现，使用免费图片和音频服务
- **Business**: 无预算，使用免费资源

## Assumptions
- 可以找到合适的萌萌哒风格图片API
- 可以找到合适的免费背景音乐

## Acceptance Criteria

### AC-1: 图片与倒计时同步
- **Given**: 用户进入某一轮测试
- **When**: 倒计时开始
- **Then**: 图片立即显示，倒计时与图片同步
- **Verification**: programmatic

### AC-2: 萌萌哒图片风格
- **Given**: 显示任何情绪图片
- **When**: 图片加载
- **Then**: 图片风格是卡通、可爱、萌萌哒的
- **Verification**: human-judgment

### AC-3: 背景音乐功能
- **Given**: 页面加载
- **When**: 用户点击播放按钮
- **Then**: 萌萌风格音乐播放，有播放/暂停控制
- **Verification**: human-judgment

### AC-4: 更萌的界面
- **Given**: 用户使用应用
- **When**: 浏览各页面
- **Then**: 有更多萌萌哒emoji装饰
- **Verification**: human-judgment

### AC-5: 移动端适配
- **Given**: 用户在手机上打开页面
- **When**: 浏览整个应用
- **Then**: 界面完美适配手机屏幕
- **Verification**: human-judgment

### AC-6: 微信分享
- **Given**: 用户在微信里打开页面
- **When**: 点击分享
- **Then**: 有漂亮的分享卡片
- **Verification**: human-judgment

## Open Questions
- [ ] 无
