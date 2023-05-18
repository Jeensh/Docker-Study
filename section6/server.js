const express = require("express");
const redis = require("redis");

const PORT = 8080;

const app = express();
//레디스 클라이언트 생성
const client = redis.createClient({
    socket: {
        host: "redis-server",
        port: 6379
    }
})

app.get('/', async (req, res) => {
    await client.connect();
    let number = await client.get('number');
    if(number === null) {
        number = 0;
    }

    console.log("Number: " + number);
    res.send("숫자가 1씩 올라갑니다. 숫자: " + number);
    await client.set("number", parseInt(number) + 1);
    await client.disconnect();
})



app.listen(PORT);
console.log('서버 동작중.. $(PORT) 포트')