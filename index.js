{
  "title": "Excel Basics",
  "content": "HTML/Markdown Content",
  "category": "Excel",
  "createdBy": "instructor_id"
}
{
  "lessonId": "abc123",
  "questions": [
    {
      "question": "What is a cell in Excel?",
      "options": ["Row", "Column", "Box", "Sheet"],
      "answer": "Box"
    }
  ]
}
{
  "userId": "123",
  "lessonId": "excel_basics",
  "score": 85,
  "certificateUrl": "https://...",
  "verifiedId": "random-uuid"
}
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("SkillSnap API Running!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
