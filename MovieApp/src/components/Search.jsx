import React from 'react'
const Search = (props) => {
   let { searchTerm, setSearchTerm } = props
  return (
    <div className='search'>
        <div>
            <img src="/search.svg" alt="Search Icon"></img>
            <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
   
  )
}

export default Search
