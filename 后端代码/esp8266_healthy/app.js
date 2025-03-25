const WebSocket = require('ws');
const express = require('express');
const https = require('https');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 3000;
let latestData = null;
let token = null;

// 替换为你的实际华为云账号信息
const authOptions = {
    hostname: 'iam.cn-north-4.myhuaweicloud.com',
    path: '/v3/auth/tokens',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const deviceOptions = {
    hostname: '设备示例http接入网址',
    path: `/v5/iot/填写项目id/devices/填写设备id/shadow`,
    method: 'GET'
};

function getToken() {
    // 请根据实际情况修改请求体中的内容
    const authData = JSON.stringify({
        "auth": {
            "identity": {
                "methods": ["password"],
                "password": {
                    "user": {
                        "name": "", // 替换为你的IMA用户名
                        "password": "", // 替换为你的IMA密码
                        "domain": {
                            "name": "" // 替换为你的用户名
                        }
                    }
                }
            },
            "scope": {
                "project": {
                    "name": "cn-north-4"
                }
            }
        }
    });

    const req = https.request(authOptions, (res) => {
        token = res.headers['x-subject-token'];
        console.log('获取到 Token:', token);
    });

    req.on('error', (error) => {
        console.error('获取 Token 时出错:', error);
    });

    req.write(authData);
    req.end();
}

function fetchData() {
    if (!token) {
        console.log('Token 未获取到，重新获取...');
        getToken();
        return;
    }

    const options = {
        ...deviceOptions,
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        }
    };

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            try {
                const responseData = JSON.parse(data);
                if (responseData?.shadow) {
                    const service = responseData.shadow.find(s => s.service_id === '01');
                    if (service?.reported?.properties) {
                        latestData = service.reported.properties;
                        console.log(`心率: ${latestData.heart}, 血氧: ${latestData.o2}, 温度: ${latestData.tem}, 湿度: ${latestData.hum}`);

                        // 通过 WebSocket 发送数据给前端
                        wss.clients.forEach(client => {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify(latestData));
                            }
                        });
                    }
                }
            } catch (error) {
                console.error('解析错误:', error);
            }
        });
    });

    req.on('error', (error) => {
        console.error('请求错误:', error);
        // Token 可能过期，重新获取
        getToken();
    });
    req.end();
}

// 每 23 小时获取一次新的 Token
setInterval(getToken, 23 * 60 * 60 * 1000);
// 每 4 秒读取一次设备信息
setInterval(fetchData, 4000);

// 初始获取 Token
getToken();

server.listen(port, () => {
    console.log(`服务器运行在端口 ${port}`);
});