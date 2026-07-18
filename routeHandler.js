import { getPrice } from './utils/getPrice.js'
import { parseJSONBody } from "./utils/parseJSONBody.js";
import fs from 'node:fs';
import { sendResponse } from './utils/sendResponse.js';

export function handleGet(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        "status": "online",
        "price": getPrice()
    }))

}

export async function handlePost(res, req) {

    console.log("inside handlePost");

    const date = new Date();
    
    const body = await parseJSONBody(req);
    
    const log = date.toISOString() + ", amount paid: £" + body.paid + ", price per Oz: £" + body.price 
    + ", gold sold: " + (body.paid / body.price) + " Oz \n";
    
    fs.appendFile('purchases.txt', log, (e) => {
        console.log(e);
    })

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: true }));
}