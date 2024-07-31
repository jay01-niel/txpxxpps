var buyForm = document.getElementById("buyform");



buyForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const amount = document.getElementById("amount").value;
    const buyBtn = document.getElementById("buyBtn");
    if (amount <= 0) {
      notify("Amount cannot be 0");
      return;
    }
    buyBtn.disabled = true;
    buyBtn.innerText = "Processing...";
    await buyPresale(amount);
    buyBtn.disabled = false;
    buyBtn.innerText = "Buy";
});