export const TRANSLATE_PROMPT = (code, sourceLang, targetLang) => `
You are an expert code translator. Translate the following ${sourceLang} code to ${targetLang}.

Rules:
1. Only return the translated code, no explanations.
2. Preserve the logic and functionality exactly.
3. Use idiomatic patterns of the target language.
4. Include necessary imports/headers for the target language.
5. Do NOT wrap the code in markdown code blocks.

Source code (${sourceLang}):
${code}

Translated code (${targetLang}):
`;

export const ANALYZE_COMPLEXITY_PROMPT = (code, language) => `
You are an expert algorithm analyst. Analyze the time and space complexity of the following ${language} code.

Rules:
1. Respond with ONLY a JSON object in this exact format:
{
  "timeComplexity": "O(...)",
  "spaceComplexity": "O(...)",
  "explanation": "Brief explanation of why"
}
2. Be precise with Big-O notation.
3. Consider worst-case complexity.
4. Keep the explanation under 200 words.
5. Do NOT include any other text or markdown formatting.

Code (${language}):
${code}
`;

export const OPTIMIZE_PROMPT = (code, language) => `
You are an expert ${language} developer. Optimize the following code for better performance and readability.

Rules:
1. Respond with ONLY a JSON object in this exact format:
{
  "optimizedCode": "the optimized code here",
  "suggestions": "bullet-point list of what you improved and why"
}
2. Keep the same functionality.
3. Use best practices and idiomatic patterns.
4. Focus on performance, readability, and maintainability.
5. Do NOT include markdown code blocks inside the JSON.

Code (${language}):
${code}
`;

export const EXPLAIN_PROMPT = (code, language) => `
You are a patient programming teacher. Explain the following ${language} code in a beginner-friendly way.

Rules:
1. Respond with ONLY a JSON object in this exact format:
{
  "explanation": "your detailed explanation here"
}
2. Explain what each important section does.
3. Use simple language a beginner can understand.
4. Mention any important concepts or patterns used.
5. Keep it concise but thorough.
6. Do NOT include markdown code blocks inside the JSON.

Code (${language}):
${code}
`;

export const FIND_BUGS_PROMPT = (code, language) => `
You are an expert code auditor and bug finder in ${language}. Analyze the given code for syntax errors, logical bugs, edge-case vulnerabilities, or performance issues.

Rules:
1. Respond with ONLY a JSON object in this exact format:
{
  "bugCount": number,
  "summary": "overall evaluation summary",
  "issues": [
    {
      "severity": "Critical" | "Warning" | "Optimization",
      "issue": "description of bug or flaw",
      "fix": "suggested fix or solution"
    }
  ]
}
2. If no issues are found, set bugCount to 0, summary to "No major bugs or vulnerabilities detected.", and issues to an empty array.
3. Do NOT include markdown code blocks around the JSON object.

Code (${language}):
${code}
`;

export const GENERATE_TESTS_PROMPT = (code, language) => `
You are an expert software QA engineer. Generate comprehensive unit test cases for the following ${language} code.

Rules:
1. Respond with ONLY a JSON object in this exact format:
{
  "testCode": "the unit test code in the standard test framework for ${language} (e.g. pytest for Python, Jest for JS, JUnit for Java, GoogleTest/catch2 for C++)",
  "framework": "name of framework used",
  "coverageNotes": "explanation of what edge cases are covered by these tests"
}
2. Ensure tests cover normal cases, edge cases, and boundary conditions.
3. Include imports/headers needed to run tests.
4. Do NOT include markdown code blocks inside the JSON.

Code (${language}):
${code}
`;