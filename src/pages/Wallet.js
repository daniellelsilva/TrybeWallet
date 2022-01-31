import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import Table from '../components/Table';

import '../styles/form.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="form-table-container">
          <Form />
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
