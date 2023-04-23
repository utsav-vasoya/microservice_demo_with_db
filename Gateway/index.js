const gateway = require("fast-gateway");

const server = gateway({
    routes: [
        {
            prefix: "/books",
            target: "http://localhost:3001",
        },
        {
            prefix: "/users",
            target: "http://localhost:3002",
            methods: ["GET", "POST"],
        },
    ],
});

server.get("/", (req, res) => {
    res.statusCode = 200;
    res.send({ message: "Api gateway called successfully." });
});

server.start(3000).then((server) => {
    console.log("Server starting at port 3000");
});
