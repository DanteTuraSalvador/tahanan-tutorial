// Curriculum path data — used by the Curriculum component
// Each band has math + english arrays. Cards in a column are connected with arrows.
export const CURRICULUM_BANDS = [
  {
    band: "Preschool",
    ages: "Ages 3–4",
    math: [
      { code: "P1", title: "Counting",      desc: "1–10, number recognition, shapes" },
      { code: "P2", title: "Number sense",  desc: "11–20, more / less, ordering" },
      { code: "P3", title: "Basic patterns", desc: "Patterns, grouping, skip counting" }
    ],
    english: [
      { code: "P1", title: "Phonics",       desc: "Alphabet, letter sounds (A–Z)" },
      { code: "P2", title: "Sight words",   desc: "Dolch pre-K list (40 words)" },
      { code: "P3", title: "Word families", desc: "CVC words, rhyming, blending" }
    ]
  },
  {
    band: "Preschool",
    ages: "Ages 4–5",
    math: [
      { code: "E1", title: "Addition intro",    desc: "Sums to 10, number line use" },
      { code: "E2", title: "Subtraction intro", desc: "Differences to 10, take away" }
    ],
    english: [
      { code: "E1", title: "Simple reading",    desc: "2–3 word sentences, tracing" },
      { code: "E2", title: "Sentence building", desc: "Subject + verb, basic writing" }
    ]
  },
  {
    band: "Kinder-ready",
    ages: "Ages 5–6",
    math: [
      { code: "K1", title: "+ / – to 20",  desc: "Mixed ops, word problems intro" },
      { code: "K2", title: "Place value",  desc: "Tens and ones, 2-digit numbers" }
    ],
    english: [
      { code: "K1", title: "Short passages", desc: "3–5 sentence stories, questions" },
      { code: "K2", title: "Comprehension",  desc: "Main idea, who / what / where" }
    ]
  },
  {
    band: "Grade 1 Readiness",
    ages: "Ages 6+",
    phase2: true,
    math: [
      { code: "G1", title: "Multiplication intro", desc: "Groups of, arrays, repeated add" }
    ],
    english: [
      { code: "G1", title: "Independent reading", desc: "Full paragraphs, retelling" }
    ]
  }
];
