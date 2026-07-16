import { getPrice } from './getPrice.js'
import { parseJSONBody } from "./parseJSONBody.js";
import fs from 'node:fs';

export function handleGet(res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    res.end(JSON.stringify({
        "status": "online",
        "price": getPrice()
    }))

}

export async function handlePost(req) {
    console.log("inside handlePost");
    const date = new Date();
    
    const body = await parseJSONBody(req);
    
    const log = date.toISOString() + ", amount paid: £" + body.paid + ", price per Oz: £" + body.price 
    + ", gold sold: " + (body.paid / body.price) + " Oz";
    
    fs.appendFile('purchases.txt', log, (e) => {

    })
}