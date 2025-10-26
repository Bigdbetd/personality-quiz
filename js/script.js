console.log("script.js connected!");
console.log("script.js connected!");

// store answers: { q1: "lion", q2: "turtle", q3: "bird" }
const answers = {};

// select blocks and buttons
const questionBlocks = document.querySelectorAll(".question-block");
const showResultBtn = document.getElementById("show-result");
const resetBtn = document.getElementById("reset-btn");
const resultContainer = document.getElementById("result-container");
const resultTextEl = document.getElementById("result-text");

// wire up selection behavior
questionBlocks.forEach((block, idx) => {
  const buttons = block.querySelectorAll(".answer-btn");
  const key = `q${idx + 1}`;

  buttons.forEach(btn => {
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => {
      // clear selected in this question
      buttons.forEach(b => {
        b.classList.remove("selected");
        b.setAttribute("aria-pressed", "false");
      });
      // mark clicked
      btn.classList.add("selected");
      btn.setAttribute("aria-pressed", "true");
      // save answer
      answers[key] = btn.dataset.answer;
    });
  });
});

// show results: require all answered, then choose most frequent answer
showResultBtn.addEventListener("click", () => {
  if (Object.keys(answers).length < questionBlocks.length) {
    alert("Please answer all questions before viewing results.");
    return;
  }

  // tally answers
  const tally = {};
  Object.values(answers).forEach(a => tally[a] = (tally[a] || 0) + 1);

  // pick top answer (most frequent)
  let top = null;
  let topCount = 0;
  for (const [k, v] of Object.entries(tally)) {
    if (v > topCount) { top = k; topCount = v; }
  }

  // map top to result string (at least two outcomes possible: lion/turtle/bird)
  const messages = {
    lion: "You are a 🦁 Lion! Bold and a natural leader.",
    turtle: "You are a 🐢 Turtle! Calm and thoughtful.",
    bird: "You are a 🐦 Bird! Social and adaptable."
  };

  resultTextEl.textContent = messages[top] || "You're a unique mix!";
  resultContainer.style.display = "block";
});

// reset: clear selections, answers, and hide result
resetBtn.addEventListener("click", () => {
  // clear recorded answers
  for (const k in answers) delete answers[k];

  // clear UI selections
  document.querySelectorAll(".answer-btn").forEach(b => {
    b.classList.remove("selected");
    b.setAttribute("aria-pressed", "false");
  });

  // hide result
  resultTextEl.textContent = "";
  resultContainer.style.display = "none";
});
