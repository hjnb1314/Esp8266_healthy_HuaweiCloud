<template>
    <view class="container">
        <view class="header">
            <image class="logo" src="https://img.icons8.com/color/48/000000/healthy.png" mode="aspectFit"></image>
            <text class="title">设备健康数据</text>
        </view>
        <view class="data-container">
            <view class="data-item">
                <image :class="['icon', {'icon-hidden':!isIconVisible}]" src="https://img.icons8.com/?size=96&id=78394&format=png" mode="widthFix" @error="handleIconError" lazy-load="false"></image>
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
import io from'socket.io-client';

export default {
    data() {
        return {
            heart: null,
            o2: null,
            tem: null,
            hum: null,
            socket: null,
            connectionStatus: '未连接',
            isIconVisible: true
        };
    },
    onLoad() {
        // 延迟加载图标图片
        setTimeout(() => {
            this.connectToServer();
        }, 1000);
    },
    methods: {
        connectToServer() {
            this.socket = io('http://localhost:3000');
            this.socket.on('connect', () => {
                this.connectionStatus = '已连接';
                console.log('成功连接到服务器');
                this.socket.on('deviceData', (data) => {
                    this.heart = data.heart;
                    this.o2 = data.o2;
                    this.tem = data.tem;
                    this.hum = data.hum;
                    console.log('接收到设备数据:', data);
                });
            });
            this.socket.on('connect_error', (error) => {
                this.connectionStatus = '连接失败';
                console.error('连接服务器失败:', error);
            });
            this.socket.on('disconnect', () => {
                this.connectionStatus = '已断开';
                console.log('与服务器断开连接');
            });
        },
        handleIconError() {
            console.error('心率图标加载失败');
            this.isIconVisible = false;
        }
    },
    onUnload() {
        if (this.socket) {
            this.socket.disconnect();
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

.icon-hidden {
    display: none;
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