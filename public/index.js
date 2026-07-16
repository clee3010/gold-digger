let currentPrice;
const status = document.getElementById("connection-status");
const priceDisplay = document.getElementById("price-display");
const paid = document.getElementById("investment-amount");
const investBtn = document.getElementById("invest-btn");

status.textContent = "Live Price 🟢";

setInterval(async () => {
    try {

        const response = await fetch("http://localhost:8000")
        const data = await response.json();
        currentPrice = data.price;

        if (data.status == "online") {
            status.textContent = "Live Price 🟢";
            priceDisplay.textContent = currentPrice; 
        }
    
    } catch (e) {
        status.textContent = "Disconnected 🔴";
        priceDisplay.textContent = "----.--";
    }

}, 3000)

try {
    investBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("clicked");
        const response = await fetch ("http://localhost:8000", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                
            },
            body: JSON.stringify({paid: paid.valueAsNumber, price: currentPrice})
        })
        console.log("POST finished");
    })
} catch (e) {
    console.log("post error");
}
