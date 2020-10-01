import React, { useEffect,useState } from 'react';
import './App.css';

import Recipe from './Recipe';

const App = () => {
  const APP_ID = 'aae97f95'
  const APP_KEY = '89884f45196c1ecd6db922c10ace81c7'

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
   getRecipes() 
  }, [query])

  const getRecipes = async () => {
    setLoading(false);
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json()
    setRecipes(data.hits);
    setLoading(true);
  }

  const updateSearch = (e) =>{
      setSearch(e.target.value);
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return(
    <div onSubmit={getSearch}className='App'>
        <form className='search-form'>
          <input className='search-bar' type='text' placeholder=''value={search} onChange={updateSearch}/>
          <button className='search-button' type='submit'> Search
          </button> 
        </form>
        <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}/>
        ))}
      </div>
    </div>
  )
}

export default App;
