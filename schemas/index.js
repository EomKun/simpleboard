const mongoose = require("mongoose");

module.exports = () => {
    const connect = () => {
        // 개발시에 콘솔에 디버그 로그를 찍어주게 함
        if(process.env.NODE_ENV !== "production") {
            mongoose.set("debug", true);
        }

        mongoose.connect("mongodb://localhost:27017/nodejs", 
            { dbName: "nodejs", }, 
            (error) => {
                if(error) 
                    console.log("connection error", error);
                else
                    console.log("connection Ok");
            }
        );
    };

    connect();
    mongoose.connection.on("error", (error) => {
        console.error("몽고디비 연결 에러", error);
    });
    mongoose.connection.on("disconnected", () => {
        console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다");
        connect();
    });
    require("./user");
    require("./comment");
};