const axios = require("axios");

const PERSPECTIVE_URL =
  "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze";

async function analyzeText(text) {
  if (!text || text.trim().length === 0) {
    return { score: 0, violation: "SAFE" };
  }

  const response = await axios.post(
    `${PERSPECTIVE_URL}?key=${process.env.PERSPECTIVE_API_KEY}`,
    {
      comment: { text },
      languages: ["en"],
      requestedAttributes: {
        TOXICITY: {},
        INSULT: {},
        THREAT: {}
      }
    }
  );

  const scores = response.data.attributeScores;

  const toxicity = scores.TOXICITY.summaryScore.value;

  let violation = "SAFE";
  if (toxicity > 0.85) violation = "ILLEGAL";
  else if (toxicity > 0.65) violation = "ADULT";
  else if (toxicity > 0.4) violation = "SPAM";

  return {
    score: toxicity,
    violation
  };
}

module.exports = { analyzeText };
