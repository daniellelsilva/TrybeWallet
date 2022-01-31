import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';
// import EditForm from './EditForm';

import '../styles/table.css';

class Table extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     isEditing: false,
  //     editExp: [],
  //   };

  //   this.handleEditButton = this.handleEditButton.bind(this);
  // }

  // handleEditButton({ target }) {
  //   const { expenses } = this.props;
  //   const { id } = target;
  //   // console.log(typeof id);
  //   const numberId = Number(id);
  //   // console.log(typeof numberId);
  //   this.setState({ isEditing: true });

  //   expenses.filter((expense) => (expense.id === numberId
  //     ? this.setState({ editExp: expense }) : null));
  // }

  render() {
    const { expenses, deleteItem } = this.props;
    // const { isEditing, editExp } = this.state;
    return (
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Excluir</th>
            </tr>
            {expenses.map((expense) => {
              const {
                currency,
                description,
                exchangeRates,
                id,
                method,
                tag,
                value,
              } = expense;
              const bothCurrencyName = exchangeRates[currency].name;
              // nome vem 'nome da moeda'/'real brasileiro', split para separar
              const splitCurrencyName = bothCurrencyName.split('/');
              // nome da moeda está no primeiro
              const currencyName = splitCurrencyName[0];

              const currencyValue = exchangeRates[currency].ask;
              const convertedValue = parseFloat(value) * parseFloat(currencyValue);
              // console.log(currencyValue);
              return (
                <tr key={ id } id={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ currencyName }</td>
                  <td>{ parseFloat(currencyValue).toFixed(2) }</td>
                  <td>{ convertedValue.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => { deleteItem(id); } }
                    >
                      <i className="bi bi-trash" />

                    </button>

                    {/* <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ this.handleEditButton }
                      id={ id }
                    >
                      Editar despesa
                    </button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* { isEditing ? <EditForm editExp={ editExp } /> : null } */}
      </div>

    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
  })),
  deleteItem: PropTypes.func.isRequired,
};

Table.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

// mandar o index pq o reducer vai fazer um filtro para tirar o index selecionado
const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
