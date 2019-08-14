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

    //TODO debe limitarse la paginación a solo maxPage
    // const maxPage = Math.ceil(this.props.results / this.props.itemsPerPage)
    // let currentPageValue = this.state.current_page === maxPage ? 

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
        if ((number >= this.state.current_page - 2 && number <= this.state.current_page + 2)) {
          return (
            <span key={number} className={classes} onClick={this.selectProperPage.bind(this)} data-id={number}>{number}</span>
            )
        }
        return null
      })
    }

    return (
        <div className={styles.wrapper}>
          <div className={styles.pagination}>
            <span onClick={this.selectProperPage.bind(this)} data-id={1}>&lang;&lang;</span>
            <span onClick={this.selectProperPage.bind(this)} data-id={'-'}>&lang;</span>
            {renderPageNumbers}
            <span onClick={this.selectProperPage.bind(this)} data-id={'+'}>&rang;</span>
            <span onClick={this.selectProperPage.bind(this)} data-id={49}>&rang;&rang;</span>
          </div>
        </div>
    )
  }
}

export default Pagination