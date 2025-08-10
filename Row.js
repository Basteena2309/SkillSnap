import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const submitQuiz = httpsCallable(functions, 'submitQuiz');

const handleSubmit = async () => {
  const result = await submitQuiz({
    userId: currentUser.uid,
    lessonId: "lessonId123",
    answers: ["Box", "Column"] // user answers
  });

  console.log(result.data); // { score: X, passed: true/false }
};
