import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, requestExchanges } from '../actions';

import '../styles/form.css';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      formInfo: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
      currencies: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.handleSelect();
  }

  handleChange({ target }) {
    const { name, value } = target;
    const { formInfo } = this.state;
    this.setState({ formInfo: {
      ...formInfo,
      [name]: value,
    } });
  }

  handleClick() {
    const { addValue } = this.props;
    const { formInfo } = this.state;
    const { id } = formInfo;

    addValue(formInfo);
    this.setState({
      formInfo: {
        ...formInfo,
        id: id + 1,
        value: 0,
        description: '',
      },
    });
  }

  async handleSelect() {
    const rates = await fetchApi();
    const currencies = Object.keys(rates).filter((currency) => currency !== 'USDT');
    this.setState({ currencies });
    // console.log(currencies);
  }

  render() {
    const { formInfo, currencies } = this.state;
    const { value, description, currency } = formInfo;

    return (
      <div className="form-container">
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              type="number"
              placeholder="Valor gasto"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              type="text"
              placeholder="Descrição do gasto"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((code, index) => (
                <option data-testid={ code } key={ index }>{ code }</option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tipo de gasto:
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          {/* esse botão deve: salvar os valores na aplicação, atualiza
          a soma, salvar a cotação do cambio,
          após salvar o total no header deve ser somado */}
          <button
            type="button"
            onClick={ this.handleClick }
            className="form-btn"
          >
            Adicionar despesa
          </button>

        </form>
      </div>
    );
  }
}

Form.propTypes = {
  addValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  addValue: (data) => dispatch(requestExchanges(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
