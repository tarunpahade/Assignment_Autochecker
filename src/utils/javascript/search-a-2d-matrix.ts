import assert from "assert";
import { Problem } from "@/types/problems";
import example1 from "./images/search-a-2d-1.jpg";
import example2 from "./images/search-a-2d-2.jpg";
import axios from "axios";

export const search2DMatrixHandler = (fn: any) => {
	try {
		const tests = [
			{
				matrix: [
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60],
				],
				target: 3,
			},
			{
				matrix: [
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60],
				],
				target: 13,
			},
		];
		const answers = [true, false];
		for (let i = 0; i < tests.length; i++) {

			
			const result = fn(tests[i].matrix, tests[i].target);
			assert.deepEqual(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Error from searchA2DMatrixHandler: ", error);
		throw new Error(error);
	}
};

const attachAtTheEnd: any = {
    js: `
const tests = [
    { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 3 },
    { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 13 },
    { matrix: [[1]], target: 1 }
];
tests.forEach(test => console.log(searchMatrix(test.matrix, test.target)));`,

    java: `
public static void main(String[] args) {
    int[][][] tests = {
        {{1, 3, 5, 7}, {10, 11, 16, 20}, {23, 30, 34, 60}},
        {{1, 3, 5, 7}, {10, 11, 16, 20}, {23, 30, 34, 60}},
        {{1}}
    };
    int[] targets = {3, 13, 1};
    for (int i = 0; i < tests.length; i++) {
        System.out.println(searchMatrix(tests[i], targets[i]));
    }
}`,

    py: `
tests = [
    {'matrix': [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 'target': 3},
    {'matrix': [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 'target': 13},
    {'matrix': [[1]], 'target': 1}
]
for test in tests:
    print(searchMatrix(test['matrix'], test['target']))`,

    cpp: `
int main() {
    vector<vector<vector<int>>> tests = {
        {{1, 3, 5, 7}, {10, 11, 16, 20}, {23, 30, 34, 60}},
        {{1, 3, 5, 7}, {10, 11, 16, 20}, {23, 30, 34, 60}},
        {{1}}
    };
    vector<int> targets = {3, 13, 1};
    for (int i = 0; i < tests.size(); i++) {
        cout << searchMatrix(tests[i], targets[i]) << " ";
    }
    cout << endl;
    return 0;
}`,

    c: `
int main() {
    int test1[3][4] = {{1, 3, 5, 7}, {10, 11, 16, 20}, {23, 30, 34, 60}};
    int test2[3][4] = {{1, 3, 5, 7}, {10, 11, 16, 20}, {23, 30, 34, 60}};
    int test3[1][1] = {{1}};
    int* tests[] = {&test1[0][0], &test2[0][0], &test3[0][0]};
    int sizes[] = {3, 3, 1};
    int targets[] = {3, 13, 1};
    for (int i = 0; i < 3; i++) {
        printf("%d ", searchMatrix(tests[i], sizes[i], 4, targets[i])); // Assuming fixed column size of 4 for the first two tests
    }
    return 0;
}`
};

const handlerTwoSumMultipleLanguages = async (
	language: string,
	userCode: string
  ) => {
	const tests = [
		{
			matrix: [
				[1, 3, 5, 7],
				[10, 11, 16, 20],
				[23, 30, 34, 60],
			],
			target: 3,
		},
		{
			matrix: [
				[1, 3, 5, 7],
				[10, 11, 16, 20],
				[23, 30, 34, 60],
			],
			target: 13,
		},
	];
	try {
	const answers = [true, false];
	for (let i = 0; i < tests.length; i++) {
	let result;
  
		  console.log(language, userCode, "this is ");
  
		  const newAttached=attachAtTheEnd[language]
		  const testCode = `${userCode}\n  ${newAttached}`;
		  console.log('This is test code', testCode);
		  
		  // Make a request to the backend for other languages
		  const response = await axios.post("http://localhost:3000/run", {
			language: language,
			code: testCode
			
		  });
		  result = response.data.job.output;
		  console.log(response.data, "this is response data");
		  
		console.log(result, "This is result");
  
		 assert.deepStrictEqual(result, answers[i]);
  		}
		  return true;

	} catch (error) {
	  console.error("Error in handlerTwoSum:", error);
	  return false;
	}
  };
  


const starterCode = {
    js: `function searchMatrix(matrix, target) { 
        // Write Your Code Here 
    }`,
    java: `public boolean searchMatrix(int[][] matrix, int target) {
        // Write Your Code Here
    }`,
    py: `def searchMatrix(matrix, target):     
        # Write your code here
    `,
    cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // Write your code here
    }`,
    c: `int searchMatrix(int** matrix, int matrixSize, int* matrixColSize, int target) {
        // Write your code here
    }`
};

const starterCodeSearch2DMatrixJS = `// Do not edit function name
function searchMatrix(matrix, target) {
  // Write your code here
};`;

export const search2DMatrix: Problem = {
	id: "search-a-2d-matrix",
	title: "5. Search a 2D Matrix",
	difficulty:'Medium',
	problemStatement: `
  <p class='mt-3'>Write an efficient algorithm that searches for a value in an <code>m x n</code> matrix. This matrix has the following properties:</p>
    <li class="mt-3">Integers in each row are sorted from left to right.</li>
    <li class="mt-3">The first integer of each row is greater than the last integer of the previous row.</li>
  <p class='mt-3'>Given <code>matrix</code>, an <code>m x n</code> matrix, and <code>target</code>, return <code>true</code> if <code>target</code> is in the matrix, and <code>false</code> otherwise.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 3`,
			outputText: `true`,
			img: example1.src,
		},
		{
			id: 1,
			inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 13`,
			outputText: `false`,
			img: example2.src,
		},
		{
			id: 2,
			inputText: `matrix = [[1]], target = 1`,
			outputText: `true`,
		},
	],
	constraints: `
  <li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 100</code></li>
  <li class='mt-2'><code>-10<sup>4</sup> <= matrix[i][j], target <= 10<sup>4</sup></code></li>
  `,
	starterCode: starterCodeSearch2DMatrixJS,
	handlerFunction: search2DMatrixHandler,
	handlerTwoSumMultipleLanguages,
	starterFunctionName: "function searchMatrix",
	starterFunctionNameMultipleLanguages: starterCode,
	order: 5,
};
