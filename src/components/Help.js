import React from "react"
import { Link } from "react-router-dom"

export default function Help () {

    return (
        <main>
            <div className="inner--body">
            <Link to="/" className="back" >X</Link>

                <div className="help--board">
                    <h2>HELP</h2>
                    <h4>To Play</h4>
                    <p>Click on play-game</p>
                    <p>:    From the dice, select the dice that appear most on the dice .And to continue click on the roll button, which roll the dice unselected then You continue to pick the-same number until all the dice are holding the same number</p>
                </div>
            </div>
        </main>
    )
}