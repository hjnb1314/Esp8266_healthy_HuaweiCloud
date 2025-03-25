//3.0

#include <U8g2lib.h>
#include <stdlib.h> // 引入随机数相关的头文件

// 设置u8g2对象，根据实际的OLED型号和I2C地址进行修改
U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, /* clock=*/ 14, /* data=*/ 12, /* reset=*/ U8X8_PIN_NONE); 

void setup() {
  Serial.begin(115200);

  u8g2.begin(); // 初始化OLED
  u8g2.setFont(u8g2_font_ncenB08_tr); // 设置字体
  randomSeed(millis()); // 初始化随机数种子
}

void loop() {
  u8g2.clearBuffer(); // 清空缓冲区

  // 设置较小的字体，这里假设存在合适的小字体，如u8g2_font_ncenB08_tr
  u8g2.setFont(u8g2_font_ncenB08_tr);

  // 第一行显示“HR”（心率 Heart Rate 的缩写）
  u8g2.drawStr(0, 10, "HR: ");
  // 生成随机的心率数值（范围假设为60-120），单位：bpm
  int heartRate = random(60, 121); 
  char heartRateStr[5];
  itoa(heartRate, heartRateStr, 10);
  u8g2.drawStr(40, 10, heartRateStr);
  u8g2.drawStr(70, 10, "bpm");

  // 第二行显示“SpO₂”（血氧 SpO₂ 的常见表示）
  u8g2.drawStr(0, 22, "SpO₂: ");
  // 生成随机的血氧数值（范围假设为90-100），单位：%
  int bloodOxygen = random(90, 101); 
  char bloodOxygenStr[5];
  itoa(bloodOxygen, bloodOxygenStr, 10);
  u8g2.drawStr(40, 22, bloodOxygenStr);
  u8g2.drawStr(70, 22, "%");

  // 第三行显示“Tmp”（温度 Temperature 的缩写）
  u8g2.drawStr(0, 34, "Tmp: ");
  // 生成随机的温度数值（范围假设为20-35），单位：°C
  int temperature = random(20, 36); 
  char temperatureStr[5];
  itoa(temperature, temperatureStr, 10);
  u8g2.drawStr(40, 34, temperatureStr);
  u8g2.drawStr(70, 34, "°C");

  // 第四行显示“Hmd”（湿度 Humidity 的缩写）
  u8g2.drawStr(0, 46, "Hmd: ");
  // 生成随机的湿度数值（范围假设为30-80），单位：%
  int humidity = random(30, 81); 
  char humidityStr[5];
  itoa(humidity, humidityStr, 10);
  u8g2.drawStr(40, 46, humidityStr);
  u8g2.drawStr(70, 46, "%");

  u8g2.sendBuffer(); // 将缓冲区内容发送到OLED显示

  delay(5000); // 延迟5秒，可根据需要调整刷新间隔
}