import React, { useState, useEffect } from 'react';

export default function ExpenseForm(props) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (props.itemToEdit) {
      setTitle(props.itemToEdit.title);
      setAmount(props.itemToEdit.amount.toString());
    } else {
      setTitle('');
      setAmount('');
    }
  }, [props.itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    props.addExpense(title, amount, props.itemToEdit?.id);
    setTitle('');
    setAmount('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>&nbsp;
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />
        <label>Amount</label>&nbsp;
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">
          {props.itemToEdit ? "Update Expense" : "Add Expense"}
        </button>
        {props.itemToEdit && (
          <button
            type="button"
            onClick={() => {
              props.setItemToEdit(null);
              setTitle('');
              setAmount('');
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
