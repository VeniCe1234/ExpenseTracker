let totalDebt = 0;
let balance = 0;

const balanceEl = document.querySelector(".balance + h2");
const transactionsEl = document.querySelector(".transactions");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const earnBtn = document.getElementById("earnBtn");
const expBtn = document.getElementById("expBtn");

let type = "credit";

earnBtn.addEventListener("click", function (e) {
    e.preventDefault();
    type = "credit";
    addTransaction();
});

expBtn.addEventListener("click", function (e) {
    e.preventDefault();
    type = "debit";
    addTransaction();
});

function addTransaction() {
    const text = textInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!text || isNaN(amount)) {
        alert("Please enter a valid description and amount.");
        return;
    }


    if (type === "credit") {
        balance += amount;
    } else {
        balance -= amount;
        totalDebt += amount;
    }
    updateBalanceDisplay();



    const transaction = document.createElement("div");
    transaction.classList.add("transaction");

    const sign = type === "credit" ? "+" : "-";
    const statusClass = type === "credit" ? "credit" : "debit";
    const statusLabel = type === "credit" ? "C" : "D";
    const amountDisplay = `${sign} ₹${Math.abs(amount)}`;

    transaction.innerHTML = `
      <div class="left">
          <p>${text}</p>
          <p>${amountDisplay}</p>
      </div>
      <div class="right">
          <div class="status ${statusClass}">${statusLabel}</div>
          <button class="debtBtn">💳</button>
          <button class="deleteBtn">🗑️</button>
      </div>
    `;


    transaction.querySelector(".deleteBtn").addEventListener("click", () => {
        transaction.remove();
        if (type === "credit") {
            balance -= amount;
        } else {
            balance += amount;
            totalDebt -= amount;
        }
        updateBalanceDisplay();
    });


    transaction.querySelector(".debtBtn").addEventListener("click", () => {
        const debtStatus = type === "credit" ? "No Debt" : "Debt Present";
        const debtText = encodeURIComponent(debtStatus);
        const amountParam = encodeURIComponent(type === "debit" ? amount : "");
        window.open(`debt.html?status=${debtText}&amount=${amountParam}`, "_blank");
    });

    transactionsEl.appendChild(transaction);


    textInput.value = "";
    amountInput.value = "";
}

function updateBalanceDisplay() {
    balanceEl.textContent = `₹${balance}`;
}
