
# 萌宠图片AI生成优化计划

## 🎯 目标
1. 使用AI API生成高质量、真实感的猫猫萌宠图片
2. 将图片展示时间从5秒调整为3秒
3. 提升整体用户体验

---

## 📁 项目现状分析
- 当前使用loremflickr随机图片，质量不稳定
- 倒计时设置为5秒，用户反馈时间过长
- 没有AI图像生成功能

---

## 🛠️ 修改内容

### 1. 创建API配置文件
- **新建文件**：`config.js`
- **功能**：管理API密钥和配置
- **内容**：API地址、默认提示词模板等

### 2. 修改 `script.js`
- **修改点**：
  a. 更新emotions数组，为每种情绪定制高质量提示词
  b. 添加AI图片生成函数（使用免费API服务）
  c. 添加加载状态提示
  d. 将倒计时从5秒改为3秒
  e. 优化图片加载体验

### 3. 更新 `index.html`
- **修改点**：添加配置文件引用
- **可选**：添加API密钥输入界面（方便用户配置）

---

## 🎨 AI图片提示词设计

### 开心情绪
- 英文提示词：`ultra realistic photo of a cute happy cat smiling, golden retriever puppy playing, soft natural lighting, professional photography, 4k, high detail, cute expression`
- 中文提示词：`超写实照片，可爱开心的微笑猫咪，金毛幼犬玩耍，柔和自然光，专业摄影，4k高清，高细节，萌系表情`

### 悲伤情绪
- 英文提示词：`ultra realistic photo of a sad cute puppy with big eyes, lonely kitten, soft lighting, professional pet photography, 4k, emotional expression`
- 中文提示词：`超写实照片，大眼睛的悲伤可爱幼犬，孤单的小猫，柔和光线，专业宠物摄影，4k高清，充满情感的表情`

### 惊讶情绪
- 英文提示词：`ultra realistic photo of a surprised cute cat with wide eyes, shocked bunny, natural light, professional photography, 4k, adorable expression`
- 中文提示词：`超写实照片，大眼睛惊讶的可爱猫咪，受惊的兔子，自然光，专业摄影，4k高清，呆萌表情`

### 愤怒情绪
- 英文提示词：`ultra realistic photo of a grumpy cute cat, mad fluffy puppy, dramatic lighting, professional pet photography, 4k, funny angry expression`
- 中文提示词：`超写实照片，暴躁的可爱猫咪，生气的毛茸茸小狗，戏剧化光线，专业宠物摄影，4k高清，搞笑愤怒表情`

### 平静情绪
- 英文提示词：`ultra realistic photo of a calm sleeping cat, relaxed dog napping, warm sunlight, professional photography, 4k, peaceful atmosphere`
- 中文提示词：`超写实照片，安静睡觉的猫咪，放松打盹的狗狗，温暖阳光，专业摄影，4k高清，宁静氛围`

### 好奇情绪
- 英文提示词：`ultra realistic photo of a curious cute cat investigating something, playful puppy exploring, soft natural light, professional pet photography, 4k`
- 中文提示词：`超写实照片，好奇探索的可爱猫咪，玩耍探索的幼犬，柔和自然光，专业宠物摄影，4k高清`

### 兴奋情绪
- 英文提示词：`ultra realistic photo of an excited happy dog jumping, playful kitten, bright joyful lighting, professional photography, 4k, energetic expression`
- 中文提示词：`超写实照片，兴奋跳跃的开心狗狗，玩耍的小猫，明亮愉悦的光线，专业摄影，4k高清，充满活力的表情`

### 思考情绪
- 英文提示词：`ultra realistic photo of a focused cute cat concentrating, thoughtful puppy, soft window light, professional pet photography, 4k, intelligent expression`
- 中文提示词：`超写实照片，专注思考的可爱猫咪，若有所思的幼犬，柔和窗边光，专业宠物摄影，4k高清，智慧表情`

---

## ⏱️ 倒计时调整
- 原时间：5秒
- 新时间：3秒
- 修改位置：`script.js` 第293行

---

## 📋 实施步骤

1. 创建 `config.js` 配置文件
2. 更新 `script.js` 中的emotions数组，添加AI图片生成逻辑
3. 修改倒计时逻辑从5秒改为3秒
4. 添加加载状态UI
5. 测试验证

---

## 💡 备注
- 为了避免CORS问题，将使用免费的图片生成服务
- 如果用户有自己的API密钥，可以方便地在配置文件中替换
- 保持现有功能完整，仅增强图片质量
