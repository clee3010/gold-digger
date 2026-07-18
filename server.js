import http from 'node:http'
import fs from 'node:fs'
import { handleGet } from "./routeHandler.js"
import { handlePost } from "./routeHandler.js"
import { serveStatic} from "./utils/serveStatic.js"


const PORT = 8000;

const __dirname = import.meta.dirname

try {
    const server = http.createServer(async (req, res) => {

        if (req.method === "GET" && req.url === "/price") {
            return handleGet(req, res);
        }

        if (req.method === "POST" && req.url === "/purchase") {
            return await handlePost(res, req);
        }

        return serveStatic(req, res, __dirname);

    });

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

} catch (e) {

}
 