// 配置华为云 OBS 客户端，这些信息需要你填写自己的
/*const obsClient = new ObsClient({
    access_key_id: 'GRVPAIONPRGGSAG7MX60',
    secret_access_key: 'sxhdoXtTHkLSSXlnORwzilyBrGZehrb7QjNy8JwS',
    server: 'obs.cn-north-4.myhuaweicloud.com'
});*/

/*
const endpoint = 'd82876d880.st1.iotda-app.cn-north-4.myhuaweicloud.com'; // 替换为实际的平台接入地址
const projectId = 'cd78f21bdcc148a389db46e1ca4da21e'; // 替换为实际的项目 ID
const deviceId = '67dd40765367f573f77af58b_123456789'; // 替换为实际的设备 ID
const token = 'MIIN8QYJKoZIhvcNAQcCoIIN4jCCDd4CAQExDTALBglghkgBZQMEAgEwggwDBgkqhkiG9w0BBwGgggv0BIIL8HsidG9rZW4iOnsiZXhwaXJlc19hdCI6IjIwMjUtMDMtMjRUMTE6MjY6NTIuMzU0MDAwWiIsIm1ldGhvZHMiOlsicGFzc3dvcmQiXSwiY2F0YWxvZyI6W10sImRvbWFpbiI6eyJuYW1lIjoiaGpuYjEzMTQiLCJpZCI6IjY2ZjZlMmE2ZDM4MDQ0MDJhMjk3OGQ5N2JlMzM2ZDViIn0sInJvbGVzIjpbeyJuYW1lIjoidGVfYWRtaW4iLCJpZCI6IjAifSx7Im5hbWUiOiJzZWN1X2FkbWluIiwiaWQiOiIwIn0seyJuYW1lIjoidGVfYWdlbmN5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY3Nic19yZXBfYWNjZWxlcmF0aW9uIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2Rpc2tBY2MiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9kc3NfbW9udGgiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9vYnNfZGVlcF9hcmNoaXZlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9jbi1zb3V0aC00YyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2RlY19tb250aF91c2VyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2JyX3NlbGxvdXQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3Nfb2xkX3Jlb3VyY2UiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfUm95YWx0eSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3Bhbmd1IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfd2VsaW5rYnJpZGdlX2VuZHBvaW50X2J1eSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Nicl9maWxlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZG1zLXJvY2tldG1xNS1iYXNpYyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Rtcy1rYWZrYTMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9vYnNfZGVjX21vbnRoIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfdW5pYnV5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY3Nic19yZXN0b3JlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2JyX3Ztd2FyZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2lkbWVfbWJtX2ZvdW5kYXRpb24iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3NfYzZhIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfbXVsdGlfYmluZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3Ntbl9jYWxsbm90aWZ5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9hcC1zb3V0aGVhc3QtM2QiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jc2JzX3Byb2dyZXNzYmFyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2VzX3Jlc291cmNlZ3JvdXBfdGFnIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX29mZmxpbmVfYWM3IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX3JldHlwZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2tvb21hcCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2V2c19lc3NkMiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Rtcy1hbXFwLWJhc2ljIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX3Bvb2xfY2EiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2NuLXNvdXRod2VzdC0yYiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2h3Y3BoIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX29mZmxpbmVfZGlza180IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaHdkZXYiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zbW5fd2VsaW5rcmVkIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaHZfdmVuZG9yIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9jbi1ub3J0aC00ZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfY24tbm9ydGgtNGQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3NfaGVjc194IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2JyX2ZpbGVzX2JhY2t1cCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19hYzciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lcHMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jc2JzX3Jlc3RvcmVfYWxsIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9jbi1ub3J0aC00ZiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX29wX2dhdGVkX3JvdW5kdGFibGUiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfZXh0IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfcGZzX2RlZXBfYXJjaGl2ZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfYXAtc291dGhlYXN0LTFlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9ydS1tb3Njb3ctMWIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2FwLXNvdXRoZWFzdC0xZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FwcHN0YWdlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9hcC1zb3V0aGVhc3QtMWYiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zbW5fYXBwbGljYXRpb24iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfY29sZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3Jkc19jYSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19ncHVfZzVyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfb3BfZ2F0ZWRfbWVzc2FnZW92ZXI1ZyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19yaSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfcnUtbm9ydGh3ZXN0LTJjIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaWVmX3BsYXRpbnVtIiwiaWQiOiIwIn1dLCJpc3N1ZWRfYXQiOiIyMDI1LTAzLTIzVDExOjI2OjUyLjM1NDAwMFoiLCJ1c2VyIjp7ImRvbWFpbiI6eyJuYW1lIjoiaGpuYjEzMTQiLCJpZCI6IjY2ZjZlMmE2ZDM4MDQ0MDJhMjk3OGQ5N2JlMzM2ZDViIn0sIm5hbWUiOiJoam5iIiwicGFzc3dvcmRfZXhwaXJlc19hdCI6IiIsImlkIjoiNGI4ZjczOGRmODYwNDUxMWE5ZjgxZTljNTBmN2MwOGYifX19MYIBwTCCAb0CAQEwgZcwgYkxCzAJBgNVBAYTAkNOMRIwEAYDVQQIDAlHdWFuZ0RvbmcxETAPBgNVBAcMCFNoZW5aaGVuMS4wLAYDVQQKDCVIdWF3ZWkgU29mdHdhcmUgVGVjaG5vbG9naWVzIENvLiwgTHRkMQ4wDAYDVQQLDAVDbG91ZDETMBEGA1UEAwwKY2EuaWFtLnBraQIJANyzK10QYWoQMAsGCWCGSAFlAwQCATANBgkqhkiG9w0BAQEFAASCAQA+6fw5mKxC71XDQTVB2C241AGZldr9xo1lnxvRHwfm7gw8+e8Pby4wYbdXPVF+4gPyGYt7NKBke-1YsBmbiPXjVHt5pa54kttgazz-cA9oqk8wv2F4mxm0GLBn-qPBO8Vc+Wv1eJgaMtZ3kq+YPl73gKeVDnlr3b8gkFYn-C896eSm+HgXY7Xv1e3xhSHVAMtK3YRiFayr5TUCX+ARR6yDTxoYYrFIoL57BzpwS2MP0rcIg15xsKCuQ5J+VD7e7fi68yND94-9OjCufYBTaYYlzB1SX9gee0TrqCLlsW2c3dLgaVQChBOfcNKPLrfJmpLm9ZWzxNW4Wwhg0w9X9cEc'; // 替换为实际的用户 Token
*/
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
    hostname: 'd82876d880.st1.iotda-app.cn-north-4.myhuaweicloud.com',
    path: `/v5/iot/cd78f21bdcc148a389db46e1ca4da21e/devices/67dd40765367f573f77af58b_123456789/shadow`,
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
                        "name": "hjnb", // 替换为你的用户名
                        "password": "H123456789j@", // 替换为你的密码
                        "domain": {
                            "name": "hjnb1314" // 替换为你的域名
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
    
    





/*
const WebSocket = require('ws');
const express = require('express');
const https = require('https');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 3000;
let latestData = null;

function fetchData() {
    const options = {
        hostname: 'd82876d880.st1.iotda-app.cn-north-4.myhuaweicloud.com',
        path: `/v5/iot/cd78f21bdcc148a389db46e1ca4da21e/devices/设备ID填写处/shadow`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': ''  // 替换为你的实际 Token
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

    req.on('error', (error) => { console.error('请求错误:', error); });
    req.end();
}

setInterval(fetchData, 5000);
fetchData();

server.listen(port, () => {
    console.log(`服务器运行在端口 ${port}`);
});
*/