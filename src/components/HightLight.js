import React from 'react'
import { Link } from "react-router-dom"

export default function Hightlight () {
    const [highlight, setHighlight] = React.useState(JSON.parse(localStorage.getItem("highlight")) || []);

    const hightlightElememt = highlight.map((high, i) => (
                                                        <tr key={i}>
                                                            <td>{`${high.FinishTime} Sec`}</td>
                                                            <td>{`${high.Roll} Roll`}</td>
                                                        </tr>
                                                    ))
    
    return (
        <main>
            <div className='inner--body highlight--body'>
            <Link to="/" className="back" >X</Link>
            <h2 className='highlight--head'>HIGHLIGHT</h2>
                <div className='hightlight--board'>
                    <table>
                        {hightlightElememt}
                    </table>
                </div>
            </div>
        </main>
    )
}