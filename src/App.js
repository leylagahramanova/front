import React from 'react';
import './App.css';
import sad from './sad.png';
import smile from './smile.png';
import think from './think.png';
import Button from '@mui/material/Button';

const questions = [
  {
    title: 'What class does all components inherit from?',
    variants: ['ComponentReact', 'ReactComponent', 'ReactJS.Component', 'Component', 'React.Component'],
    correct: 4,
  },
  {
    title: 'Where can I embed ready-made code from the render() method?',
    variants: ['Only in div', 'Only to a tag that has an id', 'In a div or in a span', 'To any tag'],
    correct: 3,
  },
  {
    title: 'What is Full Stack development?',
    variants: ['Presentation layer', 'Business logic layer', 'Database layer', 'None of them'],
    correct: [1, 2, 3],
  },
  {
    title: 'How many parent HTML tags can be rendered in a React JS component?',
    variants: ['No more than 3', 'No more than 5', 'No more than 10', 'Unlimited amount', 'Always 1'],
    correct: 4,
  },
];

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Result({ correct }) {
  const percentage = Math.round((correct / questions.length) * 100);
  let resultImage;
  if (percentage < 50) {
    resultImage = <img src={sad} alt='Sad' />;
  } else if (percentage === 50) {
    resultImage = <img src={think} alt='Think' />;
  } else {
    resultImage = <img src={smile} alt='Smile' />;
  }

  return (
    <div className='result'>
      <div className='picture'>{resultImage}</div>
      <h2>You guessed {correct} answers out of {questions.length}</h2>
      <a href='/'>
        <button>Try again</button>
      </a>
    </div>
  );
}

function Game({ step, question, onClickVariant, selectedAnswers }) {
  const percentage = Math.round((step / questions.length) * 100);

  return (
    <div>
      <div className='progress'>
        <div style={{ width: `${percentage}%` }}></div>
        <h1>{question.title}</h1>
        <ul>
          {question.variants.map((text, index) => (
            <li onClick={() => onClickVariant(index)} key={text}>
              <input
                type={question.correct.length > 1 ? 'checkbox' : 'radio'}
                checked={selectedAnswers.includes(index)}
                onChange={() => {}}
              />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);

  // Shuffle the questions array when the component mounts
  const shuffledQuestions = React.useMemo(() => shuffleArray(questions), []);
  const question = shuffledQuestions[step]; // Access the original questions array using the step index

  const onClickVariant = (index) => {
    let updatedAnswers = [...selectedAnswers];
    if (question.correct.length > 1) {
      if (updatedAnswers.includes(index)) {
        updatedAnswers = updatedAnswers.filter((answerIndex) => answerIndex !== index);
      } else {
        updatedAnswers.push(index);
      }
    } else {
      updatedAnswers = [index];
    }
    setSelectedAnswers(updatedAnswers);
  };

  const onNext = () => {
    if (selectedAnswers.length > 0) {
      setStep(step + 1);
      if (question.correct.length > 1) {
        const isCorrect = selectedAnswers.every((answerIndex) => question.correct.includes(answerIndex));
        if (isCorrect) {
          setCorrect(correct + 1);
        }
      } else {
        if (selectedAnswers[0] === question.correct) {
          setCorrect(correct + 1);
        }
      }
      setSelectedAnswers([]);
    }
  };

  return (
    <div className='App'>
      {step !== questions.length ? (
        <>
          <Game
            step={step}
            question={question}
            onClickVariant={onClickVariant}
            selectedAnswers={selectedAnswers}
          />
          <Button variant='outlined' onClick={onNext} disabled={selectedAnswers.length === 0}>
            Next
          </Button>
        </>
      ) : (
        <Result correct={correct} />
      )}
    </div>
  );
}

export default App;
