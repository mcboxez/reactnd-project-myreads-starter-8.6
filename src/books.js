import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * description: method of inline styling: the style of book cover
 * @param book
 * @returns {{width: number, height: number, backgroundImage: string}}
 * @constructor
 */

class Books extends Component {
    render(){

        console.log(this.props)
        
        return(
            <ol className="books-grid">
                {this.props.books.map((book)=>(
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage: `url(${book.imageLinks.smallThumbnail||book.imageLinks})`
                                }}>
                                </div>
                                <div className="book-shelf-changer">
                                   {/* 如果能读取shelf，直接更新shelf数据，否则shelf为 none
                                   读取changeShelf的更新数据 */}
                                    <select value={book.shelf ? book.shelf: 'none'}
                                     onChange={(event)=>this.props.changeShelf(book, event.target.value)}>
                                        <option value="null" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}


// Books.propTypes = {
//   book: PropTypes.object.isRequired,
// };

export default Books