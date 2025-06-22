export default function ExpenseList(props) {
  return (
    <ul className="expense-list">
      {props.expenses.map((expense) => (
        <li key={expense.id}>
          <strong>{expense.title}</strong>: ${expense.amount}&nbsp;
          <button onClick={() => props.deleteExpense(expense.id)}>Delete</button><br />
          <button onClick={() => props.editExpense(expense)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}
