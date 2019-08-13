import React, { Component } from 'react'
import axios from 'axios'

import TableItem from './TableItem/TableItem'
import OverlayLoading from '../OverlayLoading/OverlayLoading'

import styles from '../DataTable/DataTable.module.scss';

class DataTable extends Component {

  constructor () {
    super()

    this.state = {
      pokemonIndex: [],
      nextListElements: '',
      itemListInformation: [],
      isLoadingPokemonInfo: true
    }
  }

  componentDidMount () {
    this.getPokemonInfo()
  }

  async getPokemonInfo () {
    await axios.get('https://pokeapi.co/api/v2/pokemon')
      .then(response => {
        const data = response.data
        this.setState({nextListElements: data.next})
        this.setState({pokemonIndex: data.results})
        this.getInfoPerPokemon()
        this.setState({isLoadingPokemonInfo: !this.state.isLoadingPokemonInfo})
      })
      .catch( err => {
        console.log(err)
      })
  }

  getInfoPerPokemon () {
    let dataExtractedFromApi = []
    this.state.pokemonIndex.map((elem, index) => {
        return axios.get(elem.url)
        .then(response => {
          dataExtractedFromApi.push(response.data)
          let eachPokemonData = dataExtractedFromApi.map((elem, index) => {
            return {
              id: elem.id,
              name: elem.name,
              sprite: elem.sprites.front_default,
              species: elem.species.name,
              weight: elem.weight,
              height: elem.height,
              //TODO revisar abilities para ponerlas en la sección que corresponda
              abilities: elem.abilities
            }
          })
          eachPokemonData.sort((a, b) => {
            if (a.id < b.item) {
              return -1
            } else if (a.id > b.item) {
              return 1
            } else {
              return 0
            }
          })
          this.setState({ itemListInformation: [...eachPokemonData] })
        })
        .catch(err => {
          console.log(err)
        })
    })
  }

  displayingPokemonData () {
    let pokemonOrderedList = [...this.state.itemListInformation]
    console.log(pokemonOrderedList)
    pokemonOrderedList.sort((a, b) => {
      if (a.id < b.id) {
        return -1
      } else if (a.id > b.id) {
        return 1
      } else {
        return 0
      }
    })

    return pokemonOrderedList.map((elem, index) => {
      return (
        <TableItem
          key={index}
          id={elem.id}
          sprite={elem.sprite}
          name={elem.name}
          species={elem.species}
          height={elem.height}
          weight={elem.weight}
        />
      )
    })
  }

  render () {
    const displayingPokemonData = this.displayingPokemonData()

    if (this.state.isLoadingPokemonInfo)
      return (
        <OverlayLoading />
      )
    return (
      <div className={styles.wrapper}>
        <div className={styles.table}>
          <span>Check</span>
          <span>Imagen</span>
          <span>Nombre</span>
          <span className={styles.hidden}>Especie</span>
          <span className={styles.hidden}>Peso</span>
          <span className={styles.hidden}>Altura</span>
        </div>
        {displayingPokemonData}
      </div>
    )
  }
}

export default DataTable