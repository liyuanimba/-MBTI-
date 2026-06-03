# GitHub 部署指南 - AI 表情识别 MBTI 测试

## 步骤 1: 创建 GitHub 仓库

1. 访问 https://github.com
2. 登录你的 GitHub 账号
3. 点击右上角的 "+" 按钮，选择 "New repository"
4. 填写仓库信息：
   - Repository name: `ai-mbti-emotion-test`
   - Description: `AI 表情识别 MBTI 测试 - 通过表情分析你的人格类型`
   - 选择 Public（公开）
   - **不要**勾选 Initialize this repository with a README
5. 点击 "Create repository"

## 步骤 2: 准备本地代码

你的项目文件已经准备好了！主要文件包括：
- `index.html` - 主要网页文件
- `script.js` - JavaScript 代码
- `style.css` - 样式文件

## 步骤 3: 上传代码到 GitHub

你有两个选择：

### 选项 A: 使用命令行（如果你已经安装 git）
```powershell
cd e:\ai活动作品
git init
git add index.html script.js style.css test.html config.js
git commit -m "AI MBTI 表情测试项目"
git branch -M main
git remote add origin https://github.com/你的用户名/ai-mbti-emotion-test.git
git push -u origin main
```

### 选项 B: 直接在 GitHub 网页上传（简单，推荐）

1. 进入你的新仓库页面
2. 点击 "uploading an existing file" 链接
3. 把以下文件拖进去：
   - `index.html`
   - `script.js`
   - `style.css`
   - `test.html`
   - `config.js`
4. 在下面填写 commit message，如 "Initial commit"
5. 点击 "Commit changes"

## 步骤 4: 启用 GitHub Pages（关键步骤）

1. 在你的仓库页面，点击 "Settings"（设置）
2. 左侧菜单中找到 "Pages"
3. 在 "Source" 部分：
   - 选择 "Deploy from a branch"
   - Branch 选择 `main`
   - Folder 选择 `/ (root)`
4. 点击 "Save"
5. 等待 1-3 分钟，页面会刷新并显示访问链接！

## 步骤 5: 获取分享链接

1. 访问你的仓库页面，确认代码已上传
2. 访问 GitHub Pages 链接，格式通常是：
   `https://你的用户名.github.io/ai-mbti-emotion-test/`

## 微信分享注意事项

1. GitHub Pages 支持 HTTPS，微信可以正常打开
2. 建议把链接复制到微信聊天中发送
3. 建议在手机浏览器中打开，因为需要摄像头权限
4. 可以生成二维码让朋友扫码访问

## 测试网址

部署成功后，测试地址会是：
`https://你的GitHub用户名.github.io/ai-mbti-emotion-test/`
