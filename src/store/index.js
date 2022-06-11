import create from 'zustand';
import axios from 'axios';
import sortQuizData from '../lib/sort-quiz';
import  {devtools} from  'zustand/middleware'

const useStore = create((set) => ({
    quiz : [],
    fetchQuiz: async () => {
        const fetchRes =  await axios.get('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple').then(res => res.data)

        const sortQuiz = await sortQuizData(fetchRes.results)
        console.log(sortQuiz)
        set((state) => {
           return {quiz: sortQuiz}
        })
    },

    restartQuiz: () => {
        set(state => ({quiz: []})) 
    }, 

    updateSelect: (option, id, questionId) => {
        // console.log(option, id, questionId)
        // update the store after answer has been selected
        set((state) => {
            // init the previous state
            const updateQuiz = state.quiz
            // set the the selected answer to true
            updateQuiz[questionId].completeOption[id] = {
                isSelected: !updateQuiz[questionId].completeOption[id].isSelected,
                opt: option,
                correct: false,
                wrong: false
            }
            // set other option that are not selected tofalse
            updateQuiz[questionId].completeOption.map((option, i) => {              
                if(i !== id) {
                    return updateQuiz[questionId].completeOption[i].isSelected = false
                }
            })
            // get the answer selected and init with the selected answer
            updateQuiz[questionId].selectedAnswer = option

            // set isAnswered to true, to tell if the question is answered or not
            updateQuiz[questionId].isAnswered = (!(updateQuiz[questionId].completeOption.map((option, i) => {
                return updateQuiz[questionId].completeOption[i].isSelected
            } )).every((ans) => ans === false ))

            // Check no of question answer
            const newNumAnswer =(updateQuiz.filter(quiz => quiz.isAnswered === true)).length
            set((state) => ({numAnswer: newNumAnswer}))


            console.log(updateQuiz)
            return {quiz: updateQuiz}
        })
    },

    processCheck: () => {
        set((state) => {
           const  processedCheck = state.quiz

           console.log(processedCheck)
        
           processedCheck.map((question, i) => {
               question.completeOption.map((option) => {
                   if(option.isSelected) {
                       if(question.answer === option.opt) {
                        //    option.wrong = false
                           return option.correct = true
                       } else {
                        //    option.correct = false
                           return option.wrong = true
                       }
                   }

                   if(option.hasOwnProperty('showAnswer')) {
                        console.log('yes')
                        return option.showAnswer  = true;
                   }



               })
           })
        //    check number of option that has option.correct(correct) and that whis is incorrect
        let correct = 0;
        let wrong = 0;
           processedCheck.map((question) => {
            question.completeOption.map((option) => {
                    if(option.correct) {
                        correct++
                        // console.log(correct, "correct")

                    } 
                    if(option.wrong) {
                        wrong++
                        // console.log(wrong, "wrong")

                    } 


                    set((state) => ({numCorrect: correct}))
                    set((state) => ({numWrong: wrong}))
                    return option.correct
                    
                })
           })


           return {quiz: processedCheck}
        })
    },

    numAnswer : 0,
    numCorrect: 0,
    numWrong: 0,

    restartScoreAndAnswer: () => {
        set(state => ({numAnswer : 0, numCorrect: 0}))
    }

}))

export default useStore