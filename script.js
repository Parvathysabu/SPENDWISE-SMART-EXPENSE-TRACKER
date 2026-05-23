let expenses = [];
let editIndex = -1;

function addExpense() {
  let date = document.getElementById("date").value;
  let type = document.getElementById("type").value;
  let amount = document.getElementById("amount").value;

  if (date === "" || type === "" || amount === "") {
    alert("Fill all fields");
    return;
  }

  let day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

  let expense = {
    date: date,
    day: day,
    type: type,
    amount: Number(amount)
  };

  if (editIndex === -1) {
    expenses.push(expense);
  } else {
    expenses[editIndex] = expense;
    editIndex = -1;
    document.getElementById("submitBtn").innerText = "Add Expense";
  }

  displayExpenses();

  document.getElementById("date").value = "";
  document.getElementById("type").value = "";
  document.getElementById("amount").value = "";
}

function displayExpenses() {
  let table = document.getElementById("expenseTable");
  table.innerHTML = "";

  let daily = 0;
  let monthly = 0;

  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day = String(today.getDate()).padStart(2, '0');
  let todayStr = `${year}-${month}-${day}`;
  
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  expenses.forEach((expense, index) => {
    if (expense.date === todayStr) {
      daily += expense.amount;
    }

    let expDate = new Date(expense.date);
    if (expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear) {
      monthly += expense.amount;
    }

    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${expense.date}</td>
        <td>${expense.day}</td>
        <td>${expense.type}</td>
        <td>₹${expense.amount}</td>
        <td>
          <button class="btn-edit" onclick="editExpense(${index})">Edit</button>
          <button class="btn-delete" onclick="deleteExpense(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("dailyExpense").innerText = "₹" + daily;
  document.getElementById("monthlyExpense").innerText = "₹" + monthly;
}

function editExpense(index) {
  let expense = expenses[index];
  document.getElementById("date").value = expense.date;
  document.getElementById("type").value = expense.type;
  document.getElementById("amount").value = expense.amount;

  editIndex = index;
  document.getElementById("submitBtn").innerText = "Update Expense";
}

function deleteExpense(index) {
  if (confirm("Are you sure you want to delete this expense?")) {
    if (editIndex === index) {
      editIndex = -1;
      document.getElementById("submitBtn").innerText = "Add Expense";
      document.getElementById("date").value = "";
      document.getElementById("type").value = "";
      document.getElementById("amount").value = "";
    }
    expenses.splice(index, 1);
    displayExpenses();
  }
}