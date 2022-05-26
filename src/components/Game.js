import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import { Link } from "react-router-dom"
import "../style.css";
import {GrPowerReset } from 'react-icons/gr'
import {BiTime} from 'react-icons/bi';
import {FaRegHandRock} from 'react-icons/fa';
import {GiRollingDices} from 'react-icons/gi'
  
export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [noOfRoll, setNoOfRoll] = React.useState(0)
    const [noOfHeld, setNoOfHeld] = React.useState(0)
    const [sec, setSec] = React.useState(0)
    const [endSec, setEndSec] = React.useState(0)
    const [start, setStart] = React.useState(false)
    const [highlight, setHighlight] = React.useState(JSON.parse(localStorage.getItem("highlight")) || [])
    
    // console.log(endSec)
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setStart(false)
            setEndSec(sec)
            saveToStorage()
        }
    }, [dice])

    const saveToStorage = () => {
        localStorage.setItem("highlight", JSON.stringify([{
            FinishTime: sec,
            Roll : noOfRoll
        }, ...highlight]))
    }

    // console.log(highlight)

    React.useEffect(() => {
        if(!tenzies && start) {
            const interval = setInterval(() => {
                setSec(seconds => seconds + 1);
              }, 1000);
              return () => clearInterval(interval);
        }
    }, [dice]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    const countHeld = () => {
        setStart(true)
       const held =  dice.filter(die => die.isHeld === true)

        setNoOfHeld(held.length)
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        // setNoOfRoll(0)
        return newDice
    }

    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }

        if(tenzies) {
            setNoOfRoll(-1)
            setSec(0)
            setStart(false)
        }


        countRoll()

    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))

    const handleReset = ( ) => {
        setDice(allNewDice())
        setTenzies(false)
        setStart(false)
        setNoOfRoll(0)
        setSec(0)
    }

    const countRoll = () => {
        setNoOfRoll(prevRoll => prevRoll + 1)
    }

    React.useEffect(() => {
        countHeld()
    },[dice])


    
    return (
        <main>
            <div className="inner--body game--body">
                {tenzies && <Confetti />}
                <Link to="/" className="back" >X</Link>
                <button 
                    className="reset"
                    onClick={handleReset}
                >
                    <GrPowerReset />    
                </button>
                <div className="game--board">
                    <h1 className="title">Tenzies</h1>
                    <p className="instructions">Roll until all dice are the same. 
                    Click each die to freeze it at its current value between rolls.</p>
                    <div className="dice-container">
                        {diceElements}
                    </div>

                    <button 
                        className="roll-dice" 
                        onClick={rollDice}
                    >
                        {tenzies ? "New Game" : "Roll"}
                    </button>
                </div>
                <div className="game--watch" >
                    <span className="time"><BiTime />  {tenzies ? endSec : sec} Sec.</span>
                    <span className="held"><FaRegHandRock />{`${noOfHeld}/${dice.length}`}</span>
                    <span className="roll"><GiRollingDices /> {noOfRoll}</span>
                </div>
            </div>
        </main>
    )
}