//4.0
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"
#include "DHT.h"
#include <U8g2lib.h>

// 定义DHT11相关参数
#define D3 0
#define DHTPIN D3     // 选择一个未使用的引脚连接DHT11，这里用D3
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

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
const char* Iot_link_MQTT_Topic_Report = "$oc/devices/67dd40765367f573f77af58b_123456789/sys/properties/report";
const char* topic_Commands_Response = "$oc/devices/67dd40765367f573f77af58b_123456789/sys/commands/response/request_id=";

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

// 手动定义 I2C_SPEED_FAST，如果库中没有定义
#ifndef I2C_SPEED_FAST
#define I2C_SPEED_FAST 400000
#endif

MAX30105 particleSensor;

// 避免 BUFFER_SIZE 重复定义，修改为 MY_BUFFER_SIZE
#define MY_BUFFER_SIZE 50

uint32_t irBuffer[MY_BUFFER_SIZE];
uint32_t redBuffer[MY_BUFFER_SIZE];

// 设置u8g2对象，根据实际的OLED型号和I2C地址进行修改
U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, /* clock=*/ 14, /* data=*/ 12, /* reset=*/ U8X8_PIN_NONE); 

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

    // 初始化DHT11传感器
    dht.begin();

    // 初始化OLED
    u8g2.begin(); 
    u8g2.setFont(u8g2_font_ncenB08_tr); 
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
    char jsonBuf[256]; // 增大缓冲区大小以容纳新属性
    // 修改服务ID和属性名，添加温度和湿度属性
    sprintf(jsonBuf, "{\"services\":[{\"service_id\":\"01\",\"properties\":{\"heart\":%d,\"o2\":%d,\"tem\":%.2f,\"hum\":%.2f}}]}", heart, o2, temperature, humidity);
    client.publish(Iot_link_MQTT_Topic_Report, jsonBuf);

    Serial.println(Iot_link_MQTT_Topic_Report);
    Serial.println(jsonBuf);
    Serial.println("Publish OK!");
}

void displayDataOnOLED() {
    u8g2.clearBuffer(); 

    // 设置较小的字体，这里假设存在合适的小字体，如u8g2_font_ncenB08_tr
    u8g2.setFont(u8g2_font_ncenB08_tr);

    // 第一行显示“HR”（心率 Heart Rate 的缩写）
    u8g2.drawStr(0, 10, "HR: ");
    char heartRateStr[5];
    itoa(heart, heartRateStr, 10);
    u8g2.drawStr(40, 10, heartRateStr);
    u8g2.drawStr(70, 10, "bpm");

    // 第二行显示“SpO₂”（血氧 SpO₂ 的常见表示）
    u8g2.drawStr(0, 22, "SpO₂: ");
    char bloodOxygenStr[5];
    itoa(o2, bloodOxygenStr, 10);
    u8g2.drawStr(40, 22, bloodOxygenStr);
    u8g2.drawStr(70, 22, "%");

    // 第三行显示“Tmp”（温度 Temperature 的缩写）
    u8g2.drawStr(0, 34, "Tmp: ");
    char temperatureStr[5];
    dtostrf(temperature, 4, 1, temperatureStr);
    u8g2.drawStr(40, 34, temperatureStr);
    u8g2.drawStr(70, 34, "°C");

    // 第四行显示“Hmd”（湿度 Humidity 的缩写）
    u8g2.drawStr(0, 46, "Hmd: ");
    char humidityStr[5];
    dtostrf(humidity, 4, 1, humidityStr);
    u8g2.drawStr(40, 46, humidityStr);
    u8g2.drawStr(70, 46, "%");

    u8g2.sendBuffer(); 
}

void loop() {
    for (byte i = 0; i < MY_BUFFER_SIZE; i++) {
        while (particleSensor.available() == false)
            particleSensor.check();

        redBuffer[i] = particleSensor.getRed();
        irBuffer[i] = particleSensor.getIR();
        particleSensor.nextSample();
    }

    maxim_heart_rate_and_oxygen_saturation(irBuffer, MY_BUFFER_SIZE, redBuffer, &o2, &validO2, &heart, &validHeart);

    // 读取DHT11数据
    temperature = dht.readTemperature();
    humidity = dht.readHumidity();

    // 使用 isnan 检查读取结果是否有效
    if (irBuffer[0] > 20000 && validO2 && validHeart && heart > 30 && heart < 250 && o2 > 50 && 
        !isnan(temperature) && !isnan(humidity)) {
        Serial.print("心率:");
        Serial.print(heart);
        Serial.print(",血氧:");
        Serial.print(o2);
        Serial.print(",温度:");
        Serial.print(temperature);
        Serial.print(",湿度:");
        Serial.println(humidity);

        if (!client.connected()) {
            MQTT_Init();
        }
        MQTT_POST();

        // 显示数据到OLED
        displayDataOnOLED();
    }

    delay(2000); // 每隔2秒上传一次数据
}    