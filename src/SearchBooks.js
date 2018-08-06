import React from 'react'
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Books from "./books";

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBooks: [],
      query: ""
    };
  }


  updateQuery = (query) => {
    if (!query) {
      this.setState({ query: '', searchBooks: [] })
    } else {
      this.setState({ query: query.trim() })
      //从API search方法获取搜索到的书没有self
      BooksAPI.search(query).then((searchedBooks) => {
        if(searchedBooks.error) {
          searchedBooks = []
        }
        searchedBooks.map(book => (
          //过滤出搜索到的图书与书架中的书相同的书，修改搜索到的书的shelf
          this.props.books.filter((oneShelfBook) => oneShelfBook.id === book.id)

          .map(oneShelfBook => book.shelf = oneShelfBook.shelf)
        ));

       this.setState({searchBooks:searchedBooks})
      })
    }
  }

  render() {

    return(
      <div className='search-books'>
        <div className='search-books-bar'>
          {/*返回主页*/}
          <Link to='/' className='close-search'>Close</Link>
          {/*搜索框*/}
          <div className='search-books-input-wrapper'>
            <input
            type='text'
            placeholder='Search by titile or authors'
            onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        {/*搜索结果展示*/}
        <div className='search-books-results'>
          <ol className='books-grid'>
              <Books onShelfChange={this.props.onShelfChange} books={this.state.searchBooks} />
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;