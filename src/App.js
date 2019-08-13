import React from 'react'
import styles from './App.module.scss'

import ItemsContainer from './components/ItemsContainer/ItemContainer'

const App = () => {
  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
          <ItemsContainer />
      </div>
    </div>
  );
}

export default App
