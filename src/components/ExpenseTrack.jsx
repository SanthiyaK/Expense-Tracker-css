import { useState } from "react";
import { v4 as uid } from "uuid";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import './Stylecss.css'

const EXPENSES = [
  { id: uid(), title: "Expense 1", amount: 100 },
  { id: uid(), title: "Expense 2", amount: -200 },
];

export default function ExpenseTrack() {
  const [expenses, setExpenses] = useState(EXPENSES);
  const [itemToEdit, setItemToEdit] = useState(null);

  const addExpense = (title, amount, id = null) => {
    if (id) {
      const updated = expenses.map((exp) =>
        exp.id === id ? { ...exp, title, amount: Number(amount) } : exp
      );
      setExpenses(updated);
      setItemToEdit(null);
    } else {
      setExpenses([...expenses, { id: uid(), title, amount: Number(amount) }]);
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
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
