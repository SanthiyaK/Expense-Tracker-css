export default function ExpenseList({ expenses, deleteExpense, editExpense }) {
  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <strong>{expense.title}</strong>: ${expense.amount}&nbsp;
          <button onClick={() => deleteExpense(expense.id)}>Delete</button><br></br>
          <button onClick={() => editExpense(expense)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}
