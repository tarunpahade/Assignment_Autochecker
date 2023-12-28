#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

void testTwoSum() {
    int nums[][4] = {{2, 7, 11, 15}, {3, 2, 4}, {3, 3}};
    int numsSize[] = {4, 3, 2}; // Sizes of each nums array
    int targets[] = {9, 6, 6};
    int answers[][2] = {{0, 1}, {1, 2}, {0, 1}};

    for (int i = 0; i < 3; i++) {
        int returnSize;
        int* returnArray;

        twoSum(nums[i], numsSize[i], targets[i], &returnSize, &returnArray);

        // Asserting the results
        assert(returnSize == 2);
        assert(returnArray[0] == answers[i][0]);
        assert(returnArray[1] == answers[i][1]);

        free(returnArray); // Free the allocated memory
    }
}


void twoSum(int* nums, int numsSize, int target, int* returnSize, int** returnArray) {
    // Allocate memory for returnArray
    *returnArray = malloc(2 * sizeof(int));
    *returnSize = 2;

    // Write your logic here
    // For example, a simple two-pass hash table approach or brute-force approach

    // Don't forget to handle cases where no solution is found
}