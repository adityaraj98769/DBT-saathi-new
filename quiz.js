const quizData = [
  {
    question: "What is the difference between Aadhaar linked and DBT seeded?",
    options: [
      "Both mean the same",
      "Linked means bank has Aadhaar, Seeded means NPCI mapped",
      "Seeded means bank stores Aadhaar only",
      "None of the above"
    ],
    answer: 1
  },
  {
    question: "If DBT is not received even though Aadhaar is linked, what is likely the issue?",
    options: [
      "Bank server is slow",
      "NPCI mapping is inactive or mapped to another bank",
      "Aadhaar card is invalid",
      "Scholarship scheme ended"
    ],
    answer: 1
  },
  {
    question: "How many bank accounts can be DBT seeded at once?",
    options: [
      "Unlimited",
      "Maximum 5",
      "Only one active account",
      "Depends on UIDAI"
    ],
    answer: 2
  },
  {
    question: "Which of these is a safe practice?",
    options: [
      "Sharing OTP with bank staff",
      "Clicking on random Aadhaar links",
      "Checking seeding via official NPCI/Bank channels",
      "Giving Aadhaar number on WhatsApp groups"
    ],
    answer: 2
  },
  {
    question: "Who manages Aadhaar to bank account mapping for DBT?",
    options: ["UIDAI", "NPCI", "RBI", "Ministry of Finance"],
    answer: 1
  },
  {
    question: "What happens if you close your DBT seeded bank account?",
    options: [
      "DBT will automatically shift to another bank",
      "DBT transfers will fail until reseeding",
      "DBT continues without interruption",
      "Aadhaar will be blocked"
    ],
    answer: 1
  },
  {
    question: "How can you confirm if Aadhaar is seeded with NPCI?",
    options: [
      "Ask any shopkeeper",
      "Check with UIDAI toll-free",
      "Use bank’s Aadhaar seeding checker or NPCI service",
      "See SMS from a random number"
    ],
    answer: 2
  },
  {
    question: "What is a common reason for scholarship DBT failure?",
    options: [
      "Aadhaar card expired",
      "Aadhaar linked but not seeded",
      "College did not submit marks",
      "Bank refused DBT"
    ],
    answer: 1
  },
  {
    question: "How long does Aadhaar seeding usually take?",
    options: [
      "1 hour",
      "24–48 hours, sometimes up to 7 days",
      "30 days minimum",
      "Instant always"
    ],
    answer: 1
  },
  {
    question: "Which is a sign of phishing fraud?",
    options: [
      "SMS from UIDAI official number",
      "NPCI portal showing Aadhaar mapper status",
      "Random link asking Aadhaar+OTP",
      "Bank branch giving DBT slip"
    ],
    answer: 2
  },
  {
    question: "DBT stands for?",
    options: [
      "Direct Bank Transfer",
      "Direct Benefit Transfer",
      "Database Transfer",
      "Digital Banking Transaction"
    ],
    answer: 1
  },
  {
    question: "If Aadhaar is seeded in two banks, which one gets DBT?",
    options: [
      "Both banks equally",
      "The first bank always",
      "Only the most recently seeded bank (NPCI active mapping)",
      "It depends on UIDAI"
    ],
    answer: 2
  }
];

let currentQuestion = 0, score = 0, studentName = "";

function startQuiz() {
  studentName = document.getElementById("studentName").value;
  if (!studentName) {
    alert("Please enter your name!");
    return;
  }

  // hide popup, show quiz
  document.getElementById("popup").classList.add("hidden");
  document.getElementById("quizBox").classList.remove("hidden");

  loadQuestion();
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").innerText = q.question;

  let opts = "";
  q.options.forEach((opt, i) => {
    opts += `<div class='option'>
               <label><input type='radio' name='answer' value='${i}'> ${opt}</label>
             </div>`;
  });
  document.getElementById("options").innerHTML = opts;
}

function nextQuestion() {
  const ans = document.querySelector("input[name='answer']:checked");
  if (!ans) {
    alert("Please select an option");
    return;
  }

  if (parseInt(ans.value) === quizData[currentQuestion].answer) score++;
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quizBox").classList.add("hidden");
  document.getElementById("resultBox").classList.remove("hidden");

  document.getElementById("score").innerText =
    `${studentName}, You scored ${score}/${quizData.length}`;

  let badgeText = "";
  if (score === quizData.length) badgeText = "🥇 Gold Badge - Excellent!";
  else if (score >= quizData.length * 0.6) badgeText = "🥈 Silver Badge - Good Job!";
  else badgeText = "🥉 Bronze Badge - Keep Learning!";

  document.getElementById("badge").innerHTML =
    `<p class="badge">${badgeText}</p>`;
}

function downloadCertificate() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Certificate of Achievement", 50, 40);

  doc.setFontSize(16);
  doc.text("This is to certify that", 70, 60);

  doc.setFont("helvetica", "bold");
  doc.text(studentName, 85, 75);

  doc.setFont("helvetica", "normal");
  doc.text(
    `has successfully completed the DBT Awareness Quiz`,
    40,
    90
  );
  doc.text(`with a score of ${score}/${quizData.length}.`, 70, 105);

  doc.text("Awarded on: " + new Date().toLocaleDateString(), 60, 125);

  doc.save(`${studentName}_Certificate.pdf`);
}
