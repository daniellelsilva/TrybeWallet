// Coloque aqui suas actions

export const userLogin = (payload) => ({ type: 'USER_LOGIN', payload });

export const addExpense = (payload) => ({ type: 'ADD_EXPENSE', payload });

export const deleteExpense = (id) => ({ type: 'DELETE_EXPENSE', id });

// export const editExpense = (id) => ({ type: 'EDIT_EXPENSE', id });

export const saveEditExpense = () => ({});

const API_URL = 'https://economia.awesomeapi.com.br/json/all';

export const fetchApi = () => fetch(API_URL)
  .then((response) => response.json());
// https://economia.awesomeapi.com.br/json/all

export const requestExchanges = (data) => (dispatch) => fetchApi().then((rates) => {
  const exchangeRates = Object.entries(rates)
    .reduce((acc, [currency, rate]) => ({ ...acc, [currency]: rate }), {});
  dispatch(addExpense({ ...data, exchangeRates }));
});
