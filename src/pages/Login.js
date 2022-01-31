import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userLogin } from '../actions';

import '../styles/login.css';
import loginImage from '../styles/images/undraw_online_payments_re_y8f2.svg';

// validação de email
// senha 6 caracteres
// botao desabilitado

// salvar no estado
// mudar rota para /carteira

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { history, dispatchValue } = this.props;
    const { email } = this.state;

    dispatchValue(email);
    history.push('/carteira');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    const minNumber = 6;

    return (
      <div className="login-container">
        <div className="login-form">
          <p>TRYBEWALLET</p>

          <input
            type="text"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
            placeholder="email"
          />

          <input
            type="password"
            name="password"
            id="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
            placeholder="password"
          />

          <button
            type="button"
            disabled={ password.length < minNumber || !email.match(/\S+@\S+\.\S+/) }
            onClick={ this.onSubmit }
          >
            Entrar

          </button>
        </div>

        <div className="login-image">
          <img src={ loginImage } alt="login ilustration" />
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  dispatchValue: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchValue: (email) => dispatch(userLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
