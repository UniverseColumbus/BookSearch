import React, {useState, useEffect} from 'react'
import { useQuery } from "react-query";
import Books from './Books.js'
import SearchBar from './SearchBar.js'
import './styles/BookSearch.css'

export default function BookSearch() {

    let [call, setCall] = useState({
        query: '',
        type: 'Title',
        sortType: 'Unsorted',
        books: [],
        searched: false
    })

    function search(type, sortType) {
        setCall({
            query: call.query,
            type: type,
            sortType: sortType,
            books: call.books,
            searched: true
        })
    }

    function handleTitleChange(e) {
        call.query = e.target.value
    }

    function handleSortChange(sortType) {
        setCall({
            query: call.query,
            type: call.type,
            sortType: sortType,
            books: call.books,
            searched: false
        })
    }

    
    function BookResults() {
        let enabled = (call.searched) ? true : false
        let message = ''
        let type = call.type
        let query = call.query
        let books = call.books

        if (type === 'Title'){
            query = `http://openlibrary.org/search.json?title=${query}`
        }
        else if (type === 'Author'){
            query = `http://openlibrary.org/search.json?author=${query}`
        }
        else if (type === 'ISBN'){
            if (isNaN(query) && query !== '') {
                message = 'Must Enter a Number'
                enabled = false
            }
            query = `http://openlibrary.org/isbn/${query}.json`
        }

        query = query.replaceAll(' ', '+')
        if (query === '') enabled = false
        const { status, data, error } = useQuery(query, {enabled})

        if (status === 'success' && data.error !== 'notfound') {
            if (type === 'ISBN') books = [data]
            else books = data.docs
        }
        else if (error) console.log("query error: ", error)

        useEffect(() => {
            if(call.searched && data) {
                setCall({
                    query: call.query,
                    type: call.type,
                    sortType: call.sortType,
                    books: books,
                    searched: false
                })
            }
        }, [data, call.searched])
        

        let numOfResults = books.length

        if (call.searched === true && status === 'loading') {
            return  <div className="books-message">
                        <p>Loading...</p>
                    </div>
        }
        else if (call.searched === true && numOfResults === 0) {
            return  <div className="books-message">
                        <p>No Search Results</p>
                        <span className="error-message">{message}</span>
                    </div>
        }
        else if (numOfResults === 0) {
            return  <div className="books-message">
                        <p>Number of Results: {numOfResults}</p>
                    </div>
        }
        else {
            return (
                <Books 
                    books={books}
                    type={call.type}
                    sortType={call.sortType}
                />
            )
        }
    }



    return (
        <>  
        <SearchBar 
            handleTitleChange={handleTitleChange}
            handleSortChange={handleSortChange}
            search={search} 
        />

        <div className="books-container">
            <BookResults/>
        </div>
        </>
    )
}