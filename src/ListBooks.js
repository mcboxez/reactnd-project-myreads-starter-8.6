import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import Book from './books'




const ListBooks = (props)=>{

    const {books, onShelfChange} = props
    
    let currentlyReading = books.filter(item => item.shelf == 'currentlyReading')
    let wantToRead = books.filter(item => item.shelf == 'wantToRead')
    let read = books.filter(item => item.shelf == 'read')
    
    
    // console.log(books)
    // console.log(currentlyReading, wantToRead, read)
    
    
    return (

        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2>Currently Reading</h2>
                        <div>
                            <Book books={currentlyReading} changeShelf={onShelfChange}/>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2>Want to Read</h2>
                        <div>
                            <Book books={wantToRead} changeShelf={onShelfChange}/>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2>Read</h2>
                        <iv>
                            <Book books={read} changeShelf={onShelfChange}/>
                        </iv>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to={"/search"}>Add a book</Link>
            </div>
        </div>
    )
};

// ListBooks.propTypes = {
//   books: PropTypes.array.isRequired,
//   onShelfChange: PropTypes.func.isRequired
// };

export default ListBooks