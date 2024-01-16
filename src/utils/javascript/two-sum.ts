import assert from "assert";
import { Problem } from "@/types/problems";
import axios from "axios";

const starterCodeTwoSum = `function twoSum(nums,target){
  // Write your code here
};`;
interface codeForCode {
	js: string,
	java: string,
	py: string,
	cpp: string,
	c: string	
}


const starterCode = {
	js: `function twoSum(nums, target) { 
//Write Your Code Here 
	}`,
  
	java: `public static int[] twoSum(int[] nums, int target) {
// Write Your Code Here
	}`,
  
	py: `def twoSum(nums, target):     
#write your code here
	`,
  
	cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
std::vector<int> twoSum(std::vector<int>& nums, int target) {
	  //Write your code here
  }`,
  
	c: `#include <stdio.h>
 #include <stdlib.h>
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
//Write your code here
  }`
  };
  
  const attachAtTheEnd:any = {
	js: `const nums = [2, 7, 11, 15];
	const target = 9;
	const result = twoSum(nums, target);
	console.log(result);`,
	java: "public static int[] twoSum(",
	py: `nums = [2, 7, 11, 15]
	target = 9
	result = twoSum(nums, target)
	print(result)`,
	cpp: `int main() {
		std::vector<int> nums = {2, 7, 11, 15};
		int target = 9;
		std::vector<int> result = twoSum(nums, target);
		for (int num : result) {
			std::cout << num << " ";
		}
		return 0;
	}`,
	c: `int main() {
		int nums[] = {2, 7, 11, 15};
		int target = 9;
		int returnSize;
		int* result = twoSum(nums, 4, target, &returnSize);
		for (int i = 0; i < returnSize; i++) {
			printf("%d ", result[i]);
		}
		free(result);
		return 0;
	}`,
  };


// checks if the user has the correct code
const handlerTwoSum = (fn: any) => {
  // fn is the callback that user's code is passed into
  try {
    const nums = [
      [2, 7, 11, 15],
      [3, 2, 4],
      [3, 3],
    ];

    const targets = [9, 6, 6];
    const answers = [
      [0, 1],
      [1, 2],
      [0, 1],
    ];

    // loop all tests to check if the user's code is correct
    for (let i = 0; i < nums.length; i++) {
      // result is the output of the user's function and answer is the expected output
      const result = fn(nums[i], targets[i]);
      console.log(result, "this is result for " + targets[i] + nums[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("twoSum handler function error");
    throw new Error(error);
  }
};
const handlerTwoSumMultipleLanguages = async (
  language: string,
  userCode: string
) => {
  const nums = [
    [2, 7, 11, 15],
    [3, 2, 4],
    [3, 3],
  ];
  const targets = [9, 6, 6];
  const answers = [
    [0, 1],
    [1, 2],
    [0, 1],
  ];

  try {
    for (let i = 0; i < nums.length; i++) {
      let result;

        console.log(language, userCode, "this is ");

		const newAttached=attachAtTheEnd[language]
		const testCode = `${userCode}\n  ${newAttached}`;
		console.log('This is test code', testCode);
		
        // Make a request to the backend for other languages
        const response = await axios.post("http://localhost:3000/run", {
          language: language,
          code: testCode,
          input: { nums: nums[i], target: targets[i] },
		  
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

export const twoSum: Problem = {
  id: "two-sum",
  title: "1. Two Sum",
  difficulty: "Easy",
  problemStatement: `<p class='mt-3'>
  Given an array of integers <code>nums</code> and an integer <code>target</code>, return
  <em>indices of the two numbers such that they add up to</em> <code>target</code>.
</p>
<p class='mt-3'>
  You may assume that each input would have <strong>exactly one solution</strong>, and you
  may not use thesame element twice.
</p>
<p class='mt-3'>You can return the answer in any order.</p>`,
  examples: [
    {
      id: 1,
      inputText: "nums = [2,7,11,15], target = 9",
      outputText: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      id: 2,
      inputText: "nums = [3,2,4], target = 6",
      outputText: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      id: 3,
      inputText: " nums = [3,3], target = 6",
      outputText: "[0,1]",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>2 ≤ nums.length ≤ 10</code>
</li> <li class='mt-2'>
<code>-10 ≤ nums[i] ≤ 10</code>
</li> <li class='mt-2'>
<code>-10 ≤ target ≤ 10</code>
</li>
<li class='mt-2 text-sm'>
<strong>Only one valid answer exists.</strong>
</li>`,
  handlerFunction: handlerTwoSum,
  handlerTwoSumMultipleLanguages,

  starterCode: starterCodeTwoSum,
  order: 1,
  starterFunctionName: "function twoSum(",
  starterFunctionNameMultipleLanguages: starterCode,
};
