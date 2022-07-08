import React, {useState} from 'react'
import './styles/SearchBar.css'
import './styles/Button.css'

export default function SearchBar(props){
	const {handleTitleChange, handleSortChange, search} = props
	const [show, setShow] = useState(false)
	const [type, setType] = useState('Title')

	const [showSort, setSortShow] = useState(false)
	const [sortType, setSortType] = useState('Unsorted')
	
	const symbol = show ? <span>&#9660;</span> : <span>&#9650;</span>
	const sortSymbol = showSort ? <span>&#9660;</span> : <span>&#9650;</span>
	
	function toggleSearchTypes() {
		setShow(show => !show)
	}

	function chooseSearchType(value) {
		setShow(show => !show)
		setType(value)
	}

	function toggleSortTypes() {
		setSortShow(showSort => !showSort)
	}

	function chooseSortType(value) {
		setSortShow(showSort => !showSort)
		setSortType(value)
		handleSortChange(value)
	}

	return (
		<>
		<form className="search-box-container" onSubmit={(e) => {e.preventDefault()}}>
			<div className="search-box">
				
				{/* Searching */}
				<div className="search-types-container">
					<div 
						className="btn-search-types"
						onClick={toggleSearchTypes}>
						{symbol}
						<span className="search-label">Search: <b>{type}</b></span>
					</div>

					<ul className="search-types-list" style={{display: (show)?'block':'none'}}>
						<li onClick={(e) => chooseSearchType(e.target.getAttribute('value'))} 
							value="Title">
							Title
						</li>
						<li onClick={(e) => chooseSearchType(e.target.getAttribute('value'))} 
							value="Author">
							Author
						</li>
						<li onClick={(e) => chooseSearchType(e.target.getAttribute('value'))} 
							value="ISBN">
							ISBN
						</li>
					</ul>
				</div>

				{/* Sorting */}
				<div className="sort-container">
					<div 
						className="btn-search-types"
						onClick={toggleSortTypes}>
						{sortSymbol}
						<span className="search-label">Sort: <b>{sortType}</b></span>
					</div>

					<ul className="search-types-list" style={{display: (showSort)?'block':'none'}}>
						<li onClick={(e) => chooseSortType(e.target.getAttribute('value'))} 
							value="Unsorted">
							Unsorted
						</li>
						<li onClick={(e) => chooseSortType(e.target.getAttribute('value'))} 
							value="Alphabetically">
							Alphabetically
						</li>
						<li onClick={(e) => chooseSortType(e.target.getAttribute('value'))} 
							value="Published Date">
							Published Date
						</li>
					</ul>
				</div>
				
				<input 
					id="search-bar" 
					type="text" 
					placeholder={`Enter ${type}`}
					onChange={handleTitleChange}
				/>
				
				<button
					onClick={() => search(type, sortType)}
					type="submit"
					className="btn-search component black medium">
					Search
				</button>
				
			</div>
		</form>
		</>
	)
}