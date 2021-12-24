const express = require("express");
// console.log('express', express)
const https = require("https");
const http = require("http");
const fs = require("fs");
const cors = require("cors");
// const fetch = require("node-fetch");
// const wsm = require('ws');
const app = express().use("*", cors());
app.use(express.json());
const SocketServer = require("ws").Server;

const PORT = 3400;
//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server });

//當 WebSocket 從外部連結時執行
wss.on("connection", (ws) => {
  console.log("Client connected");

  //固定送最新時間給 Client
  // const sendNowTime = setInterval(() => {
    // ws.send(String(new Date()));
  // }, 1000);

  //對 message 設定監聽，接收從 Client 發送的訊息
  ws.on("message", (data) => {
    console.log('data', data)

    let bufferToString = data.toString("utf8");

    console.log('bufferToString', bufferToString)
    //data 為 Client 發送的訊息，現在將訊息原封不動發送出去
    // ws.send(data);
            //取得所有連接中的 client
            let clients = wss.clients;

            //做迴圈，發送訊息至每個 client
            clients.forEach(client => {
                // client.send(String(data));
                client.send(bufferToString);
            })
  });

  ws.on("close", () => {
    //連線中斷時停止 setInterval
    // clearInterval(sendNowTime);
    console.log("Close connected");
  });
});

app.get("/fetch_preview", async (req, res) => {
  let url = req.headers.url;
  console.log("url", url);

  let result;
  urlMetadata(url, {})
    .then(async (metadata) => {
      // console.log("urlMetadata_metadata", metadata);
      res.send(metadata);
    })
    .catch((error) => {
      console.log("urlMetadata_error", error);
      res.status(503).end();
    });
});

// const nodeServer = http.createServer(app);

// nodeServer.listen(3400, () => {
//   console.log("server running at " + 3400);
// });

// app.listen(3001, () => {
//   console.log("Server Listening on port 3001");
// });

module.exports = app;
