import { askGemini } from "./gemini.service.js";
import { GENERATE_TESTS_PROMPT } from "../constants/prompts.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";
import { getLanguageName } from "../constants/languages.js";

export const generateTests = async (code, language) => {
  const langName = getLanguageName(language);
  const prompt = GENERATE_TESTS_PROMPT(code, langName);
  const rawResponse = await askGemini(prompt);
  return parseGeminiJSON(rawResponse);
};
