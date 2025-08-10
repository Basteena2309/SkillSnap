import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function QuizForm({ lessonId, questions, userId }) {
  const handleSubmit = async (answers) => {
    let score = 0;
    questions.forEach((q, i) => {
      if (q.correct === answers[i]) score++;
    });

    const passed = score >= questions.length * 0.7;

    await addDoc(collection(db, "quizAttempts"), {
      userId,
      lessonId,
      score,
      passed,
      timestamp: serverTimestamp()
    });

    if (passed) {
      await addDoc(collection(db, "certificates"), {
        userId,
        lessonId,
        issuedAt: serverTimestamp()
      });
    }

    alert(`You scored ${score}/${questions.length} - ${passed ? "Passed" : "Failed"}`);
  };

  return <button onClick={() => handleSubmit(userAnswers)}>Submit Quiz</button>;
}
