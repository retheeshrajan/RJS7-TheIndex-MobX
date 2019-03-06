import { decorate, observable, computed } from 'mobx'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://the-index-api.herokuapp.com'
})

class BookStore {
  books = []

  loading = true

  query = ''

  bookColor = ''

  fetchBooks = async () => {
    try {
      const res = await instance.get('/api/books/')
      const books = res.data
      this.books = books
      this.loading = false
    } catch (err) {
      console.error(err)
    }
  }

  get filteredBooks () {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(this.query.toLowerCase())
    )
  }

  get filterBooksByColor () {
    return this.books.filter(book => book.color === this.bookColor)
  }

  // getAuthorById = id => this.authors.find(author => +author.id === +id)
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  bookColor: observable,
  filteredBooks: computed,
  filterBooksByColor: computed
})

const bookStore = new BookStore()
bookStore.fetchBooks()

export default bookStore
