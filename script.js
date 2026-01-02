// ---------------- DOM REFERENCES ----------------
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// ---------------- SESSION STORAGE INIT ----------------
if (!sessionStorage.getItem("progress")) {
  sessionStorage.setItem("progress", JSON.stringify({}));
}

let userAnswers = JSON.parse(sessionStorage.getItem("progress"));

// ---------------- RENDER QUESTIONS ----------------
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const wrapper = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = q.question;
    wrapper.appendChild(p);

    for (let j = 0; j < q.choices.length; j++) {
      const choice = q.choices[j];

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      if (userAnswers[i] === choice) {
        radio.checked = true;
      }

      radio.addEventListener("change", function () {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));

      wrapper.appendChild(label);
      wrapper.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(wrapper);
  }
}

// ---------------- SUBMIT QUIZ ----------------
submitBtn.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  const text = `Your score is ${score} out of 5.`;
  scoreDiv.textContent = text;

  localStorage.setItem("score", score);
});

// ---------------- LOAD PREVIOUS SCORE ----------------
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

// ---------------- INITIAL RENDER ----------------
renderQuestions();
