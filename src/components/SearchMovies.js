import React from 'react';
import { useEffect } from "react";
import { useState } from "react";

import noPoster from '../assets/images/no-poster.png';

function SearchMovies(){

	const [keywords, setKeywords] = useState('');

	function searchMovie() {
		document.getElementById("searchForm").addEventListener("submit", e =>{
			e.preventDefault()
		})

		setKeywords(inputRef.current.value)
	}

	// Credenciales de API
	const apiKey = '55bf19fc'; // Intenta poner cualquier cosa antes para probar

	const [movies, setMovies] = useState({
		error: false,
		data: []
	});

	useEffect(() => {
		fetch(`http://www.omdbapi.com/?s=${keywords}&apikey=${apiKey}`)
		  .then(res => res.json())
		  .then(response => {
			setMovies({
				error: response.Error ? response.Error : false ,
				data: response.Search,
			})
		});
			
	  }, [keywords])
	
	const inputRef = React.useRef(null)

	return(
		<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form method="GET" id='searchForm'>
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input type="text" className="form-control" ref={inputRef}/>
								</div>
								<button className="btn btn-info" onClick={searchMovie}>Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Películas para la palabra: {keywords}</h2>
						</div>
						{/* Listado de películas */}
						{
							!movies.error && movies.data.length > 0 && movies.data.map((movie, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-4 mb-4" 
														src={movie.Poster ? movie.Poster : noPoster}
														alt={movie.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ movies.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">ApiKey incorrecta</div>
			}
		</div>
	)
}

export default SearchMovies;
