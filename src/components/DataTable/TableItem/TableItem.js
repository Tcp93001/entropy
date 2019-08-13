import React from 'react'

import styles from './TableItem.module.scss'

const TableItem = (props) => {

  return (
    <div className={styles.table}>
      <span>{props.id}</span>
      <img className={styles.images} src={props.sprite} alt='Imagenes Pokemon'/>
      <span>{props.name}</span>
      <span>{props.species}</span>
      <span className={styles.hidden}>{props.weight} cm</span>
      <span className={styles.hidden}>{props.height} cm</span>
    </div>
  )
}

export default TableItem