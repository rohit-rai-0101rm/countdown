import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

const ExpenseTracker = () => {
  // State for wallet balance
  const [walletBalance, setWalletBalance] = useState(5000);

  // State for expenses
  const [expenses, setExpenses] = useState([]);

  // State for form fields
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // Function to handle form submission for adding an expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (parseFloat(amount) <= walletBalance) {
      const newExpense = {
        id: expenses.length + 1,
        title,
        amount: parseFloat(amount),
        category,
        date,
      };
      setExpenses([...expenses, newExpense]);
      setWalletBalance(walletBalance - parseFloat(amount));
      // Reset form fields
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    } else {
      alert("You cannot spend more than your available wallet balance.");
    }
  };

  // Function to handle form submission for adding income
  const handleAddIncome = (e) => {
    e.preventDefault();
    setWalletBalance(walletBalance + parseFloat(amount));
    // Reset form field
    setAmount("");
  };

  // Function to delete an expense
  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    // Adjust wallet balance accordingly
    const deletedExpense = expenses.find((expense) => expense.id === id);
    setWalletBalance(walletBalance + deletedExpense.amount);
  };

  // Function to calculate total expenses
  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Function to group expenses by category for expense trends
  const getExpenseTrendsData = () => {
    const categories = {};
    expenses.forEach((expense) => {
      if (categories[expense.category]) {
        categories[expense.category] += expense.amount;
      } else {
        categories[expense.category] = expense.amount;
      }
    });
    return Object.keys(categories).map((category) => ({
      category,
      amount: categories[category],
    }));
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <h2>Wallet Balance: ${walletBalance}</h2>
        <form onSubmit={handleAddIncome}>
          <label>
            Add Income:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
      <div>
        <h2>Add Expense</h2>
        <form onSubmit={handleAddExpense}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
      <div>
        <h2>Expense List</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.title} - ${expense.amount} ({expense.category}) -{" "}
              {expense.date}{" "}
              <button onClick={() => handleDeleteExpense(expense.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Expense Summary</h2>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="amount"
            isAnimationActive={false}
            data={expenses}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
      <div>
        <h2>Expense Trends</h2>
        <BarChart
          width={500}
          height={300}
          data={getExpenseTrendsData()}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default ExpenseTracker;
