import React, { useState, useEffect } from 'react';
import { questions } from '../../assets/question';
import personalityData from '../../assets/myers_briggs_personalities.json'; // Import the JSON file
import './quiz.css';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(questions[index]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [nextVal, setNextVal] = useState(0);
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (code.length > 0) {
      console.log("Updated code:", code);
    }
  }, [code]);

  const handleChoice = (optionCode) => {
    setSelectedOption(optionCode);
    setNextVal(1);
  };

  const handleNext = () => {
    if (nextVal === 1) {
      setCode(prevCode => prevCode + selectedOption);

      if (index < questions.length - 1) {
        setIndex(index + 1);
        setQuestion(questions[index + 1]);
        setSelectedOption(null);
        setNextVal(0);
      } else {
        const matchedPersonality = personalityData.find(personality => personality.type === code + selectedOption);
        setResult(matchedPersonality);
      }
    } else {
      alert("Please select an option to proceed.");
    }
  };

  return (
    <div className='container'>
      <h1>MBTI Test</h1>
      <p>The Myers-Briggs Type Indicator (MBTI) test is a personality assessment tool based on Carl Jung's theory of psychological types. It categorizes individuals into 16 distinct personality types based on preferences in four dichotomies: Extraversion vs. Introversion, Sensing vs. Intuition, Thinking vs. Feeling, and Judging vs. Perceiving. By identifying these preferences, the MBTI helps individuals understand their behavior, decision-making styles, and interactions with others, enhancing personal growth and improving communication.</p>
      <hr />
      {result ? (
    <div className="result-card">
        <h2>Your Personality Type: {result.type} - {result.title}</h2>
        <p>{result.description}</p>
        <h3>Characteristics:</h3>
        <ul>
            {result.characteristics.map((char, index) => (
                <li key={index}>{char}</li>
            ))}
        </ul>
        <h3>Strengths:</h3>
        <ul>
            {result.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
            ))}
        </ul>
        <h3>Weaknesses:</h3>
        <ul>
            {result.weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
            ))}
        </ul>
        <div className="button-container">
            <button className="result-button" onClick={() => window.location.reload()}>
                Retake the Test
            </button>
        </div>
    </div>
) : (
    <>
        <h2>{index + 1}. {question.question}</h2>
        <ul>
            <li
                className={selectedOption === question.opt1.clk ? 'selected' : ''}
                onClick={() => handleChoice(question.opt1.clk)}
            >
                <div className="option-heading">{question.opt1.heading}</div>
                <div className="option-description">{question.opt1.description}</div>
            </li>
            <li
                className={selectedOption === question.opt2.clk ? 'selected' : ''}
                onClick={() => handleChoice(question.opt2.clk)}
            >
                <div className="option-heading">{question.opt2.heading}</div>
                <div className="option-description">{question.opt2.description}</div>
            </li>
        </ul>
        <button className="submit" onClick={handleNext}>
            {index >= questions.length - 1 ? 'Submit' : 'Next'}
        </button>
        <div className="index">{index + 1} of {questions.length} questions</div>
    </>
)}

    </div>
  );
}

export default Quiz;
