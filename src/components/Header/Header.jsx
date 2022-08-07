import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./Header.module.css";

function Header() {
  return (
    <header>
      <Link to="/">
        <h1>Pokédex-app SIMAK</h1>
        </Link>
        <nav>
          <ul>
            <Link to="/"><li>POKEMON LIST</li></Link>
            <Link to="/my-pokedex"><li>MES POKEMONS</li></Link>
          </ul>
        </nav>
    </header>
  )
}

export default Header