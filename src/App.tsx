
import './App.css'
import { useState } from 'react'

function App() {
    const [movieDisplay, setMovieDisplay] = useState(<></>)

    const createDisplay = (data: unknown) => {
        setMovieDisplay(
            <p>
                {JSON.stringify(data)}
            </p>
        )
    }

    const findMovies = async () => {
        try{
            const response = await fetch('http://localhost:3000/')
            const data = await response.json();
            createDisplay(data)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <h1>Moviesss</h1>
            <button
                onClick={findMovies}
                >
                ShowMovies
            </button>
            {movieDisplay}
        </>
    )
}

export default App
