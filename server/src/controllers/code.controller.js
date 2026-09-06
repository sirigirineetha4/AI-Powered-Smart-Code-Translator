import { translateCode } from "../services/translation.service.js";
import { analyzeComplexity } from "../services/complexity.service.js";
import { optimizeCode } from "../services/optimization.service.js";
import { explainCode } from "../services/explanation.service.js";
import { findBugs } from "../services/debug.service.js";
import { generateTests } from "../services/testGen.service.js";
import { createHistoryEntry } from "../services/history.service.js";

// Translate code
export const translate = async (req, res, next) => {
  try {
    const { code, sourceLanguage, targetLanguage } = req.body;

    if (!code || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({
        success: false,
        message: "code, sourceLanguage and targetLanguage are required.",
      });
    }

    const result = await translateCode(code, sourceLanguage, targetLanguage);

    createHistoryEntry({
      userId: req.user._id,
      type: "translate",
      inputCode: code,
      sourceLanguage,
      targetLanguage,
      output: result,
    }).catch((error) => {
      console.error("History save failed:", error);
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Analyze complexity
export const analyze = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "code and language are required.",
      });
    }

    const result = await analyzeComplexity(code, language);

    createHistoryEntry({
      userId: req.user._id,
      type: "analyze",
      inputCode: code,
      sourceLanguage: language,
      targetLanguage: null,
      output: result,
    }).catch((error) => {
      console.error("History save failed:", error);
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Optimize code
export const optimize = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "code and language are required.",
      });
    }

    const result = await optimizeCode(code, language);

    createHistoryEntry({
      userId: req.user._id,
      type: "optimize",
      inputCode: code,
      sourceLanguage: language,
      targetLanguage: null,
      output: result,
    }).catch((error) => {
      console.error("History save failed:", error);
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Explain code
export const explain = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "code and language are required.",
      });
    }

    const result = await explainCode(code, language);

    createHistoryEntry({
      userId: req.user._id,
      type: "explain",
      inputCode: code,
      sourceLanguage: language,
      targetLanguage: null,
      output: result,
    }).catch((error) => {
      console.error("History save failed:", error);
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Find bugs
export const debugCode = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "code and language are required.",
      });
    }

    const result = await findBugs(code, language);

    createHistoryEntry({
      userId: req.user._id,
      type: "debug",
      inputCode: code,
      sourceLanguage: language,
      targetLanguage: null,
      output: result,
    }).catch((error) => {
      console.error("History save failed:", error);
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Generate Unit Tests
export const generateUnitTests = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "code and language are required.",
      });
    }

    const result = await generateTests(code, language);

    createHistoryEntry({
      userId: req.user._id,
      type: "generate-tests",
      inputCode: code,
      sourceLanguage: language,
      targetLanguage: null,
      output: result,
    }).catch((error) => {
      console.error("History save failed:", error);
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};