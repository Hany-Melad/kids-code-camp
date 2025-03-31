
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, X, Award } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

// Mock data for a quiz
const quizData = {
  id: 1,
  title: "Python Basics Quiz",
  courseTitle: "Python for Beginners",
  questions: [
    {
      id: 1,
      question: "What symbol is used for comments in Python?",
      options: ["//", "/* */", "#", "<!--"],
      correctAnswer: 2 // index of the correct answer
    },
    {
      id: 2,
      question: "Which of these is NOT a Python data type?",
      options: ["Integer", "Float", "Character", "Boolean"],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "How do you create a variable in Python?",
      options: [
        "var name = value", 
        "name := value", 
        "name = value", 
        "set name = value"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      question: "What does the len() function do in Python?",
      options: [
        "Returns the smallest item in a list", 
        "Returns the length of an object", 
        "Rounds a number to the nearest integer", 
        "Converts a string to lowercase"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "How do you write a 'for' loop in Python?",
      options: [
        "for (i = 0; i < 5; i++)", 
        "for i = 1 to 5", 
        "for i in range(5)", 
        "foreach (i in range(5))"
      ],
      correctAnswer: 2
    }
  ]
};

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizData.questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  // In a real app, you would fetch quiz data based on the ID
  // For this example we'll use the mock data

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption === null) {
      setSelectedOption(optionIndex);
      
      // Check if answer is correct
      const correct = optionIndex === quizData.questions[currentQuestion].correctAnswer;
      setIsCorrect(correct);
      
      // Update answers
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = optionIndex;
      setAnswers(newAnswers);
      
      // Update score
      if (correct) {
        setScore(prevScore => prevScore + 1);
      }
      
      // Auto advance after a delay
      setTimeout(() => {
        if (currentQuestion < quizData.questions.length - 1) {
          setCurrentQuestion(prevQuestion => prevQuestion + 1);
          setSelectedOption(null);
        } else {
          setShowResults(true);
        }
      }, 1500);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const renderQuestion = () => {
    const question = quizData.questions[currentQuestion];
    
    return (
      <div className="p-4">
        <div className="mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </span>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
            />
          </div>
        </div>
        
        <h2 className="text-xl font-bold mt-4 mb-6">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedOption === null
                  ? "hover:border-blue-500"
                  : selectedOption === index
                    ? (index === question.correctAnswer 
                        ? "bg-green-100 border-green-500" 
                        : "bg-red-100 border-red-500")
                    : index === question.correctAnswer && selectedOption !== null
                      ? "bg-green-100 border-green-500"
                      : ""
              }`}
              onClick={() => handleOptionSelect(index)}
              disabled={selectedOption !== null}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedOption !== null && index === question.correctAnswer && (
                  <Check size={20} className="text-green-500" />
                )}
                {selectedOption === index && index !== question.correctAnswer && (
                  <X size={20} className="text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>
        
        {selectedOption !== null && (
          <div className={`mt-6 p-4 rounded-lg ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
            <p className={`font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
              {isCorrect ? "Correct!" : "Incorrect"} 
            </p>
            {!isCorrect && (
              <p className="text-sm mt-1">
                The correct answer is: {quizData.questions[currentQuestion].options[quizData.questions[currentQuestion].correctAnswer]}
              </p>
            )}
          </div>
        )}
        
        {selectedOption !== null && currentQuestion < quizData.questions.length - 1 && (
          <button
            className="mt-6 w-full bg-blue-500 text-white rounded-lg py-3 font-medium"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        )}
        
        {selectedOption !== null && currentQuestion === quizData.questions.length - 1 && (
          <button
            className="mt-6 w-full bg-green-500 text-white rounded-lg py-3 font-medium"
            onClick={() => setShowResults(true)}
          >
            See Results
          </button>
        )}
      </div>
    );
  };

  const renderResults = () => {
    const finalScore = Math.round((score / quizData.questions.length) * 100);
    
    return (
      <div className="p-4">
        <div className="bg-white rounded-xl p-6 text-center border shadow">
          <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <Award size={48} className="text-blue-500" />
          </div>
          
          <h2 className="text-2xl font-bold mt-6">Quiz Completed!</h2>
          <p className="text-gray-500 mt-2">Your score</p>
          
          <div className="text-5xl font-bold text-blue-500 mt-4">
            {finalScore}%
          </div>
          <p className="text-gray-500 mt-2">
            You answered {score} out of {quizData.questions.length} questions correctly
          </p>
          
          <div className="mt-8 space-y-3">
            <Link 
              to="/"
              className="block w-full bg-blue-500 text-white rounded-lg py-3 font-medium"
            >
              Return to Dashboard
            </Link>
            
            <Link 
              to={`/course/${id}`}
              className="block w-full bg-white border border-blue-500 text-blue-500 rounded-lg py-3 font-medium"
            >
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex items-center">
        <Link to="/quizzes" className="text-gray-500 mr-2">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">{quizData.title}</h1>
      </header>

      {showResults ? renderResults() : renderQuestion()}

      <BottomNav />
    </div>
  );
};

export default QuizPage;
