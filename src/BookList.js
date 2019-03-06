import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { observer } from 'mobx-react'

// Store
import bookStore from './stores/bookStore'

// Components
import Loading from './Loading'
import SearchBar from './SearchBar'
import BookTable from './BookTable'

class BookList extends Component {
  render () {
    //bookStore.bookColor = this.props.match.params.bookColor
    let books = bookStore.books

    if (bookStore.bookColor) {
      books = bookStore.filterBooksByColor
    }

    return bookStore.loading ? (
      <Loading />
    ) : (
      <div>
        <h3>Books</h3>
        <SearchBar store={{ bookStore }} />
        <BookTable books={books} />
      </div>
    )
  }
}

export default observer(BookList)
