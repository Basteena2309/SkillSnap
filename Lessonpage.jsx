import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/lessons', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLessons(res.data.data);
    };
    fetchLessons();
  }, []);

  return (
    <div>
      <h2>Lessons</h2>
      {lessons.map(lesson => (
        <div key={lesson.id}>
          <h3>{lesson.title}</h3>
          <button onClick={() => navigate(`/quiz/${lesson.id}`)}>Take Quiz</button>
        </div>
      ))}
    </div>
  );
};

export default LessonsPage;
