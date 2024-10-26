function updateSavings() {
  const goal = document.getElementById("monthly-goal").value;
  const saved = document.getElementById("amount-saved").value;

  if (goal && saved) {
    const progress = ((saved / goal) * 100).toFixed(1);
    document.getElementById(
      "savings-progress"
    ).textContent = `Progress: ${progress}%`;
    alert("Savings information updated successfully!");
  } else {
    alert("Please enter values for both goal and saved amount.");
  }
}

function updateExpenses() {
  const food = Number(document.getElementById("food-expense").value);
  const clothes = Number(document.getElementById("clothes-expense").value);
  const entertainment = Number(
    document.getElementById("entertainment-expense").value
  );
  const others = Number(document.getElementById("others-expense").value);

  const totalExpenses = food + clothes + entertainment + others;
  document.getElementById(
    "total-expenses"
  ).textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
  alert("Expenses updated successfully!");
}

function updateInvestments() {
  const stockName = document.getElementById("stock-name").value;
  const investmentAmount = document.getElementById("investment-amount").value;
  const riskLevel = document.getElementById("risk-level").value;

  if (stockName && investmentAmount) {
    alert(
      `Investment in ${stockName} of $${investmentAmount} with ${riskLevel} risk updated successfully!`
    );
  } else {
    alert("Please fill out both stock name and investment amount.");
  }
}
