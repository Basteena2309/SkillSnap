import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const QuizPage = () => {
  const { lessonId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/api/quiz/${lessonId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuiz(res.data.data);
    };
    fetchQuiz();
  }, [lessonId]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      'http://localhost:3000/api/quiz/submit',
      { lessonId, answers },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert(`You scored: ${res.data.score}`);
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h2>Quiz for: {quiz.lessonTitle}</h2>
      {quiz.questions.map((q, idx) => (
        <div key={idx}>
          <p>{q.question}</p>
          {q.options.map((opt, i) => (
            <label key={i}>
              <input
                type="radio"
                name={q.question}
                value={opt}
                onChange={() =>
                  setAnswers({ ...answers, [q.question]: opt })
                }
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default QuizPage;
