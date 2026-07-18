let currentPrice;
const status = document.getElementById("connection-status");
const priceDisplay = document.getElementById("price-display");
const paid = document.getElementById("investment-amount")
const investBtn = document.getElementById("invest-btn");
const summary = document.getElementById("investment-summary");
const dialog = document.getElementById("dialog");
const closeDialogBtn = document.getElementById("close-dialog-button");

status.textContent = "Live Price 🟢";

setInterval(async () => {
    try {

        const response = await fetch("/price")
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

        console.log("Before fetch");

        try {
        const response = await fetch ("/purchase", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                
            },
            body: JSON.stringify({paid: paid.valueAsNumber, price: currentPrice})
        })

        const bought = (paid.valueAsNumber/currentPrice).toFixed(2);

        summary.textContent = "You just bought " + bought + " ounces (ozt) for £" + paid.valueAsNumber + ". \n You will receive documentation shortly."
        dialog.showModal();

        console.log("Dialog opened");
        } catch(e) {
            console.log(e);
        }
    })

    closeDialogBtn.addEventListener("click", () => {
        dialog.close();
    })

} catch (e) {
    console.log("post error");
}
