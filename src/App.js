import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
    /**
     * TODO: 不要使用这个状态变量跟踪我们所在的页面
     * 而是使用浏览器地址栏中的URL。
     * 这将确保用户可以使用浏览器的后退和前进按钮进行页面导航
     * 同时提供一个可以收藏为书签和分享的好的网址。
     */
    //showSearchPage: false

    //给books,currentlyReading,wantToRead,read添加到状态
constructor(props){
        super(props);
        this.state = {
            books: [],
            // currentlyReading:[],
            // wantToRead: [],
            // read: []
        };
    }

//利用bookAPI，获取书架数据，保持currentlyReading，wantToRead，read 的更新
 componentDidMount() {
        BooksAPI.getAll().then((books) => {
            // this.setState({currentlyReading:books.filter((book)=>book.shelf==='currentlyReading')});
            // this.setState({wantToRead: books.filter((book)=>book.shelf==='wantToRead')});
            // this.setState({read: books.filter((book)=>book.shelf==='read')});


            this.setState({books: books})
            
            
        });
    }
  

  //获取书架数据
  shelfChange = (book, newShelf) => {


    console.log(book, newShelf);
    
    BooksAPI.update(book, newShelf)
      .then(() => {
        this.setState(prevState => {
          let newBooks;

          // 获取除了当前操作的图书的所有其它图书
          const restOfBooksInShelf = prevState.books.filter(
            preBook => preBook.id !== book.id
          );

          if (newShelf !== "none") {
            // 如果对图书所做的操作不是从书架移除，那么将这本书合并到 restOfBooksInShelf 中并返回一个全新的图书数组

            book.shelf = newShelf;
            
            newBooks = restOfBooksInShelf.concat([book]);
          } else {
            newBooks = restOfBooksInShelf;
          }

          //更新数据并渲染界面
          return {
            books: newBooks
          };
        });
      })
  };    

//利用route监测所有路径，何时渲染Listbooks,或是SearchBooks
  render() {
    const { books } = this.state;
    const shelfChange = this.shelfChange;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <ListBooks books={books} onShelfChange={shelfChange} />}
        />

        <Route
          path="/search"
          render={() => (
            <SearchBooks books={books} onShelfChange={shelfChange} />
          )}
        />
      </div>
    );
  }
}


  

export default BooksApp
