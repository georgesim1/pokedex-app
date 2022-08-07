import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import styles from "./PokemonCard.module.css"
import FavButtonOff from "../../assets/FavButtonOff.png"
import FavButtonOn from "../../assets/FavButtonOn.png"
import { addPokedexStorage, pokedexAdded, pokedexRemoved, removePokedexStorage } from '../../services/service'

function PokemonCard(props) {

  const pokedex = useSelector((store) => store.pokedexReducer)

  function isSaved() {
    return pokedex.some(i => i.id == props.id);
  }

  const [saved, setSaved] = useState(isSaved());
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
    <div className={popup ? styles.pokePopupContainer : styles.close}>
      <div className={styles.pokePopup}>
        <p>Supprimer {props.name.charAt(0).toUpperCase() + props.name.slice(1)} de votre pokedex ?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.yesButton} onClick={() => {
            setSaved(false);
            dispatch(pokedexRemoved({id: props.id}));
            removePokedexStorage(props.id);
            setPopup(false)
          }}>Oui</button>
          <button className={styles.noButton} onClick={() => {
            setPopup(false);
          }}>Non</button>
        </div>
      </div>
    </div>
    <Link to={`/pokemon/${props.id}`}>
    <div className={styles.pokemonCard}>
        <img className={styles.FavButtonOn} src={saved ? FavButtonO : FavButtonOff} onClick={(e) => {
          e.preventDefault();
          if(!saved){
            setSaved(true);
            dispatch(pokedexAdded({id: props.id, name: props.name}));
            addPokedexStorage(props.id, props.name);
          } else {
            setPopup(true);
          }
        }} alt="pokeball" />
        <img className={styles.pokemonImg} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`} alt="pokémon" /> 
        <div className={styles.pokemonName}>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</div>
    </div>
    </Link>
    </>
  )
}

export default PokemonCard