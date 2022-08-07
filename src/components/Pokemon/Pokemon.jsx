import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { usePokemonDetails, usePokemonMoreDetails } from '../../services/api'
import styles from "./Pokemon.module.css"
import "./PokemonTypes.css"
import FavButtonOn from "../../assets/FavButtonOn.png"
import FavButtonOff from "../../assets/FavButtonOff.png"
import { addPokedexStorage, pokedexAdded, pokedexRemoved, removePokedexStorage } from '../../services/service'

function Pokemon() {
    let { id } = useParams()
    let data = usePokemonDetails(id);
    let moreData = usePokemonMoreDetails(id);

    const pokedex = useSelector((store) => store.pokedexReducer)
    const dispatch = useDispatch();
    const [saved, setSaved] = useState(isSaved());
    const [popup, setPopup] = useState(false)
    
  
    function isSaved() {
        return pokedex.some(i => i.id == id);
    }


  return (
    <>
    <div className={popup ? styles.pokePopupContainer : styles.close}>
      <div className={styles.pokePopup}>
        <p>Supprimer {data !== undefined ? data.name.charAt(0).toUpperCase() + data.name.slice(1) : ""} de votre pokedex ?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.yesButton} onClick={() => {
            setSaved(false);
            dispatch(pokedexRemoved({id: id}));
            removePokedexStorage(id);
            setPopup(false)
          }}>Oui</button>
          <button className={styles.noButton} onClick={() => {
            setPopup(false);
          }}>Non</button>
        </div>
      </div>
    </div>
    <div className={styles.pokemonPageContainer}>
        <h2>{data !== undefined ? data.name.charAt(0).toUpperCase() + data.name.slice(1) : ""}</h2> 
        <div className={`${styles.dispFlex} ${styles.pokemonTypesContainer}`}>
        {data !== undefined ? data.types.map(i => {
                return <div key={i.type.name} className={`pokemon-type ${i.type.name}`}>{i.type.name.charAt(0).toUpperCase() + i.type.name.slice(1)}</div>
              }) : <></>}
        </div>
        <div className={styles.pokemonStats}>
            <div className={styles.imgContainer}>
                <img className={styles.FavButtonOn} onClick={() => {
                    if(!saved){
                        setSaved(true);
                        dispatch(pokedexAdded({id: id, name: data.name}));
                        addPokedexStorage(id, data.name);
                      } else {
                        setPopup(true);
                      }
                }} src={saved ? FavButtonOn : FavButtonOff } alt="" />
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="Pokémon image" />
            </div>
            <div className={`${styles.dispFlex} ${styles.listContainer}`}>
                <ul>
                    <li>HP</li>
                    <li>Attack</li>
                    <li>Defense</li>
                    <li>Sp Atk</li>
                    <li>Sp Def</li>
                    <li>Speed</li>
                </ul>
                <ul>
                    <li>{data !== undefined ? data.stats[0].base_stat : ""}</li>
                    <li>{data !== undefined ? data.stats[1].base_stat : ""}</li>
                    <li>{data !== undefined ? data.stats[2].base_stat : ""}</li>
                    <li>{data !== undefined ? data.stats[3].base_stat : ""}</li>
                    <li>{data !== undefined ? data.stats[4].base_stat : ""}</li>
                    <li>{data !== undefined ? data.stats[5].base_stat : ""}</li>
                </ul>
            </div>
        </div>
        <div className={styles.pokeDescriptionContainer}>
            <h3>Description</h3>
            <p className={styles.pokeDesciption}>{moreData !== undefined ? moreData.flavor_text_entries[0].flavor_text : ""}</p>
        </div>
        <div className={styles.additionalStatsContainer}>
            <h3>Stats additionnelles</h3>
            <div className={styles.additionalStatsListContainer}>
                <div className={styles.additionalStatsList}>
                    <ul>
                        <li>Hauteur:</li>
                        <li>Taux de capture:</li>
                        <li>Egg Groups:</li>
                        <li>Abilities:</li>
                    </ul>
                    <ul>
                        <li>{data !== undefined ? data.height : ""}m</li>
                        <li>{moreData !== undefined ? moreData.capture_rate : ""}</li>
                        <li>{moreData !== undefined ? moreData.egg_groups.map(i => i.name).join(", ") : ""}</li>
                        <li>{data !== undefined ? data.abilities.map(i => {
                            let name = i.ability.name.split("-").join(" ");
                            return name
                            }).join(", ") : ""}</li>
                    </ul>
                </div>
                <div className={styles.additionalStatsList}>
                    <ul>
                        <li>Poids:</li>
                        <li>Gender Ratio:</li>
                        <li>Hatch Steps:</li>
                        <li>EVs:</li>
                    </ul>
                    <ul>
                        <li>{data !== undefined ? data.weight : ""}kg</li>
                        <li>{moreData !== undefined ? moreData.gender_rate : ""}</li>
                        <li>{moreData !== undefined ? moreData.hatch_counter : ""}</li>
                        <li>{data !== undefined ? data.stats.filter(i => i.effort !== 0).map(i => {
                            if(i.effort > 0){
                                return `${i.effort} ${i.stat.name.split("-").join(" ")} `
                            }
                            return
                        }).join(", ") : ""}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <h3>La chaîne d'évolution</h3>
            <div>
              {moreData !== undefined ? moreData.evols.map(i => i.name).join(" > ") : ""}
            </div>
            <div>
              {moreData !== undefined ? moreData.evols.map(i => i.name).join(" > ") : ""}
            </div>
            <div>
              {moreData !== undefined ? moreData.evols.map(i => i.name).join(" > ") : ""}
            </div>
        </div>
    </div>
    </>
  )
}

export default Pokemon