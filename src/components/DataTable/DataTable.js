import React, { Component } from 'react'
import axios from 'axios'

import TableItem from './TableItem/TableItem'
import OverlayLoading from '../OverlayLoading/OverlayLoading'
import Pagination from './Pagination/Pagination'
import PokemonCollection from '../PokemonCollection/PokemonCollection'

import styles from '../DataTable/DataTable.module.scss';

class DataTable extends Component {

  constructor () {
    super()

    this.state = {
      pokemonIndex: [],
      itemListInformation: [],
      isLoadingComponent: true,
      isLoadingPokemonData: true,
      resultsCount: 0,
      itemsPerPage: 10,
      pageSelected: 1,
      itemsSelected: [],
      itemRepeated: false,
      searByName: ''
    }

    this.paginationOffset = this.paginationOffset.bind(this)
    this.handleElementSelected = this.handleElementSelected.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.getPokemonInfo = this.getPokemonInfo.bind(this)
    this.getInfoPerPokemon = this.getInfoPerPokemon.bind(this)
    this.displayingPokemonData = this.displayingPokemonData.bind(this)
    this.handleItemsPerPage = this.handleItemsPerPage.bind(this)
    this.deleteSelectedItems = this.deleteSelectedItems.bind(this)
  }

  componentDidMount () {
    this.getPokemonInfo()
  }

  paginationOffset () {
    const itemsPerPage = this.state.itemsPerPage
    return (itemsPerPage * this.state.pageSelected - itemsPerPage)
  }

  handleItemsPerPage (e) {
    this.setState({
        itemsPerPage: parseInt(e.target.value, 10),
        isLoadingPokemonData: true
      },
      () => this.getPokemonInfo()
    )
  }

  handleElementSelected (e) {
    const item = {
      name: e.currentTarget.dataset.name,
      id: e.currentTarget.dataset.id,
      sprite: e.currentTarget.dataset.sprite
    }
    let arrayOfSelectedItems = [...this.state.itemsSelected]

    const repeatedElements = arrayOfSelectedItems.findIndex(e => e.id === item.id)

    if (repeatedElements ===  -1) {
      arrayOfSelectedItems.push(item)
    } else {
      return this.setState({ itemRepeated: !this.state.itemRepeated })
    }

    if (arrayOfSelectedItems.length <= 10) {
      return this.setState({ itemsSelected: [...arrayOfSelectedItems] })
    }
  }

  deleteSelectedItems () {
    return this.setState({ itemsSelected: [] })
  }

  handlePagination (e) {
    if (e) {
      const maxPage = Math.ceil(this.state.resultsCount / this.state.itemsPerPage)
      const paginationValue = e > maxPage ? maxPage : e
      this.setState({
        pageSelected: paginationValue,
        isLoadingPokemonData: true
       }, () => this.getPokemonInfo())
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
        this.setState({ isLoadingComponent: false })
      })
      .catch( err => {
        console.log(err)
      })
  }

  async getInfoPerPokemon () {
    let dataExtractedFromApi = []
    this.state.pokemonIndex.map(elem => {
      return axios.get(elem.url)
        .then(response => {
          dataExtractedFromApi.push(response.data)
          let eachPokemonData = dataExtractedFromApi.map(elem => {
            return {
              id: elem.id,
              name: elem.name,
              sprite: elem.sprites.front_default
            }
          })
          this.setState({
            itemListInformation: [...eachPokemonData],
            isLoadingPokemonData: false
           })
          return eachPokemonData
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


    return pokemonOrderedList.map(elem => {
      return (
        <TableItem
          key={elem.id}
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
    const {
      resultsCount,
      itemsPerPage,
      itemsSelected,
      itemRepeated,
      isLoadingComponent,
      isLoadingPokemonData
    } = this.state
    const classes = itemsSelected.length === 10 ?
      `${styles.dataZone} ${styles.alert}`
      : `${styles.dataZone}`

    if (isLoadingComponent) {
      return (
        <OverlayLoading />
      )
    }

    return (
      <div className={styles.wrapper}>
        <Pagination
          results={resultsCount}
          itemsPerPage={itemsPerPage}
          handlePagination={this.handlePagination}
          handleItemsPerPage={this.handleItemsPerPage}
        />

        <div className={classes}>
          {isLoadingPokemonData ? (
              <OverlayLoading />
            ) : (
              <div className={`${styles.cards} ${styles.no_print}`}>
                {displayingPokemonData}
              </div>
            )
          }
          <PokemonCollection
            selectedItems={itemsSelected}
            itemRepeated={itemRepeated}
            deleteItems={this.deleteSelectedItems}
          />
        </div>
      </div>
    )
  }
}

export default DataTable