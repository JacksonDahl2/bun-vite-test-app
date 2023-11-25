
import './App.css'
import { useState } from 'react'
import { BASE_URL } from "./config.json"

interface movieResponse {
    plot: string;
    genres: string[];
    runtime: number;
    metacritic: number;
    rated: string;
    cast: string[];
    poster: string;
    title: string;
    fullplot: string;
    languages: string[];
    released: string;  // or Date if you plan to convert it to a Date object
    directors: string[];
    writers: string[];
    awards: {
      wins: number,
      nominations: number,
      text: string
    };
    lastupdated: string;  // or Date if you plan to convert it to a Date object
    year: number;
    imdb: {
      rating: number,
      votes: number,
      id: number
    };
    countries: string[];
    type: string;
    num_mflix_comments: number;
}

function App() {
    const [movieDisplay, setMovieDisplay] = useState(<></>)
    const [input, setInput] = useState('')

    const createDisplay = (data: movieResponse) => {
        
        setMovieDisplay(
            <div>
                <h3>{data.title}</h3>
                <p>{data.directors[0]}</p>
                <img src={data.poster} alt={`Poster for ${data.title}`}/>
            </div>
        )
    }

    const updateInput = (e) =>{
        setInput(e.target.value)
    }

    const findMovies = async () => {
        try{

            const url = new URL(BASE_URL)
            url.searchParams.set('movieName', input)

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
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
            <input
                type="text"
                onInput={updateInput}
            />
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
