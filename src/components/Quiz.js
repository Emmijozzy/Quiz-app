import React from "react"

export default function Quiz ({children, question}) {
    return(
        <div className="quiz--board">
            <h3 className="question" >{question}</h3>
            <div className="answers">
                {children}
            </div>
            <hr />
        </div>
    )
}