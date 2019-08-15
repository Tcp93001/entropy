import React, { Component } from 'react'

import TableItem from '../DataTable/TableItem/TableItem'

import styles from './PokemonCollection.module.scss'

class PokemonCollection extends Component {
  render () {
    const classes = this.props.selectedItems.length === 10 ?
      `${styles.cards_wrapper} ${styles.cards_wrapper_full}`
      : `${styles.cards_wrapper}`
    return (
      <div>
        <div className={styles.elements_wrapper}>
          <div className={styles.title}>
            Tu colección
          </div>
          {this.props.selectedItems.length === 0 &&
              <div className={styles.invitation}>
                <span>Selecciona los Pokemón que quieras y se irán agregando aquí...</span>
              </div>
          }
          {this.props.selectedItems.length === 10 &&
              <div className={styles.listIsFull}>
                <span>¡Ya seleccionaste todos tus pokemones!</span>
              </div>
          }

          {this.props.selectedItems.length !== 0 &&
            <div className={classes}>
              {this.props.selectedItems.map((elem, index) => {
                return (
                  <TableItem
                    key={index}
                    id={elem.id}
                    sprite={elem.sprite}
                    name={elem.name}
                  />
                )
              })}
            </div>
          }
        </div>
      </div>
    )
  }
}

export default PokemonCollection