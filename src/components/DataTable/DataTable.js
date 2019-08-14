import React, { Component } from 'react'
import axios from 'axios'

import TableItem from './TableItem/TableItem'
import OverlayLoading from '../OverlayLoading/OverlayLoading'
import Pagination from './Pagination/Pagination'

import styles from '../DataTable/DataTable.module.scss';

class DataTable extends Component {

  constructor () {
    super()

    this.state = {
      pokemonIndex: [],
      itemListInformation: [],
      isLoadingPokemonInfo: true,
      resultsCount: 0,
      itemsPerPage: 10,
      pageSelected: 1
    }

    this.paginationOffset = this.paginationOffset.bind(this)
    this.handleElementSelected = this.handleElementSelected.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.getPokemonInfo = this.getPokemonInfo.bind(this)
    this.getInfoPerPokemon = this.getInfoPerPokemon.bind(this)
    this.displayingPokemonData = this.displayingPokemonData.bind(this)
  }

  componentDidMount () {
    this.getPokemonInfo()
  }

  paginationOffset () {
    const itemsPerPage = this.state.itemsPerPage
    return (itemsPerPage * this.state.pageSelected - itemsPerPage)
  }

  handleElementSelected (e) {
    // this.setState({ pageSelected: e.currentTarget.dataset.id })
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.name)
  }

  handlePagination (e) {
    if (e) {
      const maxPage = Math.ceil(this.state.resultsCount / this.state.itemsPerPage)
      const paginationValue = e > maxPage ? maxPage : e
      this.setState({ pageSelected: paginationValue }, () => this.getPokemonInfo())
    }

  }

  async getPokemonInfo () {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${this.paginationOffset()}&limit=${this.state.itemsPerPage}`

    await axios.get(url)
      .then(response => {
        const data = response.data
        this.setState({ pokemonIndex: data.results })
        this.setState({ resultsCount: parseInt(data.count, 10) })
        this.getInfoPerPokemon()
        this.setState({ isLoadingPokemonInfo: false })
      })
      .catch( err => {
        console.log(err)
      })
  }

  async getInfoPerPokemon () {
    let dataExtractedFromApi = []
    this.state.pokemonIndex.map((elem, index) => {
        axios.get(elem.url)
        .then(response => {
          dataExtractedFromApi.push(response.data)
          let eachPokemonData = dataExtractedFromApi.map((elem, index) => {
            return {
              id: elem.id,
              name: elem.name,
              sprite: elem.sprites.front_default
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
          onClick={this.handleElementSelected}
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
    const { resultsCount, itemsPerPage } = this.state
    return (
      <div className={styles.wrapper}>
        <Pagination
          results={resultsCount}
          itemsPerPage={itemsPerPage}
          handlePagination={this.handlePagination}
        />
        <div className={styles.table}>
          <span>Imagen</span>
          <span>Nombre</span>
        </div>
        {displayingPokemonData}
      </div>
    )
  }
}

export default DataTable