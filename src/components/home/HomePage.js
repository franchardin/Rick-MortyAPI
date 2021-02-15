import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { connect } from 'react-redux'
import { removeCharacterAction } from '../../redux/charsDuck'

function Home({ chars, removeCharacterAction }) {

    function renderCharacter() {
        let char = chars[0]
        return (
            <Card leftClick={nextCharacter} {...char}/>
        )
    }

    function nextCharacter() {
        removeCharacterAction()
    }   

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}

// toma el store (todos los states) de redux y lo pasa a los props
function mapState(state){
    // pasamos todo lo que esta en state.characters.array a un prop llamado chars
    return {
        chars: state.characters.array
    }
}

// se usa para pedir datos y para despachar acciones
// removeCharactersAction se pasa como un prop
export default connect(mapState, {removeCharacterAction})(Home)