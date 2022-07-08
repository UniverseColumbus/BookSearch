import React, {useState, useEffect, useCallback} from 'react';
import './styles/Book.css';

export default function Book(props){
	const {title, authors, publishYear, isbn, olid, searchType} = props
	const [show, setShow] = useState(false)
	const [data, setData] = useState({
		text: "Loading",
		image: null,
		authorNames: []
	})
	const symbol = show ? <span>&#8722;</span> : <span>&#43;</span>
	let isbnBookCover = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
	let olidBookCover = `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`

	const fetchImage = useCallback(async () => {
		if (isbn !== 0 || olid !== 0) {
			let res
			if (olid !== 0) res = await fetch(olidBookCover)
			else res = await fetch(isbnBookCover)
			
			const imageBlob = await res.blob()
			const imageObjectURL = URL.createObjectURL(imageBlob)
			
			return imageObjectURL
		}
	}, [isbn, olid, isbnBookCover, olidBookCover])

	const fetchAuthors = useCallback(async () => {
		if (searchType === "ISBN") {
			let data = Promise.all(
				authors.map(async (author) => {
					let url = `https://openlibrary.org${author.key}.json`
					let res = await (await fetch(url)).json()
					return res.name
				})
			)
			return data
		}
		else return authors
	}, [searchType, authors])

	useEffect(() => {
		if (show) {
			Promise.all([
				fetchImage(),
				fetchAuthors()
			]).then(([image, authorNames]) => {
				setData({
					text: "Cover Not Found",
					image: image,
					authorNames: authorNames
				})
			})
		}
	}, [show, fetchImage, fetchAuthors])

	
	return (
		<>
		<div className="book-container">

			<div className="info-box">
				<h1 className="title">{title}</h1>
			</div>

			<button className="btn-show-info" onClick={() => setShow(show => !show)}>
				{symbol}
			</button>

			<div className="book-box">
				<div className="book-cover-box" style={{display: (show)?'block':'none'}}>
					<p className="no-book-cover">{data.text}</p>
					<img className="book-cover" src={data.image} alt=""/>
				</div>

				<div className="book-info-box" style={{display: (show)?'block':'none'}}>
					<p><b>Authors:</b></p> 
					
					{
						data.authorNames.map((author, key) => {
							return <p key={key}>- {author}</p>
						})
					}
					
					<br/>
					<p><b>Year Published:</b>
						<br/>
						- {publishYear}
					</p>
				</div>
			</div>

			

		</div>

		<div className="line"/>
		</>
	)
	
}