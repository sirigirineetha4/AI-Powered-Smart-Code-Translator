export const SUPPORTED_LANGUAGES = [
  { id: "python", name: "Python", extension: ".py" },
  { id: "javascript", name: "JavaScript", extension: ".js" },
  { id: "typescript", name: "TypeScript", extension: ".ts" },
  { id: "java", name: "Java", extension: ".java" },
  { id: "cpp", name: "C++", extension: ".cpp" },
  { id: "c", name: "C", extension: ".c" },
  { id: "csharp", name: "C#", extension: ".cs" },
  { id: "go", name: "Go", extension: ".go" },
  { id: "rust", name: "Rust", extension: ".rs" },
  { id: "ruby", name: "Ruby", extension: ".rb" },
  { id: "php", name: "PHP", extension: ".php" },
  { id: "swift", name: "Swift", extension: ".swift" },
  { id: "kotlin", name: "Kotlin", extension: ".kt" },
  { id: "sql", name: "SQL", extension: ".sql" },
];

export const getLanguageName = (languageId) => {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.id === languageId);
  return lang ? lang.name : languageId;
};

export const getLanguageExtension = (languageId) => {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.id === languageId);
  return lang ? lang.extension : ".txt";
};

const LANGUAGES = SUPPORTED_LANGUAGES.map(({ id, name }) => ({ id, name }));

const MONACO_LANGUAGE_MAP = {
  python: "python",
  javascript: "javascript",
  typescript: "typescript",
  java: "java",
  cpp: "cpp",
  c: "c",
  csharp: "csharp",
  go: "go",
  rust: "rust",
  ruby: "ruby",
  php: "php",
  swift: "swift",
  kotlin: "kotlin",
  sql: "sql",
};

const STARTER_CODE = {
  python: 'def main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()',
  javascript: 'function main() {\n  console.log("Hello, World!");\n}\n\nmain();',
  typescript: 'function greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  csharp: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  rust: 'fn main() {\n    println!("Hello, World!");\n}',
  ruby: 'def main\n  puts "Hello, World!"\nend\n\nmain',
  php: '<?php\n\nfunction main() {\n    echo "Hello, World!\\n";\n}\n\nmain();',
  swift: 'import Foundation\n\nprint("Hello, World!")',
  kotlin: 'fun main() {\n    println("Hello, World!")\n}',
  sql: 'SELECT id, name, created_at FROM users WHERE active = true ORDER BY created_at DESC;',
};

export { LANGUAGES, MONACO_LANGUAGE_MAP, STARTER_CODE };