import React, { Component } from 'react'

import styles from './Pagination.module.scss'

class Pagination extends Component {
  constructor (props) {
    super(props)

    this.state = {
      current_page: 1
    }
  }

  selectProperPage (e) {
    if (e.currentTarget.dataset.id === '+') {
      this.setState({ current_page: this.state.current_page + 5 }, () => this.props.handlePagination(this.state.current_page))
    } else if (e.currentTarget.dataset.id === '-') {
      this.setState({ current_page: this.state.current_page - 5 }, () => this.props.handlePagination(this.state.current_page))
    } else {
      this.setState({current_page: parseInt(e.currentTarget.dataset.id, 10)}, () => this.props.handlePagination(this.state.current_page))
    }
  }

  render () {
    let renderPageNumbers

    const pageNumbers = [];
    if (this.props.results !== null) {
      for (let i = 1; i <= Math.ceil(this.props.results / this.props.itemsPerPage); i++) {
        pageNumbers.push(i)
      }

      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.current_page === number ? styles.active : ''
        if ((number >= this.state.current_page - 1 && number <= this.state.current_page + 1)) {
          return (
            <span key={number} className={classes} onClick={this.selectProperPage.bind(this)} data-id={number}>{number}</span>
            )
        }
        return null
      })
    }

    return (
        <div className={styles.wrapper}>
        {this.props.results && <div className={styles.results_wrapper}>
            <p className={styles.results}>Total de resultados</p>
            <p className={styles.results}>{this.props.results}</p>
          </div>}

          <div className={styles.select_wrapper}>
            <p className={styles.results}>Resultados por página</p>

            <select className={styles.select} onChange={this.props.handleItemsPerPage} value={this.props.itemsPerPage}>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='30'>30</option>
            </select>
          </div>

          <div className={styles.pagination}>
            <span onClick={this.selectProperPage.bind(this)} data-id={1}>&lang;&lang;</span>

            <span onClick={this.selectProperPage.bind(this)} data-id={'-'}>&lang;</span>

            {renderPageNumbers}

            <span onClick={this.selectProperPage.bind(this)} data-id={'+'}>&rang;</span>

            <span onClick={this.selectProperPage.bind(this)} data-id={Math.ceil(this.props.results / this.props.itemsPerPage)}>&rang;&rang;</span>
          </div>
        </div>
    )
  }
}

export default Pagination