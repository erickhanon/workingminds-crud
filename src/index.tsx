import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [{
        id: 1,
        uf: 'RJ',
        cidade: 'Rio de Janeiro',
      },
      {
        id: 2,
        uf: 'SP',
        cidade: 'São Paulo',
      }
    ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })

    this.delete('/transactions/:id', (schema, request) => {
      console.log(request);

      return {}
      
      // return this.schema.all('transaction')
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
