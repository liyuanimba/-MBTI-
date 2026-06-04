
// AI图片生成配置文件 - 真实萌宠版本
const ImageConfig = {
    // 根据情绪获取高质量萌宠图片
    getImageUrl: function(emotion) {
        const timestamp = Date.now() + Math.floor(Math.random() * 10000);
        
        // 每个情绪对应的搜索关键词
        const keywords = {
            '开心': 'happy+cat+puppy',
            '悲伤': 'sad+puppy+kitten',
            '惊讶': 'surprised+cat',
            '愤怒': 'grumpy+cat',
            '平静': 'sleeping+cat+dog',
            '好奇': 'curious+cat',
            '兴奋': 'excited+dog',
            '思考': 'thoughtful+dog'
        };
        
        const keyword = keywords[emotion] || 'cute+cat+dog';
        
        // 图片服务列表 - 多个真实萌宠源
        const services = [
            // 服务1: PlaceDog - 高质量狗狗图片
            () => `https://placedog.net/400/400?id=${timestamp % 1000}`,
            // 服务2: PlaceKitten - 高质量猫猫图片
            () => `https://placekitten.com/400/400?image=${timestamp % 16}`,
            // 服务3: LoremFlickr - 综合萌宠
            () => `https://loremflickr.com/400/400/cat,dog,puppy,kitten?random=${timestamp}`,
            // 服务4: 专属情绪关键词
            () => `https://loremflickr.com/400/400/${keyword}?random=${timestamp}`,
            // 服务5: 可爱狗狗
            () => `https://loremflickr.com/400/400/puppy?random=${timestamp}`,
            // 服务6: 可爱猫猫
            () => `https://loremflickr.com/400/400/kitten?random=${timestamp}`
        ];
        
        // 根据情绪选择主服务 + 备用服务
        const emotionIndex = ['开心','悲伤','惊讶','愤怒','平静','好奇','兴奋','思考'].indexOf(emotion);
        const primaryIndex = emotionIndex % services.length;
        
        // 主服务 + 2个备用服务
        return services[primaryIndex]();
    },
    
    // 获取备用服务列表
    getBackupUrls: function(emotion) {
        const timestamp = Date.now() + Math.floor(Math.random() * 10000);
        
        return [
            `https://placedog.net/400/400?id=${timestamp % 1000}`,
            `https://placekitten.com/400/400?image=${timestamp % 16}`,
            `https://loremflickr.com/400/400/cat,dog,puppy,kitten?random=${timestamp}`
        ];
    }
};

