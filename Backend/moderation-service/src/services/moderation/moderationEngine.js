const { analyzeText } = require("./textAnalyzer");
const { analyzeImage } = require("./imageAnalyzer");

async function runModeration({ targetType, text, imageUrls }) {

  let textResult = { violation: "SAFE", score: 0 };
  let imageResult = { violation: "SAFE", score: 0 };

  // TEXT ANALYSIS (Perspective API)
  if (text && text.trim().length > 0) {
    textResult = await analyzeText(text);
  }

  // IMAGE ANALYSIS (simulated / future vision API)
  if (imageUrls && imageUrls.length > 0) {
    imageResult = analyzeImage(imageUrls);
  }

  let violation = "SAFE";
  let action = "NONE";

  // TEXT-BASED DECISION
  if (textResult.violation !== "SAFE") {
    violation = textResult.violation;
    action =
      targetType === "REVIEW"
        ? "HIDE_REVIEW"
        : "BLOCK_PRODUCT";
  }

  // IMAGE-BASED DECISION (higher priority)
  if (imageResult.violation !== "SAFE") {
    violation = imageResult.violation;
    action = "BLOCK_PRODUCT";
  }

  return {
    targetType,
    textScore: textResult.score,
    imageScore: imageResult.score,
    violation,
    action,
    automated: true
  };
}

module.exports = { runModeration };
