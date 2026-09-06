import API from "./api.js";

const translateCode = async (code, sourceLanguage, targetLanguage) => {
  const response = await API.post("/code/translate", {
    code,
    sourceLanguage,
    targetLanguage,
  });
  return response.data.data;
};

const analyzeComplexity = async (code, language) => {
  const response = await API.post("/code/analyze", { code, language });
  return response.data.data;
};

const optimizeCode = async (code, language) => {
  const response = await API.post("/code/optimize", { code, language });
  return response.data.data;
};

const explainCode = async (code, language) => {
  const response = await API.post("/code/explain", { code, language });
  return response.data.data;
};

const debugCode = async (code, language) => {
  const response = await API.post("/code/debug", { code, language });
  return response.data.data;
};

const generateTests = async (code, language) => {
  const response = await API.post("/code/generate-tests", { code, language });
  return response.data.data;
};

export {
  translateCode,
  analyzeComplexity,
  optimizeCode,
  explainCode,
  debugCode,
  generateTests,
};