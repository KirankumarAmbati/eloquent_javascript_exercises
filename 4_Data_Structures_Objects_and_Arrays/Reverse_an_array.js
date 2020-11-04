function reverseAnArray(inputArray) {

    let reqArray = [];
    
    while(inputArray.length) {
        reqArray.push(inputArray.pop());
    }

    return reqArray;
}

console.log(reverseAnArray(['a', 'b', 'c']));
