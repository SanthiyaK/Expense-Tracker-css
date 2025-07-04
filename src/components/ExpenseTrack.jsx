import { useEffect, useState } from "react";
import { v4 as uid } from "uuid";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import './Stylecss.css';
import axios from "axios";

export default function ExpenseTrack() {
  const [expenses, setExpenses] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    axios.get("https://backend-crud-e1um.onrender.com/api/expenses")
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addExpense = (title, amount, id = null) => {
    if (id) {
      axios.put(`https://backend-crud-e1um.onrender.com/api/expenses/${id}`, { title, amount: Number(amount) })
        .then((res) => {
          const updatedList = expenses.map((exp) =>
            exp._id === id ? res.data : exp
          );
          setExpenses(updatedList);
          setItemToEdit(null);
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      axios.post("https://backend-crud-e1um.onrender.com/api/expenses", { title, amount: Number(amount) })
        .then((res) => setExpenses([...expenses, res.data]))
        .catch((err) => console.error("Add error:", err));
    }
  };

  const deleteExpense = (id) => {
    axios.delete(`https://backend-crud-e1um.onrender.com/api/expenses/${id}`)
      .then(() => setExpenses(expenses.filter((exp) => exp._id !== id)))
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div className="expense-container">
      <h1>Expense Tracker</h1>
      <ExpenseForm
        addExpense={addExpense}
        itemToEdit={itemToEdit}
        setItemToEdit={setItemToEdit}
      />
      <ExpenseSummary expenses={expenses} />
      <ExpenseList
        expenses={expenses}
        deleteExpense={deleteExpense}
        editExpense={setItemToEdit}
      />
    </div>
  );
}
