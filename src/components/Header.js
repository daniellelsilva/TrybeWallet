import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../styles/header.css';

class Header extends Component {
  constructor() {
    super();

    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { expenses } = this.props;
    // console.log(expenses);
    // // console.log(typeof expenses);
    return expenses.reduce((prev, curr) => {
      // console.log(curr.exchangeRates[curr.currency].ask);
      const currencyValue = parseFloat(curr.exchangeRates[curr.currency].ask);
      const convertedValue = currencyValue * parseFloat(curr.value);

      return prev + convertedValue;
    }, 0).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header-container">
        <p className="header-title">TRYBEWALLET</p>
        <div className="header-user-info">
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ this.sumExpenses() }</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })),
};

Header.defaultProps = {
  expenses: [],
  email: '',
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
