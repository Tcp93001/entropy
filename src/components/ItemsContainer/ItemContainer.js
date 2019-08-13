import React from 'react'

import DataTable from '../DataTable/DataTable'

import styles from './ItemsContainer.module.scss'

const ItemContainer = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        pokemon logo
      </div>

      <div>search</div>

      <div>items number</div>

      <div>select item quantity</div>

      <DataTable />

      <div>pagination</div>
    </div>
  )
}

export default ItemContainer