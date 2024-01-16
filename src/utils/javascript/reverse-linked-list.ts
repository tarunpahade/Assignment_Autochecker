import assert from "assert";
import { Problem } from "@/types/problems";
import example from "./images/reverseLL.jpg";
import axios from "axios";

// JS doesn't have a built in LinkedList class, so we'll create one
class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }

  reverse(): LinkedList {
    let current: LinkedList | null = this;
    let prev: LinkedList | null = null;
    while (current !== null) {
      const next = current.next as LinkedList;
      current.next = prev;
      prev = current;
      current = next;
    }
    return prev!;
  }
}

export const reverseLinkedListHandler = (fn: any) => {
  try {
    const tests = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3], [1]];
    const answers = [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [3, 2, 1], [1]];
    for (let i = 0; i < tests.length; i++) {
      const list = createLinkedList(tests[i]);
      const result = fn(list);
      assert.deepEqual(getListValues(result), answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Error from reverseLinkedListHandler: ", error);
    throw new Error(error);
  }
};

// it creates a linked list from an array
function createLinkedList(values: number[]): LinkedList {
  const head = new LinkedList(values[0]);
  let current = head;
  for (let i = 1; i < values.length; i++) {
    const node = new LinkedList(values[i]);
    current.next = node;
    current = node;
  }
  return head;
}

// it returns an array of values from a linked list
function getListValues(head: LinkedList): number[] {
  const values = [];
  let current: LinkedList | null = head;
  while (current !== null) {
    values.push(current.value);
    current = current.next;
  }
  return values;
}

const starterCodeReverseLinkedListJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function reverseLinkedList(head) {
  // Write your code here
};`;

const starterCode = {
  js: `function reverseLinkedList(head) { 
        // Write Your Code Here 
    }`,
  java: `public ListNode reverseLinkedList(ListNode head) {
        // Write Your Code Here
    }`,
  py: `def reverseLinkedList(head):     
        # Write your code here
    `,
  cpp: `ListNode* reverseLinkedList(ListNode* head) {
        // Write your code here
    }`,
  c: `struct ListNode* reverseLinkedList(struct ListNode* head) {
        // Write your code here
    }`,
};

const attachAtTheEnd: any = {
  js: `
const list = createLinkedList([1, 2, 3, 4, 5]);
const reversedList = reverseLinkedList(list);
console.log(getListValues(reversedList));`,

  java: `
public static void main(String[] args) {
    ListNode head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
    ListNode reversedList = reverseLinkedList(head);
    System.out.println(listToString(reversedList));
}
private static String listToString(ListNode head) {
    StringBuilder sb = new StringBuilder();
    while(head != null) {
        sb.append(head.val).append(" ");
        head = head.next;
    }
    return sb.toString().trim();
}`,

  py: `
head = createLinkedList([1, 2, 3, 4, 5])
reversedList = reverseLinkedList(head)
print(listToString(reversedList))

def listToString(head):
    values = []
    while head:
        values.append(str(head.val))
        head = head.next
    return ' '.join(values)`,

  cpp: `
int main() {
    ListNode* head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
    ListNode* reversedList = reverseLinkedList(head);
    printList(reversedList);
    // Free memory here
    return 0;
}
void printList(ListNode* head) {
    while(head != nullptr) {
        std::cout << head->val << " ";
        head = head->next;
    }
}`,

  c: `
  // Function to print a linked list
  void printList(ListNode* head) {
      while(head != nullptr) {
          std::cout << head->val << " ";
          head = head->next;
      }
      std::cout << std::endl;
  }
  
  int main() {
      // Corrected the way of creating the list
      ListNode* head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
      ListNode* reversedList = reverseList(head); // Corrected function name
      printList(reversedList);
  
      // Free memory here - this part is important in C++ to prevent memory leaks
      while(reversedList != nullptr) {
          ListNode* temp = reversedList;
          reversedList = reversedList->next;
          delete temp;
      }
  
      return 0;
  }`,
};
const handlerTwoSumMultipleLanguages = async (
  language: string | number,
  userCode: any
) => {
  const tests = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3], [1]];
  const answers = [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [3, 2, 1], [1]];

  try {
    if (language === "js") {
      console.log("HII i am Tarun Pahade ");
      const staterJsCode = `function reverseLinkedList(`;
      
      const newuserCode = userCode.slice(userCode.indexOf(staterJsCode));
      
      console.log(newuserCode);

      const cb = new Function(`return ${userCode}`)();

      const handlerFunction = await reverseLinkedListHandler(cb);
      console.log(handlerFunction, "thar");

      return handlerFunction;
    } else {
      for (let i = 0; i < tests.length; i++) {
        const newAttached = attachAtTheEnd[language];
        const testCode = `${userCode}\n${newAttached}`;

        const response = await axios.post("http://localhost:3000/run", {
          language: language,
          code: testCode,
        });
        console.log(testCode,response.data);

        const result = processResult(response.data.job.output);
        assert.deepStrictEqual(result, answers[i]);
      }
    }
    return true;
  } catch (error) {
    console.error("Error in handlerReverseLinkedListMultipleLanguages:", error);
    return false;
  }
};

function processResult(rawResult: string) {
  // Assuming the result is returned as a space-separated string of numbers
  return rawResult.trim().split(/\s+/).map(Number);
}

export const reverseLinkedList: Problem = {
  id: "reverse-linked-list",
  title: "2. Reverse Linked List",
  difficulty: "Hard",

  problemStatement: `<p class='mt-3'>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>
	`,
  examples: [
    {
      id: 0,
      inputText: "head = [1,2,3,4,5]",
      outputText: "[5,4,3,2,1]",
      img: example.src,
    },
    {
      id: 1,
      inputText: "head = [1,2,3]",
      outputText: "[3,2,1]",
    },
    {
      id: 2,
      inputText: "head = [1]",
      outputText: "[1]",
    },
  ],
  constraints: `<li class='mt-2'>The number of nodes in the list is the range <code>[0, 5000]</code>.</li>
<li class='mt-2'><code>-5000 <= Node.val <= 5000</code></li>`,
  starterCode: starterCodeReverseLinkedListJS,
  handlerFunction: reverseLinkedListHandler,
  handlerTwoSumMultipleLanguages,
  starterFunctionName: "function reverseLinkedList(",
  order: 2,
  starterFunctionNameMultipleLanguages: starterCode,
};
