import http from 'node:http'
import fs from 'node:fs'
import { handleGet } from "./routeHandler.js"
import { handlePost } from "./routeHandler.js"


const PORT = 8000;

try {
    const server = http.createServer(async (req, res) => {

        console.log(req.method);

        res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS"){
            res.statusCode = 204;
            return res.end();
        }

        if (req.method === "GET") {
            return handleGet(res);

        } else if (req.method === "POST") {
            console.log("POST request received");
            return await handlePost(req);
        }

    });

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

} catch (e) {

}
