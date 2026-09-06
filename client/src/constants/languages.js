const LANGUAGES = [
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

const FILE_EXTENSIONS = {
  python: ".py",
  javascript: ".js",
  typescript: ".ts",
  java: ".java",
  cpp: ".cpp",
  c: ".c",
  csharp: ".cs",
  go: ".go",
  rust: ".rs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  kotlin: ".kt",
  sql: ".sql",
};

const STARTER_CODE = {
  python: `def fibonacci(n):\n    if n <= 0:\n        return []\n    elif n == 1:\n        return [0]\n    seq = [0, 1]\n    while len(seq) < n:\n        seq.append(seq[-1] + seq[-2])\n    return seq\n\n# Test fibonacci sequence\nresult = fibonacci(10)\nprint("Fibonacci Sequence:", result)`,

  javascript: `function fibonacci(n) {\n  if (n <= 0) return [];\n  if (n === 1) return [0];\n  const seq = [0, 1];\n  while (seq.length < n) {\n    seq.push(seq[seq.length - 1] + seq[seq.length - 2]);\n  }\n  return seq;\n}\n\nconsole.log("Fibonacci:", fibonacci(10));`,

  typescript: `function fibonacci(n: number): number[] {\n  if (n <= 0) return [];\n  if (n === 1) return [0];\n  const seq: number[] = [0, 1];\n  while (seq.length < n) {\n    const nextVal = seq[seq.length - 1] + seq[seq.length - 2];\n    seq.push(nextVal);\n  }\n  return seq;\n}\n\nconsole.log("Fibonacci TS:", fibonacci(10));`,

  java: `import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static List<Integer> fibonacci(int n) {\n        List<Integer> seq = new ArrayList<>();\n        if (n <= 0) return seq;\n        seq.add(0);\n        if (n == 1) return seq;\n        seq.add(1);\n        while (seq.size() < n) {\n            int next = seq.get(seq.size() - 1) + seq.get(seq.size() - 2);\n            seq.add(next);\n        }\n        return seq;\n    }\n\n    public static void main(String[] args) {\n        System.out.println("Fibonacci: " + fibonacci(10));\n    }\n}`,

  cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> fibonacci(int n) {\n    vector<int> seq;\n    if (n <= 0) return seq;\n    seq.push_back(0);\n    if (n == 1) return seq;\n    seq.push_back(1);\n    while (seq.size() < n) {\n        int nextVal = seq.back() + seq[seq.size() - 2];\n        seq.push_back(nextVal);\n    }\n    return seq;\n}\n\nint main() {\n    vector<int> res = fibonacci(10);\n    for(int val : res) cout << val << " ";\n    cout << endl;\n    return 0;\n}`,

  c: `#include <stdio.h>\n#include <stdlib.h>\n\nvoid print_fibonacci(int n) {\n    if (n <= 0) return;\n    long long a = 0, b = 1;\n    printf("%lld ", a);\n    if (n == 1) return;\n    printf("%lld ", b);\n    for (int i = 2; i < n; i++) {\n        long long next = a + b;\n        printf("%lld ", next);\n        a = b;\n        b = next;\n    }\n    printf("\\n");\n}\n\nint main() {\n    printf("Fibonacci Sequence:\\n");\n    print_fibonacci(10);\n    return 0;\n}`,

  csharp: `using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static List<int> Fibonacci(int n) {\n        var seq = new List<int>();\n        if (n <= 0) return seq;\n        seq.Add(0);\n        if (n == 1) return seq;\n        seq.Add(1);\n        while (seq.Count < n) {\n            seq.Add(seq[seq.Count - 1] + seq[seq.Count - 2]);\n        }\n        return seq;\n    }\n\n    static void Main() {\n        Console.WriteLine(string.Join(", ", Fibonacci(10)));\n    }\n}`,

  go: `package main\n\nimport "fmt"\n\nfunc fibonacci(n int) []int {\n\tif n <= 0 {\n\t\treturn []int{}\n\t}\n\tif n == 1 {\n\t\treturn []int{0}\n\t}\n\tseq := []int{0, 1}\n\tfor len(seq) < n {\n\t\tnextVal := seq[len(seq)-1] + seq[len(seq)-2]\n\t\tseq = append(seq, nextVal)\n\t}\n\treturn seq\n}\n\nfunc main() {\n\tfmt.Println("Fibonacci:", fibonacci(10))\n}`,

  rust: `fn fibonacci(n: usize) -> Vec<u64> {\n    if n == 0 { return vec![]; }\n    if n == 1 { return vec![0]; }\n    let mut seq = vec![0, 1];\n    while seq.len() < n {\n        let next_val = seq[seq.len() - 1] + seq[seq.len() - 2];\n        seq.push(next_val);\n    }\n    seq\n}\n\nfn main() {\n    let res = fibonacci(10);\n    println!("Fibonacci: {:?}", res);\n}`,

  ruby: `def fibonacci(n)\n  return [] if n <= 0\n  return [0] if n == 1\n  seq = [0, 1]\n  seq << seq[-1] + seq[-2] while seq.length < n\n  seq\nend\n\nputs "Fibonacci: #{fibonacci(10).inspect}"`,

  php: `<?php\n\nfunction fibonacci($n) {\n    if ($n <= 0) return [];\n    if ($n == 1) return [0];\n    $seq = [0, 1];\n    while (count($seq) < $n) {\n        $seq[] = $seq[count($seq) - 1] + $seq[count($seq) - 2];\n    }\n    return $seq;\n}\n\nprint_r(fibonacci(10));`,

  swift: `func fibonacci(_ n: Int) -> [Int] {\n    if n <= 0 { return [] }\n    if n == 1 { return [0] }\n    var seq = [0, 1]\n    while seq.count < n {\n        seq.append(seq[seq.count - 1] + seq[seq.count - 2])\n    }\n    return seq\n}\n\nprint("Fibonacci:", fibonacci(10))`,

  kotlin: `fun fibonacci(n: Int): List<Int> {\n    if (n <= 0) return emptyList()\n    if (n == 1) return listOf(0)\n    val seq = mutableListOf(0, 1)\n    while (seq.size < n) {\n        seq.add(seq.last() + seq[seq.size - 2])\n    }\n    return seq\n}\n\nfun main() {\n    println("Fibonacci: \${fibonacci(10)}")\n}`,

};

const getLanguageExtension = (languageId) => {
  return FILE_EXTENSIONS[languageId] || ".txt";
};

export { LANGUAGES, MONACO_LANGUAGE_MAP, FILE_EXTENSIONS, STARTER_CODE, getLanguageExtension };