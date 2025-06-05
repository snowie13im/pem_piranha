// 🧠 Chunk-Aware ESP32/ESP8266 Mapping Sketch
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

#define CHUNK_SIZE 10

const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";

ESP8266WebServer server(80);

// Simulate current chunk position (e.g. robot is in chunk 1,1)
int chunkX = 1;
int chunkY = 1;

// Simulated scan results within this chunk (localX, localY, type)
struct Block {
  int localX;
  int localY;
  int type; // 0 = free, 1 = obstacle
};

Block scanResults[] = {
  {2, 4, 0},
  {3, 4, 0},
  {4, 4, 1},
  {5, 4, 0},
  {6, 4, 1}
};

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected!");
  Serial.println(WiFi.localIP());

  // Endpoint to serve chunked map data
  server.on("/pos", HTTP_GET, []() {
    String response = "";
    for (int i = 0; i < sizeof(scanResults)/sizeof(scanResults[0]); i++) {
      int abysx = chunkX * CHUNK_SIZE + scanResults[i].localX;
      int abysy = chunkY * CHUNK_SIZE + scanResults[i].localY;
      response += String(abysx) + "," + String(abysy) + "," + String(scanResults[i].type) + "\n";
    }
    server.send(200, "text/plain", response);
  });

  server.begin();
}

void loop() {
  server.handleClient();
}
