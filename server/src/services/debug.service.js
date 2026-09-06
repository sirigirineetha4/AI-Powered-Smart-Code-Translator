import { askGemini } from "./gemini.service.js";
import { FIND_BUGS_PROMPT } from "../constants/prompts.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";
import { getLanguageName } from "../constants/languages.js";

export const findBugs = async (code, language) => {
  const langName = getLanguageName(language);
  const prompt = FIND_BUGS_PROMPT(code, langName);
  const rawResponse = await askGemini(prompt);
  return parseGeminiJSON(rawResponse);
};
