import React from "react"
// import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import "./style.css"

export default function App() {

  return (
    <main>
      <div className="inner--body">
        <div className="game--nav">
          <Link className="link" style={{fontSize: "3.5rem"}} to="/game">PLAY GAME</Link>
          <Link className="link" style={{fontWeight: "800"}} to="/highlight">HIGHLIGHT</Link>
          <Link className="link" to="/help">HELP</Link>
        </div>
        <h3>This game is best played on landscape orientation</h3>
      </div>
    </main>
  )
}