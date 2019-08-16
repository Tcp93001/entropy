import React from 'react'

import DataTable from '../DataTable/DataTable'
import PokemonLogo from '../../img/Pokemon-logo.png'
import styles from './ItemsContainer.module.scss'

const ItemContainer = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <img className={styles.mainImage} src={PokemonLogo} alt='Pokemon Logo' />
      </div>
      <p className={styles.title}>¡Selecciona tus 10 Pokemones favoritos!</p>
      <p className={styles.subtitle}>Tus pokemones favoritos se mostrarán en el panel de la derecha y podrás imprimirlos!</p>

      <DataTable />
    </div>
  )
}

export default ItemContainer