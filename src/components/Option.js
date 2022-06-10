import React from "react";

export default function Option (props) {
    const {
        id,
        option, 
        questionId,
        correct,
        wrong,
        showAnswer,
        isSelected, 
        handleSelect, 
    } = props
    let selectedStyle = isSelected ? {
        backgroundColor: "#D6DBF5",
        border: "1px solid #D6DBF5"
    } : {outLine : "none"}

     selectedStyle = correct ? {
        backgroundColor: "#8ccb85",
        border: "1px solid #8ccb85"
    } : selectedStyle

    selectedStyle = wrong ? {
        backgroundColor: "#cb9d85",
        border: "1px solid #cb9d85"
    } : selectedStyle
    return(
        <span 
            className="option"
            style={selectedStyle} 
            onClick={() =>handleSelect(option, id, questionId)}
        >{option}</span>
    )
}