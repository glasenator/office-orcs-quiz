const QUESTIONS = [
  {
    prompt: "A teammate asks for help right before your lunch break. What do you do?",
    options: [
      { label: "Drop everything and help. Then eat the teammate.", points: 4 },
      { label: "Hear their plea. Sharpen teeth. Forget after lunch.", points: 3 },
      { label: "Send a short guide and let them try first.", points: 0 },
      { label: "Hurl the sacred blade of Ra'z Kah at them. Mercy is for cowards!", points: 1 }
    ]
  },
  {
    prompt: "Your project suddenly changes direction. Your first move?",
    options: [
      { label: "Reframe goals and adapt your task list.", points: 0 },
      { label: "The Zug'Rok Deathspin.", points: 3 },
      { label: "Eat the old requirements. They were confusing anyway.", points: 2 },
      { label: "Paint NEW PLAN on wall. Bigger letters. More skulls.", points: 1 }
    ]
  },
  {
    prompt: "A meeting runs long and feels unfocused. You...",
    options: [
      { label: "Stomp on the remains of the ones that wronged you.", points: 4 },
      { label: "Add the key points in shared documentation for clarity.", points: 0 },
      { label: "Throw a chair through the nearest window. Productive enough.", points: 2 },
      { label: "Flip the table. Declare meeting over. Feast time.", points: 1 }
    ]
  },
  {
    prompt: "Your manager asks where you see yourself in five years. You...",
    options: [
      { label: "Unroll an enormous battle map. “These lands shall be mine!”", points: 4 },
      { label: "Stare into the distance. “Wherever the feast is.”", points: 3 },
      { label: "Point toward manager’s chair. “There. But bigger.”", points: 2 },
      { label: "Smile pleasantly. “Hopefully still generating value for our shareholders!”", points: 0 }
    ]
  },
  {
    prompt: "Friday afternoon, big task still unfinished. You...",
    options: [
      { label: "GRAK’THU! GRUK!!!!!!", points: 4 },
      { label: "KROG’MA! THRAK’UL GOR’RA.", points: 3 },
      { label: "Hunker down all weekend and get the job done. The company depends on you.", points: 0 },
      { label: "GRUMKAI!!!!! DROG’NAK VULGOZR!!!", points: 1 }
    ]
  }
];

function getRandomItem(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return "Unknown";
  }
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

function getResultText(score) {
  if (score === 0) {
    return "Filthy Human";
  }

  const adjective = getRandomItem(window.ADJECTIVES);
  const noun = getRandomItem(window.NOUNS);
  return `${adjective} ${noun}`;
}

function addLineBreakAfterFirstSentence(text) {
  const firstSentenceEnd = text.indexOf(". ");
  if (firstSentenceEnd === -1) {
    return text;
  }

  const firstPart = text.slice(0, firstSentenceEnd + 1);
  const remainder = text.slice(firstSentenceEnd + 2);
  return `${firstPart}\n${remainder}`;
}

function getResultDescription(score) {
  if (score === 0) {
    return addLineBreakAfterFirstSentence(
      "What you lack in courage, you make up for in flavor. You slipped through Orc Corp undetected... for now."
    );
  }

  return `${getRandomItem(window.DESCRIPTIONS1)} ${getRandomItem(window.DESCRIPTIONS2)}` ;
}

window.QUIZ_DATA = {
  QUESTIONS,
  getResultText,
  getResultDescription
};
