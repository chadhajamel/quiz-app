<template>
    <div class="quiz-container">
      <h1>{{ quizData.quiz.title }}</h1>
      
      <div v-if="!isQuizComplete" class="question-container">
        <h2>Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</h2>
        <div class="question">
          {{ currentQuestion.question }}
        </div>
        
        <div class="choices">
          <button
            v-for="(choice, index) in currentQuestion.choices"
            :key="index"
            @click="selectAnswer(choice)"
            :class="{ selected: selectedAnswer === choice }"
            :disabled="answerSubmitted"
          >
            {{ choice }}
          </button>
        </div>
  
        <button 
          @click="submitAnswer" 
          :disabled="!selectedAnswer || answerSubmitted"
          class="submit-btn"
        >
          Submit Answer
        </button>
        <div v-if="answerSubmitted" class="feedback">
          <button @click="nextQuestion" class="next-btn feedback">Next Question</button>
        </div>
      </div>
  
      <div v-else class="results">
      <h2>Quiz Complete!</h2>
      <div class="personality-result">
        <h3>Your Dominant Color: {{ dominantColor }}</h3>
        <p class="color-description">{{ colorDescription }}</p>
      </div>
      <div class="color-scores">
        <h4>Your Color Profile:</h4>
        <div v-for="(score, color) in colorScores" :key="color" class="color-score">
          <span>{{ color }}:</span>
          <div class="score-bar" :style="{ width: `${(score/questions.length) * 100}%`, backgroundColor: getColorCode(color) }">
            {{ score }}
          </div>
        </div>
      </div>
      <button @click="restartQuiz" class="restart-btn">Take Quiz Again</button>
    </div>
  </div>
  </template>
  
  <script setup>
 import {ref, computed} from 'vue';
 import quizData from '../assets/data/quizData.json';
 const questions = ref(quizData.quiz.questions);
 const currentQuestionIndex = ref(0);
 const selectedAnswer = ref('');
 const answerSubmitted = ref(false);
 const isCorrect = ref(false);
 const score = ref(0);
 const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const isQuizComplete = computed(() => currentQuestionIndex.value >= questions.value.length);
   const selectAnswer = (choice) => {
    if (!answerSubmitted.value) {
      selectedAnswer.value = choice;
    }
   };

 const colorScores = ref({Blue: 0,Yellow: 0,Red: 0,Green: 0});
 const submitAnswer = () => {
      answerSubmitted.value = true;
      isCorrect.value = selectedAnswer.value === currentQuestion.value.correctAnswer;
      if (isCorrect.value) {
        score.value++;
        // Increment color score based on current question's color type
        colorScores.value[currentQuestion.value.colorType]++;
      
      }else{
      console.log('wrong answer');
      }
    };
 const nextQuestion=()=>{
    currentQuestionIndex.value++;
    selectedAnswer.value='';
    answerSubmitted.value=false;
 }

 const dominantColor = computed(() => {
      return Object.entries(colorScores.value).reduce((a, b) => 
        b[1] > a[1] ? b : a)[0];
    });
  
    const colorDescription = computed(() => {
      return quizData.quiz.colorProfiles[dominantColor.value];
    });
     const getColorCode = (color) => {
      const colors = {
        Blue: '#4169E1',
        Yellow: '#FFD700',
        Red: '#FF6B6B',
        Green: '#98FB98'
      };
      return colors[color];
    };

    const restartQuiz = () => {
      currentQuestionIndex.value = 0;
      selectedAnswer.value = '';
      answerSubmitted.value = false;
      score.value = 0;
      Object.keys(colorScores.value).forEach(color => {
        colorScores.value[color] = 0;
      });
    };
    
     </script>
  
  <style scoped>
  .quiz-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .question-container {
    margin: 20px 0;
  }
  
  .choices {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0;
  }
  
  button {
    padding: 10px 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  button:hover {
    background: #f0f0f0;
  }
  
  button.selected {
    background: #e0e0e0;
  }
  
  .feedback {
    margin: 20px 0;
    padding: 10px;
    border-radius: 4px;
  }
  
  .correct {
    color: green;
  }
  
  .incorrect {
    color: red;
  }
  
  .submit-btn, .next-btn, .restart-btn {
    background: #4CAF50;
    color: white;
    border: none;
  }
  
  .submit-btn:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
  </style>