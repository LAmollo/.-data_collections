const str = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";

let cell1 = '';
let cell2 = '';
let cell3 = '';
let cell4 = '';
let placeholder = '';
let counter = 0;

for (let char of str) {
    if (char === ',') {
        counter++;
        if (!cell1) {
            cell1 = placeholder;
            placeholder = '';
        } else if (!cell2) {
            cell2 = placeholder;
            placeholder = '';
        } else if (!cell3) {
            cell3 = placeholder;
            placeholder = '';
        }
    } else if (char === '\n') {
        counter++;
        cell4 = placeholder;
        placeholder = '';
        console.log(cell1, cell2, cell3, cell4);
        cell1 = '';
        cell2 = '';
        cell3 = '';
        cell4 = '';
    } else {
        counter++;
        placeholder += char;

        if (counter === str.length) {
            cell4 = placeholder;
            placeholder = '';
            console.log(cell1, cell2, cell3, cell4);
            cell1 = '';
            cell2 = '';
            cell3 = '';
            cell4 = '';
            counter = 0;
        }
    }
}
  
//PART 2: EXPANDING FUCNTIONALITY

//Declare a variable that stores the number of columns in each row of data within the CSV.
//Instead of hard-coding four columns per row, expand your code to accept any number of columns. 
//This should be calculated dynamically based on the first row of data.
//For example, if the first row of data (the headings) has eight entries, your program should create eight entries per row. 
//You can safely assume that all rows that follow will contain the same number of entries per row.
//After you have implemented the above:
//Store your results in a two-dimensional array.
//Each row should be its own array, with individual entries for each column.
//Each row should be stored in a parent array, with the heading row located at index 0.
//Cache this two-dimensional array in a variable for later use.


//const str = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";


const rows = str.split('\n'); // Split the CSV string into rows

const headings = rows[0].split(','); // Extract the headings from the first row


const numColumns = headings.length; // Store the number of columns

const data = []; // Initialize a two-dimensional array to store the data

for (let i = 1; i < rows.length; i++) {  // Parse each row starting from index 1 (as index 0 contains headings)
    const rowData = rows[i].split(','); 
    data.push(rowData);
}

data.unshift(headings); // Add the headings as the first row of the data array

console.log(data);  // Log the two-dimensional array


//3. TRANSFORMING DATA

//In order to make it more obvious what the data is, we will transform our rows into objects.
//Implement the following:
//For each row of data in the result array produced by your code above, 
//create an object where the key of each value is the heading for that value’s column.
//Convert these keys to all lowercase letters for consistency.
//Store these objects in an array, in the order that they were originally listed.
//Since the heading for each column will be stored in the object keys, 
//you do not need to create an object for the heading row itself.

//const str = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";

//Split the CSV string into rows
//const rows = str.split('\n');

//Extract the headings from the first row and convert them to lowercase 
//const headings = rows[0].split(',').map(heading => heading.toLowerCase());

//Store the number of columns
//const numColumns = headings.length;


const objects = []; // Initialize an array to store the objects

for (let i = 1; i < rows.length; i++) { // Parse each row starting from index 1 (as index 0 contains headings)
    const rowData = rows[i].split(',');
    const obj = {};
    for (let j = 0; j < numColumns; j++) { // Create an object for the current row using headings as keys
        obj[headings[j]] = rowData[j];
    }
    objects.push(obj);
}

console.log(objects); // Log the array of objects

//4. SORTING AND MANIPULATING DATA

//It is important to know how to work with data in this format, an array of objects,
//as it is one of the most commonly used data formats in JavaScript.
//Using array methods, accomplish the following tasks, in order upon the result of Part 3:
//Remove the last element from the sorted array.
//Insert the following object at index 1:
//{ id: "48", name: "Barry", occupation: "Runner", age: "25" }
//Add the following object to the end of the array:
//{ id: "7", name: "Bilbo", occupation: "None", age: "111" }

//...and lastly...use the values of each object within the array 
//and the array’s length property to calculate the average age of the group. 
//This calculation should be accomplished using a loop.

// Usingf the previous array of objects, 'objects' the array **

objects.pop(); // Remove the last element from the array

objects.splice(1, 0, { id: "48", name: "Barry", occupation: "Runner", age: "25" }); // Insert a new object at index 1

objects.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" });//Add a new object to the end of the array

let totalAge = 0;                                 // Calculate the average age of the group
for (let i = 0; i < objects.length; i++) {
    totalAge += parseInt(objects[i].age);
}
const averageAge = totalAge / objects.length;

console.log(objects);
console.log("Average Age:", averageAge);

//5. FULL CIRCLE

//As a final task, transform the final set of data back into CSV format.
//There are a number of ways to do this; be creative!

// As before, let's keeo 'objects' as the array 

let csvString = ''; //the CSV string

csvString += Object.keys(objects[0]).join(',') + '\n'; //Add the headings row


for (let obj of objects) {               //Add data rows
    const values = Object.values(obj);
    csvString += values.join(',') + '\n';
}

console.log(csvString);



