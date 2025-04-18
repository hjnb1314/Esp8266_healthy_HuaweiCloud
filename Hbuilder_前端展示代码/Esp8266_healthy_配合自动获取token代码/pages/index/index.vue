<template>
    <view class="container">
        <view class="header">
            <image class="logo" src="/static/health.png"></image>
            <text class="title">设备健康数据</text>
            <text class="connection-status">{{ connectionStatus }}</text>
        </view>
        <view class="data-container">
            <view class="data-item">
                <image class="icon" src="https://img.icons8.com/?size=96&id=78394&format=png" mode="widthFix"></image>
                <text class="label">心率:</text>
                <text class="value">{{ heart }}</text>
            </view>
            <view class="data-item">
                <image class="icon" src="https://img.icons8.com/?size=160&id=fbfmUNq5qEyS&format=png" mode="widthFix"></image>
                <text class="label">血氧:</text>
                <text class="value">{{ o2 }}</text>
            </view>
            <view class="data-item">
                <image class="icon" src="https://img.icons8.com/color/24/000000/thermometer.png" mode="widthFix"></image>
                <text class="label">温度:</text>
                <text class="value">{{ tem }}</text>
            </view>
            <view class="data-item">
                <image class="icon" src="https://img.icons8.com/color/24/000000/humidity.png" mode="widthFix"></image>
                <text class="label">湿度:</text>
                <text class="value">{{ hum }}</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            heart: '--',
            o2: '--',
            tem: '--',
            hum: '--',
            socketTask: null,
            connectionStatus: '未连接'
        };
    },
    onLoad() {
        this.connectWebSocket();
    },
    methods: {
        connectWebSocket() {
            this.socketTask = uni.connectSocket({
                url: 'wss://c1f2-219-128-230-148.ngrok-free.app',
                success: () => {
                    console.log('WebSocket 连接成功');
                    this.connectionStatus = '已连接';
                }
            });

            this.socketTask.onOpen(() => {
                console.log('WebSocket 已打开');
            });

            this.socketTask.onMessage((res) => {
                const data = JSON.parse(res.data);
                this.heart = data.heart;
                this.o2 = data.o2;
                this.tem = data.tem;
                this.hum = data.hum;
            });

            this.socketTask.onError(() => {
                console.error('WebSocket 连接失败');
                this.connectionStatus = '连接失败';
            });

            this.socketTask.onClose(() => {
                console.log('WebSocket 已关闭');
                this.connectionStatus = '已断开';
            });
        }
    },
    onUnload() {
        if (this.socketTask) {
            this.socketTask.close();
        }
    }
};
</script>

<style>
.container {
    padding: 20px;
    background-color: #e6f7ff; /* 浅蓝色背景，符合健康清新感 */
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.logo {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
}

.title {
    font-size: 28px;
    font-weight: bold;
    color: #007AFF; /* 蓝色标题，突出主题 */
}

.connection-status {
    font-size: 16px;
    color: #666;
}

.data-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.data-item {
    width: 45%;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
}

.icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}

.label {
    font-size: 18px;
    font-weight: 500;
    color: #666;
    margin-right: 5px;
}

.value {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}
</style>