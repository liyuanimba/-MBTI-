
console.log('🎀 萌萌哒MBTI测试脚本加载成功！');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM加载完成，初始化中...');
    
    // 全局变量
    let currentStep = 1;
    let currentEmotionIndex = 0;
    let countdownTimer = null;
    let capturedPhotos = [];
    let recognitionResults = [];
    let cameraStream = null;
    let isMusicPlaying = false;
    let audioContext = null;
    let musicInterval = null;
    
    // DOM元素
    const previewCamera = document.getElementById('previewCamera');
    const captureCanvas = document.getElementById('captureCanvas');
    const startCameraBtn = document.getElementById('startCamera');
    const startTestBtn = document.getElementById('startTest');
    const emotionImage = document.getElementById('emotionImage');
    const emotionLabel = document.getElementById('emotionLabel');
    const emotionPrompt = document.getElementById('emotionPrompt');
    const countdown = document.getElementById('countdown');
    const feedbackSection = document.getElementById('feedbackSection');
    const confirmYesBtn = document.getElementById('confirmYes');
    const confirmNoBtn = document.getElementById('confirmNo');
    const capturedPreview = document.getElementById('capturedPreview');
    const capturedGallery = document.getElementById('capturedGallery');
    const resultContainer = document.getElementById('resultContainer');
    const restartTestBtn = document.getElementById('restartTest');
    const shareResultBtn = document.getElementById('shareResult');
    const currentEmotionSpan = document.getElementById('currentEmotion');
    const progressCount = document.getElementById('progressCount');
    const progressFill = document.getElementById('progressFill');
    
    console.log('📦 DOM元素获取完成');
    
    // 情绪数据
    const emotions = [
        { 
            name: '开心', 
            emoji: '😄',
            prompt: '露出你最灿烂的笑容！就像看到了可爱的小狗狗一样开心！'
        },
        { 
            name: '悲伤', 
            emoji: '😢',
            prompt: '表现出委屈的样子！就像可爱的小猫没人陪一样难过！'
        },
        { 
            name: '惊讶', 
            emoji: '😲',
            prompt: '做出超级惊讶的表情！就像发现了超萌的小兔子一样！'
        },
        { 
            name: '愤怒', 
            emoji: '😠',
            prompt: '表现出生气的样子！就像可爱的小零食被抢了一样！'
        },
        { 
            name: '平静', 
            emoji: '😌',
            prompt: '保持超级平静的表情！就像可爱的小猫在晒太阳一样！'
        },
        { 
            name: '好奇', 
            emoji: '🤔',
            prompt: '表现出超级好奇的样子！就像发现了新玩具的小猫咪一样！'
        },
        { 
            name: '兴奋', 
            emoji: '🤩',
            prompt: '露出超级兴奋的表情！就像看到了萌宠乐园一样！'
        },
        { 
            name: '思考', 
            emoji: '🧐',
            prompt: '做出认真思考的表情！就像在思考选哪个萌宠一样！'
        }
    ];
    
    const mbtiDescriptions = {
        'ENFP': { name: '快乐小精灵', description: '永远元气满满，像小精灵一样给大家带来快乐！', tags: ['元气萌', '开心果', '活力满分'], pros: ['超级可爱', '超有活力', '感染力强'], cons: ['容易分心', '情绪跳脱', '偶尔太闹腾'] }
    };
    
    // 获取图片
    function getEmotionImage(emotionName) {
        const timestamp = Date.now() + Math.floor(Math.random() * 10000);
        const services = [
            `https://placedog.net/400/400?id=${timestamp % 1000}`,
            `https://placekitten.com/400/400?image=${timestamp % 16}`,
            `https://loremflickr.com/400/400/cat,dog,puppy,kitten?random=${timestamp}`
        ];
        return services[timestamp % services.length];
    }
    
    // 更新步骤显示
    function updateSteps() {
        document.getElementById('step1').style.display = currentStep === 1 ? 'block' : 'none';
        document.getElementById('step2').style.display = currentStep === 2 ? 'block' : 'none';
        document.getElementById('step3').style.display = currentStep === 3 ? 'block' : 'none';
    }
    
    // 显示情绪
    function showEmotion() {
        if (currentEmotionIndex &gt;= emotions.length) {
            endTest();
            return;
        }
        
        const emotion = emotions[currentEmotionIndex];
        console.log('🎨 显示情绪:', emotion.name);
        
        emotionImage.src = getEmotionImage(emotion.name);
        emotionImage.onerror = function() {
            this.src = getEmotionImage(emotion.name);
        };
        
        emotionLabel.textContent = emotion.emoji + ' ' + emotion.name;
        emotionPrompt.innerHTML = '&lt;p&gt;🎀 第 ' + (currentEmotionIndex + 1) + ' 轮：' + emotion.name + '&lt;/p&gt;&lt;p&gt;' + emotion.prompt + '&lt;/p&gt;';
        currentEmotionSpan.textContent = emotion.emoji + ' ' + emotion.name;
        progressCount.textContent = (currentEmotionIndex + 1) + ' / ' + emotions.length;
        progressFill.style.width = (((currentEmotionIndex + 1) / emotions.length) * 100) + '%';
        
        feedbackSection.style.display = 'none';
        capturedPreview.innerHTML = '';
        
        setTimeout(() =&gt; {
            let remainingTime = 3;
            countdown.textContent = remainingTime;
            
            countdownTimer = setInterval(() =&gt; {
                remainingTime--;
                countdown.textContent = remainingTime;
                
                if (remainingTime === 0) {
                    clearInterval(countdownTimer);
                    captureExpression();
                }
            }, 1000);
        }, 300);
    }
    
    // 拍照
    function captureExpression() {
        const emotion = emotions[currentEmotionIndex];
        const context = captureCanvas.getContext('2d');
        
        captureCanvas.width = document.getElementById('captureCamera').videoWidth || 640;
        captureCanvas.height = document.getElementById('captureCamera').videoHeight || 480;
        
        context.drawImage(document.getElementById('captureCamera'), 0, 0);
        const photoData = captureCanvas.toDataURL('image/jpeg', 0.8);
        
        capturedPhotos.push({ photo: photoData, emotion: emotion.name });
        capturedPreview.innerHTML = '&lt;img src="' + photoData + '" alt="Captured" style="width:100%;border-radius:12px;"&gt;';
        
        recognitionResults.push({
            targetEmotion: emotion.name,
            recognizedEmotion: emotion.name,
            mbtiInfluence: { E: 5, N: 3, F: 3, P: 4 },
            confirmed: false
        });
        
        feedbackSection.style.display = 'block';
    }
    
    // 结束测试
    function endTest() {
        currentStep = 3;
        updateSteps();
        stopMusic();
        
        resultContainer.innerHTML = `
            &lt;div style="text-align:center;padding:30px;background:linear-gradient(135deg,#ffe4e1,#fffacd);border-radius:15px;"&gt;
                &lt;h2 style="color:#ff69b4;font-size:2em;"&gt;🎉 测试完成！🎉&lt;/h2&gt;
                &lt;p style="font-size:1.2em;color:#333;"&gt;恭喜你完成了所有表情挑战！&lt;/p&gt;
                &lt;p style="color:#666;"&gt;（简易版结果 - 完整人格分析需要更复杂的算法）&lt;/p&gt;
                &lt;div style="margin-top:20px;padding:20px;background:white;border-radius:10px;"&gt;
                    &lt;h3&gt;🎀 你的类型：快乐小精灵 (ENFP)&lt;/h3&gt;
                    &lt;p&gt;永远元气满满，像小精灵一样给大家带来快乐！&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        `;
        restartTestBtn.style.display = 'block';
        shareResultBtn.style.display = 'block';
    }
    
    // 音乐相关
    function playMusic() {
        isMusicPlaying = true;
        if (window.AudioContext || window.webkitAudioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            playCuteMusic();
        }
    }
    
    function stopMusic() {
        isMusicPlaying = false;
        if (musicInterval) {
            clearInterval(musicInterval);
            musicInterval = null;
        }
    }
    
    function playCuteMusic() {
        const notes = [523.25, 659.25, 783.99, 659.25, 523.25];
        let noteIndex = 0;
        
        musicInterval = setInterval(() =&gt; {
            if (!isMusicPlaying) return;
            
            try {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.type = 'sine';
                oscillator.frequency.value = notes[noteIndex % notes.length];
                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
                
                noteIndex++;
            } catch (e) {
                console.error('音乐错误:', e);
            }
        }, 300);
    }
    
    // 事件监听器
    startCameraBtn.addEventListener('click', async () =&gt; {
        console.log('🎥 点击了打开摄像头按钮');
        try {
            console.log('🔍 请求摄像头权限...');
            cameraStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }, 
                audio: false 
            });
            
            previewCamera.srcObject = cameraStream;
            document.getElementById('captureCamera').srcObject = cameraStream;
            
            startCameraBtn.style.display = 'none';
            startTestBtn.style.display = 'block';
            
            console.log('✅ 摄像头启动成功！');
        } catch (error) {
            console.error('❌ 摄像头错误:', error);
            alert('无法启动摄像头！\n错误: ' + error.message + '\n\n请确保：\n1. 使用localhost或HTTPS\n2. 允许浏览器访问摄像头');
        }
    });
    
    startTestBtn.addEventListener('click', () =&gt; {
        console.log('🎮 开始测试');
        currentStep = 2;
        currentEmotionIndex = 0;
        updateSteps();
        playMusic();
        showEmotion();
    });
    
    confirmYesBtn.addEventListener('click', () =&gt; {
        const lastResult = recognitionResults[recognitionResults.length - 1];
        if (lastResult) lastResult.confirmed = true;
        currentEmotionIndex++;
        updateGallery();
        showEmotion();
    });
    
    confirmNoBtn.addEventListener('click', () =&gt; {
        capturedPhotos.pop();
        recognitionResults.pop();
        updateGallery();
        showEmotion();
    });
    
    restartTestBtn.addEventListener('click', () =&gt; {
        currentStep = 1;
        currentEmotionIndex = 0;
        capturedPhotos = [];
        recognitionResults = [];
        updateSteps();
        capturedPreview.innerHTML = '';
        capturedGallery.innerHTML = '';
        resultContainer.innerHTML = '&lt;p class="placeholder"&gt;🧙‍♀️ AI正在疯狂计算你的人格...&lt;/p&gt;';
        restartTestBtn.style.display = 'none';
        shareResultBtn.style.display = 'none';
    });
    
    function updateGallery() {
        capturedGallery.innerHTML = capturedPhotos.map((photo, index) =&gt; {
            const emotion = emotions.find(e =&gt; e.name === photo.emotion);
            return `&lt;div style="display:inline-block;margin:5px;"&gt;&lt;img src="${photo.photo}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;"&gt;&lt;div style="font-size:12px;text-align:center;"&gt;${emotion ? emotion.emoji : ''}&lt;/div&gt;&lt;/div&gt;`;
        }).join('');
    }
    
    // 初始化
    updateSteps();
    console.log('✅ 初始化完成！');
});
