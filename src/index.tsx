import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Vendas online',
          type: 'deposit',
          category: 'Ecommerce',
          amount: 8530,
          createdAt: new Date('2022-02-07 09:00:00'),
        },
        {
          id: 2,
          title: 'Compra de material',
          type: 'withdraw',
          category: 'Materiais',
          amount: 2380,
          createdAt: new Date('2022-02-08 09:00:00'),
        }
      ]
    })
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);