function App() {
  const { QUESTIONS, getResultText, getResultDescription } = window.QUIZ_DATA;
  const total = QUESTIONS.length;
  const ORC_IMAGES = [
    "images/orcs/beard.png",
    "images/orcs/butch.png",
    "images/orcs/fat.png",
    "images/orcs/glasses.png",
    "images/orcs/phones.png",
    "images/orcs/pockets.png",
    "images/orcs/short.png",
    "images/orcs/tall.png"
  ];

  const [stage, setStage] = React.useState("start");
  const [current, setCurrent] = React.useState(0);
  const [answers, setAnswers] = React.useState(Array(total).fill(null));
  const [resultImage, setResultImage] = React.useState(ORC_IMAGES[0]);
  const [resultDescription, setResultDescription] = React.useState("");

  const isQuiz = stage === "quiz";
  const currentQuestion = QUESTIONS[current];
  const selected = answers[current];

  const startQuiz = () => {
    setAnswers(Array(total).fill(null));
    setCurrent(0);
    setStage("quiz");
  };

  const pickRandomOrcImage = () => {
    const index = Math.floor(Math.random() * ORC_IMAGES.length);
    return ORC_IMAGES[index];
  };

  const getResultImage = (finalScore) => {
    if (finalScore === 0) {
      return "images/human.png";
    }

    return pickRandomOrcImage();
  };

  const chooseOption = (points) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = points;
      return next;
    });
  };

  const goNext = () => {
    if (selected == null) {
      return;
    }

    if (current < total - 1) {
      setCurrent((prev) => prev + 1);
      return;
    }

    const finalScore = answers.reduce((sum, value) => sum + (value ?? 0), 0);
    setResultDescription(getResultDescription(finalScore));
    setResultImage(getResultImage(finalScore));
    setStage("result");
  };

  const goBack = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const score = answers.reduce((sum, value) => sum + (value ?? 0), 0);
  const progress = isQuiz ? ((current + 1) / total) * 100 : 0;

  const logoFooter = (
    <footer className="logo-footer" aria-label="Company logo">
      <a
        className="company-logo-link"
        href="https://www.glaserbeamgames.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Glaser Beam Games"
      >
        <img className="company-logo" src="images/companylogo.png" alt="Company logo" />
      </a>
      <a
        className="instagram-link"
        href="https://www.instagram.com/glaserbeamgames"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Glaser Beam Games on Instagram"
      >
        <span className="instagram-link-text">
         Follow us on <img className="instagram-icon" src="images/instagram.png" alt="Instagram" />
         <br></br>
          @glaserbeamgames
        </span>
      </a>
    </footer>
  );

  const logoHeader = (
    <header className="logo-header" aria-label="Orc logo">
        <a
        className="company-logo-link"
        href="https://www.danielmglaser.com/office-orcs"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Learn more about Office Orcs"
      >
        <img className="orc-logo" src="images/orclogo.png" alt="Office Orcs logo" />
      </a>
      
    </header>
  );

  if (stage === "start") {
    return (
      <main className="app-shell">
        <section className="card start-grid">
          {logoHeader}
          <h1 className="start-title">What type of<br></br> Office Orc are you?</h1>
          <p className="start-copy">
            Five quick questions. <br></br>Determine your permanent role within <b>Orc Corp</b> for all eternity.
          </p>
          <div className="start-cta">
            <button className="btn btn-main btn-start" onClick={startQuiz}>
              Start Quiz
            </button>
          </div>
          {logoFooter}
          <a
            className="footer-url"
            href="https://www.glaserbeamgames.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.glaserbeamgames.com
          </a>
        </section>
      </main>
    );
  }

  if (stage === "result") {
    return (
      <main className="app-shell">
        <section className="card">
          {logoHeader}
          <h2 className="result-subtitle">You are a...</h2>
          <div className="result-image-wrap">
            <img className="result-orc-image" src={resultImage} alt="Your office orc" />
          </div>
          <h1 className="result-title">{getResultText(score)}</h1>
          <p className="result-description">{resultDescription}</p>
        </section>
        <section className="card" style={{marginTop: '10px'}}>
          <div className="actions results-actions">
            <p style={{textAlign: 'center', margin: '0px'}}>Screenshot your result<br></br> and tag us on instagram!</p>
            <h4 style={{textAlign: 'center', margin: '0px'}}>#officeOrcs #glaserbeamgames</h4>
            <a
              className="btn btn-main btn-email results-email-link"
              href="https://www.danielmglaser.com/office-orcs#block-yui_3_17_2_1_1770227733631_7866"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our Email List for Updates!
            </a>
            <button className="btn btn-main btn-retry" onClick={startQuiz}>
              Try Again
            </button>
          </div>
          {logoFooter}
          <a
            className="footer-url"
            href="https://www.glaserbeamgames.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.glaserbeamgames.com
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="card">
        {logoHeader}

        <div className="progress-meta">
          <span>
            Question {current + 1} of {total}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-track" aria-hidden="true">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <h2>{currentQuestion.prompt}</h2>

        <div className="options" role="radiogroup" aria-label={`Question ${current + 1}`}>
          {currentQuestion.options.map((option) => {
            const isSelected = selected === option.points;
            return (
              <button
                key={option.label}
                className={`option ${isSelected ? "selected" : ""}`}
                onClick={() => chooseOption(option.points)}
                role="radio"
                aria-checked={isSelected}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="actions">
          <button className="btn btn-ghost" onClick={goBack} disabled={current === 0}>
            Back
          </button>
          <button className="btn btn-main btn-next" onClick={goNext} disabled={selected == null}>
            {current === total - 1 ? "Finish Quiz" : "Next"}
          </button>
        </div>
        {logoFooter}
        <a
          className="footer-url"
          href="https://www.glaserbeamgames.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.glaserbeamgames.com
        </a>
      </section>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
