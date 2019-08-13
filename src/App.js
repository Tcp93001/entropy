import React from 'react';
import logo from './logo.svg';
import styles from './App.module.scss'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.app_header}>
        <img src={logo} className={styles.appuy} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={styles.app_link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Button>Texto</Button>

        <Form.Control className={styles.select} as='select'>
          <option>Mostrar 20 resultados</option>
          <option>Mostrar 30</option>
          <option>Mostrar 40</option>
          <option>Mostrar 50</option>
          <option>Mostrar 100</option>
        </Form.Control>
      </header>
    </div>
  );
}

export default App;
