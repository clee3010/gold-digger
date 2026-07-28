import { getPrice } from './utils/getPrice.js'
import { parseJSONBody } from "./utils/parseJSONBody.js";
import fs from 'node:fs';
import { sendResponse } from './utils/sendResponse.js';

export function handleGet(req, res) {
    sendResponse(res, 200, 'application/json', JSON.stringify({
        "status": "online",
        "price": getPrice()
    }))

}

export async function handlePost(res, req) {
    try {
        const date = new Date();
        let body;
        
        try {
            body = await parseJSONBody(req);
        } catch (e) {
            return sendResponse(res, 400, 'text/html', 'Client error');
        }

        if (body.paid === undefined || body.price === undefined || body.paid <= 0 || body.price <= 0) {
            return sendResponse(res, 400, 'text/html', 'Client error');
        }
        
        const log = date.toISOString() + ", amount paid: £" + body.paid + ", price per Oz: £" + body.price 
        + ", gold sold: " + (body.paid / body.price) + " Oz \n";
        
        fs.appendFile('purchases.txt', log, (e) => {
            console.log(e);
        })

        sendResponse(res, 201,"application/json",  JSON.stringify({ success: true }))
    } catch (e) {
        sendResponse(res, 500, 'text/html', `<html><h1>Server Error: ${e.code}</h1></html>`)
    }
}