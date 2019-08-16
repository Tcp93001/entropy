import React, { Component } from 'react'

import TableItem from '../DataTable/TableItem/TableItem'

import styles from './PokemonCollection.module.scss'

class PokemonCollection extends Component {

  printing () {
    window.print()
  }

  render () {
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
              <div>
                <div className={`${styles.invitation} ${styles.no_print}`}>
                  <span>¡Ya seleccionaste todos tus pokemones!</span>
                </div>
                <button onClick={this.printing} className={`${styles.button_accept} ${styles.no_print}`}>Imprimir</button>
                <button onClick={this.props.deleteItems} className={`${styles.button_cancel} ${styles.no_print}`}>Borrar todos</button>
              </div>
          }

          {this.props.selectedItems.length !== 0 &&
            <div className={styles.cards_wrapper}>
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