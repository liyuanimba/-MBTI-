# 下载大量萌宠风格图片，按情绪分类
$baseUrl = "https://place.dog/400/400"
$emotions = @("开心", "悲伤", "惊讶", "愤怒", "平静", "好奇", "兴奋", "思考")

# 每个情绪下载的图片数量
$imagesPerEmotion = 15
$totalImages = $emotions.Length * $imagesPerEmotion

Write-Host "🎯 开始下载 $totalImages 张萌宠图片..." -ForegroundColor Green
Write-Host ""

# 创建情绪子文件夹
foreach ($emotion in $emotions) {
    $folder = "images/$emotion"
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "📁 创建文件夹: $folder" -ForegroundColor Cyan
    }
}

$webClient = New-Object System.Net.WebClient
$downloadedCount = 0

foreach ($emotion in $emotions) {
    Write-Host ""
    Write-Host "🐾 正在下载 '$emotion' 的图片..." -ForegroundColor Yellow
    
    for ($i = 1; $i -le $imagesPerEmotion; $i++) {
        $randomSeed = (Get-Random -Minimum 1 -Maximum 1000)
        $url = "$baseUrl?seed=$randomSeed"
        $outputPath = "images/$emotion/$i.jpg"
        
        try {
            $webClient.DownloadFile($url, $outputPath)
            $downloadedCount++
            Write-Host "  ✅ $emotion/$i.jpg 下载成功" -ForegroundColor Green
        }
        catch {
            Write-Host "  ❌ $emotion/$i.jpg 下载失败，尝试备用..." -ForegroundColor Red
            # 备用方案：用placekitten
            try {
                $backupUrl = "https://placekitten.com/400/400?image=$(($randomSeed % 16) + 1)"
                $webClient.DownloadFile($backupUrl, $outputPath)
                Write-Host "  ✅ $emotion/$i.jpg 备用下载成功" -ForegroundColor DarkGreen
            }
            catch {
                Write-Host "  ❌ $emotion/$i.jpg 完全失败，跳过" -ForegroundColor DarkRed
            }
        }
    }
}

Write-Host ""
Write-Host "🎉 下载完成！共下载 $downloadedCount 张图片！" -ForegroundColor Green
Write-Host ""
Write-Host "📂 图片保存在 images/[情绪]/ 文件夹中" -ForegroundColor Cyan
