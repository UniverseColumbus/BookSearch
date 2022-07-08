import React from 'react'
import Book from './Book.js'
import './styles/Books.css'

export default function Books(props) {
    let {books, type, sortType} = props
    let booksCopy = [...books]
    const numOfResults = books.length

    function order(a, b) {
        if (sortType === 'Alphabetically') return (a.title > b.title) ? 1 : -1
        else if (type !== 'ISBN' && sortType === 'Published Date') {
            return (a.first_publish_year > b.first_publish_year) ? 1 : -1
        }
        else return
    }

    return (
        <div>
            <div className="books-message">
                <p>Number of Results: {numOfResults}</p>
            </div>
            {
                booksCopy
                .sort(order)
                .map((book, key) => {

                    if (type === "ISBN") {
                        return <Book 
                                    title = {book.title}
                                    authors = {book.authors || "unknown"}
                                    publishYear = {book.publish_date || "unknown"}
                                    isbn = {book.isbn_13 || 0}
                                    olid = {0}
                                    searchType = "ISBN"
                                    key = {key}
                                />
                    }

                    else {
                        return <Book 
                                    title = {book.title}
                                    authors = {book.author_name || ["unknown"]}
                                    publishYear = {book.first_publish_year || "unknown"}
                                    isbn = {book.isbn ? book.isbn[0] : 0}
                                    olid = {book.cover_edition_key || 0}
                                    searchType = "Normal" 
                                    key = {key}
                                />
                    }
                })
            }
        </div>
    )
}
