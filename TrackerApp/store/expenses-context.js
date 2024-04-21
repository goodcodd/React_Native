import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.59,
        date: new Date('2022-04-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2023-05-15')
    },
    {
        id: 'e3',
        description: 'Apples',
        amount: 15.10,
        date: new Date('2023-06-10')
    },
    {
        id: 'e4',
        description: 'Dress',
        amount: 60.39,
        date: new Date('2024-04-19')
    },
    {
        id: 'e5',
        description: 'A book',
        amount: 15.05,
        date: new Date('2024-02-28')
    },
    {
        id: 'e6',
        description: 'Coffee',
        amount: 9.59,
        date: new Date('2022-07-09')
    },
    {
        id: 'e7',
        description: 'Car',
        amount: 13900.00,
        date: new Date('2025-05-05')
    },
    {
        id: 'e8',
        description: 'Bananas',
        amount: 11.11,
        date: new Date('2023-01-11')
    },
    {
        id: 'e9',
        description: 'TV-set',
        amount: 100.50,
        date: new Date('2025-01-21')
    },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;