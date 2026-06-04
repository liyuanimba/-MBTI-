$baseUrl = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image"
$emotions = @("开心", "悲伤", "惊讶", "愤怒", "平静", "好奇", "兴奋", "思考")
$imageSize = "square_hd"
$outputDir = "images"

$webClient = New-Object System.Net.WebClient

foreach ($emotion in $emotions) {
    $prompt = [System.Web.HttpUtility]::UrlEncode("${emotion}表情的人物照片，高清，真实感")
    $url = "${baseUrl}?prompt=${prompt}&image_size=${imageSize}"
    $outputPath = Join-Path $outputDir "${emotion}.png"
    
    Write-Host "正在下载: ${emotion}..."
    try {
        $webClient.DownloadFile($url, $outputPath)
        Write-Host "下载成功: ${outputPath}"
    } catch {
        Write-Host "下载失败: ${_}"
    }
}

Write-Host "所有图片下载完成！"
