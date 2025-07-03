import React, { useState } from 'react';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [showAnswers, setShowAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const startQuiz = async () => {
    setLoading(true);
    setQuizStarted(true);
    setShowAnswers({});
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/quiz/generate-quiz`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      setQuizData(data);
    } catch (err) {
      alert('Failed to load quiz. Try again.');
    }
    setLoading(false);
  };

  const toggleAnswer = (index) => {
    setShowAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const resetQuiz = () => {
    setQuizData([]);
    setShowAnswers({});
    setQuizStarted(false);
  };

  return (
    <div className="min-h-screen bg-black text-green-300 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-400 drop-shadow">
        📋 AI-Generated Quiz
      </h1>

      {!quizStarted ? (
        <div className="flex justify-center">
          <button
            onClick={startQuiz}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md"
          >
            ▶️ Start Quiz
          </button>
        </div>
      ) : loading ? (
        <p className="text-center text-green-500">⏳ Generating quiz...</p>
      ) : quizData.length === 0 ? (
        <p className="text-center text-red-400">No quiz generated. Try again later.</p>
      ) : (
        <div className="space-y-6">
          {quizData.map((q, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-green-600 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold mb-2">
                {index + 1}. {q.question}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm ml-4">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              {showAnswers[index] ? (
                <p className="mt-2 text-green-400">
                  ✅ <span className="font-semibold">Answer:</span> {q.answer}
                </p>
              ) : null}
              <button
                onClick={() => toggleAnswer(index)}
                className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded text-sm"
              >
                {showAnswers[index] ? '🙈 Hide Answer' : '👀 View Answer'}
              </button>
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button
              onClick={resetQuiz}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold shadow-md"
            >
              🔄 Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
