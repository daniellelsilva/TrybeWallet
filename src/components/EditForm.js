// import React from 'react';
// // import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { fetchApi, requestExchanges } from '../../actions';

// class EditForm extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       formInfo: {
//         id: 0,
//         value: '',
//         description: '',
//         currency: 'USD',
//         method: 'Dinheiro',
//         tag: 'Alimentação',
//         exchangeRates: {},
//       },
//       currencies: [],
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleClick = this.handleClick.bind(this);
//     this.handleSelect = this.handleSelect.bind(this);
//   }

//   componentDidMount() {
//     this.handleSelect();
//   }

//   async handleSelect() {
//     const rates = await fetchApi();
//     const currencies = Object.keys(rates).filter((currency) => currency !== 'USDT');
//     this.setState({ currencies });
//     // console.log(currencies);
//   }

//   handleClick() {
//     const { addValue } = this.props;
//     const { formInfo } = this.state;
//     const { id } = formInfo;

//     addValue(formInfo);
//     this.setState({
//       formInfo: {
//         ...formInfo,
//         id: id + 1,
//         value: 0,
//         description: '',
//       },
//     });
//   }

//   handleChange({ target }) {
//     const { name, value } = target;
//     const { formInfo } = this.state;
//     this.setState({ formInfo: {
//       ...formInfo,
//       [name]: value,
//     } });
//   }

//   render() {
//     const { editExp } = this.props;
//     const { value, description, currency, method, tag } = editExp;

//     const { currencies } = this.state;
//     return (
//       <div>
//         <form>
//           <label htmlFor="value">
//             Valor:
//             <input
//               defaultValue={ value }
//               id="value"
//               type="number"
//               placeholder="Valor gasto"
//               name="value"
//               // value={ value }
//               data-testid="value-input"
//               onChange={ this.handleChange }
//             />
//           </label>

//           <label htmlFor="description">
//             Descrição:
//             <input
//               value={ description }
//               id="description"
//               type="text"
//               placeholder="Descrição do gasto"
//               name="description"
//               // value={ description }
//               data-testid="description-input"
//               onChange={ this.handleChange }
//             />
//           </label>

//           <label htmlFor="currency-input">
//             Moeda:
//             <select
//               value={ currency }
//               id="currency-input"
//               name="currency"
//               data-testid="currency-input"
//               onChange={ this.handleChange }
//             >
//               {currencies.map((code, index) => (
//                 <option data-testid={ code } key={ index }>{ code }</option>
//               ))}
//             </select>
//           </label>

//           <label htmlFor="method">
//             Método de pagamento:
//             <select
//               defaultValue={ method }
//               id="method"
//               name="method"
//               data-testid="method-input"
//               onChange={ this.handleChange }
//             >
//               <option>Dinheiro</option>
//               <option>Cartão de crédito</option>
//               <option>Cartão de débito</option>
//             </select>
//           </label>

//           <label htmlFor="tag">
//             Tipo de gasto:
//             <select
//               defaultValue={ tag }
//               id="tag"
//               name="tag"
//               data-testid="tag-input"
//               onChange={ this.handleChange }
//             >
//               <option>Alimentação</option>
//               <option>Lazer</option>
//               <option>Trabalho</option>
//               <option>Transporte</option>
//               <option>Saúde</option>
//             </select>
//           </label>

//           <button
//             type="button"
//             onClick={ this.handleClick }
//           >
//             Salvar despesa
//           </button>

//         </form>
//       </div>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   expenses: state.wallet.expenses,
//   currencies: state.wallet.currencies,
//   email: state.user.email,
// });

// const mapDispatchToProps = (dispatch) => ({
//   addValue: (data) => dispatch(requestExchanges(data)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
