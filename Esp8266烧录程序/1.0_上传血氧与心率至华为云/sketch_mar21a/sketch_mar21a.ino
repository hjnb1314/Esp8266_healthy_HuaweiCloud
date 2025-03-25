//1.0

#include <Wire.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"

// 全局变量
float temperature;
float humidity;
int32_t o2;
int8_t validO2;
int32_t heart;
int8_t validHeart;

// WiFi设置
const char* ssid = "Man";
const char* password = "hjnb1314";

// 接收到命令后上发的响应topic
const char* Iot_link_MQTT_Topic_Report = "$oc/devices/64681485a1e0862b43d12061_1405242004/sys/properties/report";
char* topic_Commands_Response = "$oc/devices/64681485a1e0862b43d12061_1405242004/sys/commands/response/request_id=";

// 华为云接入地址
const char* mqttServer = "d82876d880.st1.iotda-device.cn-north-4.myhuaweicloud.com";
// 接入端口
const int mqttPort = 8883;

// MQTT连接参数
const char* clientId = "67dd40765367f573f77af58b_123456789_0_0_2025032114";
const char* mqttUser = "67dd40765367f573f77af58b_123456789";
const char* mqttPassword = "f20697087821045ac819efe6f3b61dc25caf493947cebe23c686f7873ad7f40a";

// 定义一个安全的WiFi客户端用于MQTTS连接
WiFiClientSecure espClient;
// 定义MQTT客户端
PubSubClient client(espClient);

MAX30105 particleSensor;

#define BUFFER_SIZE 50

uint32_t irBuffer[BUFFER_SIZE];
uint32_t redBuffer[BUFFER_SIZE];

void setup() {
    Serial.begin(115200);
    // 连接WiFi网络
    WiFi.begin(ssid, password);
    Serial.print("Connecting to ");
    Serial.print(ssid);
    Serial.println(" ...");

    int i = 0;
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(i++);
        Serial.print(' ');
    }

    Serial.println("");
    Serial.println("Connection established!");
    Serial.print("IP address:    ");
    Serial.println(WiFi.localIP());

    espClient.setInsecure(); // 忽略SSL证书验证，实际使用建议配置正确证书
    client.setServer(mqttServer, mqttPort);

    if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
        Serial.println("传感器未找到");
        while (1);
    }

    byte ledBrightness = 0x1F;
    byte sampleAverage = 4;
    byte ledMode = 2;
    byte sampleRate = 200;
    int pulseWidth = 411;
    int adcRange = 4096;

    particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange);
    particleSensor.setPulseAmplitudeRed(0x1F);
    particleSensor.setPulseAmplitudeIR(0x1F);
}

void MQTT_Init() {
    // MQTT服务器连接部分
    client.setServer(mqttServer, mqttPort);
    client.setKeepAlive(120);
    while (!client.connected()) {
        Serial.println("Connecting to MQTT...");
        if (client.connect(clientId, mqttUser, mqttPassword)) {
            Serial.println("connected");
        } else {
            Serial.print("failed with state ");
            Serial.print(client.state());
            delay(1000);
        }
    }
}

void MQTT_POST() {
    char jsonBuf[128];
    // 修改服务ID和属性名
    sprintf(jsonBuf, "{\"services\":[{\"service_id\":\"01\",\"properties\":{\"heart\":%d,\"o2\":%d}}]}", heart, o2);
    client.publish(Iot_link_MQTT_Topic_Report, jsonBuf);

    Serial.println(Iot_link_MQTT_Topic_Report);
    Serial.println(jsonBuf);
    Serial.println("Publish OK!");
}

void loop() {
    for (byte i = 0; i < BUFFER_SIZE; i++) {
        while (particleSensor.available() == false)
            particleSensor.check();

        redBuffer[i] = particleSensor.getRed();
        irBuffer[i] = particleSensor.getIR();
        particleSensor.nextSample();
    }

    maxim_heart_rate_and_oxygen_saturation(irBuffer, BUFFER_SIZE, redBuffer, &o2, &validO2, &heart, &validHeart);

    if (irBuffer[0] > 20000 && validO2 && validHeart && heart > 30 && heart < 250 && o2 > 50) {
        Serial.print("心率:");
        Serial.print(heart);
        Serial.print(",血氧:");
        Serial.println(o2);

        if (!client.connected()) {
            MQTT_Init();
        }
        MQTT_POST();
    }

    delay(2000); // 每隔2秒上传一次数据
}    