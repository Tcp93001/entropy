import React from 'react'

import styles from './TableItem.module.scss'
import pokeBall from '../../../img/pokeball.png'

const TableItem = (props) => {

  return (
    <div
      onClick={props.onClick}
      data-id={props.id}
      data-name={props.name}
      data-sprite={props.sprite}
      className={` ${styles.fadeIn} ${styles.table}`}
    >
      <img className={styles.images} src={props.sprite || pokeBall} alt='Imagenes Pokemon'/>
      <span className={styles.names}>{props.name}</span>
    </div>
  )
}

export default TableItem