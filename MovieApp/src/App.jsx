import { useState, useEffect } from 'react'
import Card from './components/MovieCard'
import './App.css'
import Search from './components/Search'
import Spiner from './components/Spiner'
import MovieCard from './components/MovieCard'

const API_URL_BASE = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchMovies = async (query = "") => {
    setMovies([])
    setLoading(true)
    try {
      const endpoint = query?`${API_URL_BASE}/search/movie?query=${encodeURI(query)}`:
       `${API_URL_BASE}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.response === 'False') {
        console.error('Error fetching movies:', data.error)
        setErrorMessage('Failed to fetch movies')
        return
      }
      setMovies(data.results)

    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMessage('Failed to fetch movies')
    } finally {
      setLoading(false)
    }


  }

  useEffect(() => {
    fetchMovies(searchTerm)
  }, [searchTerm])

  return (
    <>
      <main>
        <div className='pattern'>
          <div className='wrapper'>
            <header>
              <img src="/hero-img.png" alt="Hero Image"></img>
              <h1>Find the best <span className='text-gradient'>Movies</span>, without the hassle</h1>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>
            </header>
            <section className="all-movies">
              <h2 className='mt-[40px]'>All Movies</h2>

              {loading ? (
                <Spiner></Spiner>
              ) :
                errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) :
                  <ul>
                    {movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie}></MovieCard>

                    ))}
                  </ul>
              }
            </section>


          </div>
        </div>
      </main>
    </>

  )
}

export default App
