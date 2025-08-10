const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.submitQuiz = functions.https.onCall(async (data, context) => {
  const { userId, lessonId, answers } = data;

  const quizDoc = await admin.firestore().collection("quizzes").doc(lessonId).get();
  const quiz = quizDoc.data();
  const questions = quiz.questions;

  let score = 0;
  questions.forEach((q, index) => {
    if (q.correct === answers[index]) score++;
  });

  const passed = score >= (questions.length * 0.7);

  await admin.firestore().collection("quizAttempts").add({
    userId,
    lessonId,
    score,
    passed,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });

  if (passed) {
    const certId = admin.firestore().collection("certificates").doc().id;
    await admin.firestore().collection("certificates").doc(certId).set({
      userId,
      lessonId,
      issuedAt: admin.firestore.FieldValue.serverTimestamp(),
      certificateUrl: `https://your-cert-storage/${certId}.pdf`
    });
  }

  return { score, passed };
});
