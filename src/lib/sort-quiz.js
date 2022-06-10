import randomArrayShuffle from "./array-suffle";

const sortQuizData = async (data) => {
    try {
      let sortQuiz = await data.map(dat => {
        let question = dat.question;
        let options = [...dat.incorrect_answers, dat.correct_answer ];
        let sufOptions = randomArrayShuffle(options)
        let completeOption = sufOptions.map(opt => {
          if(dat.correct_answer == opt){
            return {
              isSelected : false,
              showAnswer: false,
              opt
            }
          }

          return {
            isSelected : false,
            opt
          }
        })
        let answer = dat.correct_answer;
        let quiz = {
          question,
          isAnswered: false,
          selectedAnswer : "", 
          completeOption,
          answer,
        }
        return quiz
      })
    //   console.log(sortQuiz)
      return sortQuiz;
    } catch(err) {
      console.error(err)
    }
  }

  export default sortQuizData