import React from "react"
import Quiz from "./components/Quiz";
import Option from "./components/Option";
import useStore from "./store";
import useMediaQuery from 'react-use-media-query-hook'
import "./style.scss"
import style from './style.css'
import Styled from 'styled-components';


const quizPage = Styled.div`
    height: 95vh;
    z-index: 22222;
    display: flex;
    flex-direction: column;

    @media (max-width: 767px) {
      width: 80%
    }
`
export default function App() {
  const [start, setStart] = React.useState(false);
  const [finishQuiz, setFinishQuiz] = React.useState(false);
  const [data, setData] = React.useState(false)
  const [isLoading, setIsloading] = React.useState(true)
  const [isSorting, setIsSorting] = React.useState(true)
  const [showScore, setShowScore] = React.useState(false)


  // get the function to fetch data from the store
  const fetchData = useStore(state => state.fetchQuiz)
  // get that quiz that from the store and store it in a react for rerendering when tate is updated
  const quiz = useStore(state => state.quiz)
  const numberAnswered = useStore(state => state.numAnswer)
  const numCorrect = useStore(state => state.numCorrect)
  const restartQuiz = useStore(state => state.restartQuiz)
  const restartScoreAndAnswer = useStore(state => state.restartScoreAndAnswer)

  const isMobile = useMediaQuery('(max-width: 400px)');
  const isTablet = useMediaQuery('(min-width: 350px) and (max-width: 640px)');
  const isDesktop = useMediaQuery('(min-width: 641px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1025px)');

  
  
  //Call of fetch data on start of the quiz
  React.useEffect(() => {
    if(start){
      fetchData() 
      setIsSorting(false)  
    }
  }, [start])

  // get either the quiz has been loaded or not, if quiz length is more 0
  React.useEffect(() => {
    if(!isSorting && quiz.length) {
      setIsloading(false)
    }
  }, [isSorting, quiz, numCorrect])
  
  const restart = () => {      
    setIsloading(true)
    restartQuiz()
    setShowScore(false)
    restartScoreAndAnswer()
    setFinishQuiz(false)
    setStart(false)
  }



  const startQuiz = () => {
    setStart(true)
  }
  
  const updateSelect = useStore(state => state.updateSelect)
  const handleSelect = (option, id, questionId) => {
    setData(prevData => !prevData)
    updateSelect(option, id, questionId)
  }

  const processCheck = useStore(state => state.processCheck)
  const handleCheck = () => {
   const process = async () => {
    await processCheck()
    await setShowScore(true)
    setFinishQuiz(true)
   }
   process()
  }




  const quizElement = ( isLoading && quiz.length < 1? 
                    <h1>Loading . . .</h1> : quiz ? 
                    quiz.map((eachQuiz, i) => <Quiz key={i} isAnswered= {eachQuiz.isAnswered} selectedAnswer={eachQuiz.selectedAnswer} question={eachQuiz.question}>{eachQuiz.completeOption.map((opt, j) =>  {
                      return <Option 
                                key ={j} 
                                id = {j}
                                questionId={i} 
                                option={opt.opt} 
                                correct = {opt.correct} 
                                wrong = {opt.wrong}
                                showAnswer = {opt.showAnswer}
                                isSelected={opt.isSelected} 
                                handleSelect = {handleSelect}
                              />
                    }

                    )}</Quiz>) : console.log("is rending") );

  const ansCountElement = <h5 className="answer--indicator"> Number of questions answered {numberAnswered}/5</h5>

  const checkAnswerButton =  <button className="check--answer" onClick={!finishQuiz? handleCheck : restart}>{finishQuiz ? 'Play Again' :'Check answers'} </button>

  const scoreElement = <p>You score {numCorrect}/5 correct answer</p>

// console.log(quiz, "last-rendering")

  return (
    <main>
      <div className="top--blob"></div>
      <div className="bottom--blob"></div>

      { !start &&
        <div className="home">
            {isTablet && <div className="mb-action--board">
              <h1> Quizzical</h1>
              <p>Some description if needed</p>
              <button
                onClick={startQuiz}
              >Start quiz</button>
            </div>}

            {isDesktop && <div className="action--board">
              <h1>mb Quizzical</h1>
              <p>Some description if needed</p>
              <button
                onClick={startQuiz}
              >Start quiz</button>
            </div>}
        </div>
      }

      { isTablet && <div className="quiz--page">
        {!isLoading && start && ansCountElement}
        {start && quizElement}

        <div className="quiz-action">
        {showScore &&  scoreElement}
        {!isLoading && start && numberAnswered === 5 && checkAnswerButton}
        </div>
      </div>}

      { isDesktop && <div className="quiz--page">
        {!isLoading && start && ansCountElement}
        {start && quizElement}

        <div className="quiz-action">
        {showScore &&  scoreElement}
        {!isLoading && start && numberAnswered === 5 && checkAnswerButton}
        </div>
      </div>}

    </main>
  )
}