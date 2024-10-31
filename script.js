const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display_output');

let input = "";

for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () =>{
        if(value == "clear") {
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML ="";
        } else if(value == "backspace") {
            input = input.slice(0, -1);
            display_input.innerHTML = cleanInput(input);
        } else if (value == "=") {
            let result = eval(input);

            display_output.innerHTML = cleanOutput(result);
        } else if (value == "brackets") {
            if (
                input.indexOf("(") == -1 || 
                input.indexOf("(") != -1 && 
                input.indexOf(")") != -1 && input.lastIndexOf("(") < input.lastIndexOf(")")
            ) {
                input += "(";
            } else if (
                input.indexOf("(") != -1 && 
                input.indexOf(")") == -1 || 
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") > input.lastIndexOf(")")
             ) {
                input += ")";
            } 
            
            display_input.innerHTML = cleanInput(input);
            
            
            // this if statement means if there is no first bracket, or if we do have a starting bracket AND we have an outer bracket and the last index of it
        } else {
            input += value;
            display_input.innerHTML = cleanInput(input);
        }
    })
}

// this isn't the most readable but obviously you need some more intuitive javascript to make a calculator with increased functionality to work. is still full of bugs at this point

function cleanInput(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length; 

    for(let i = o; i <input_array_length; i++) {
        if (input_array[i] == "*") {
            input_array[i] = ` <span class="operator">x</span `;
        } else if (input_array[i] == "/") {
            input_array[i] = ` <span class="operator">/</span `;
        } else if (input_array[i] == "+") {
            input_array[i] = ` <span class="operator">+</span `;
        } else if (input_array[i] == "-") {
            input_array[i] = ` <span class="operator">-</span `;
        } else if (input_array[i] == "(") {
            input_array[i] = `<span class="brackets">(</span`; // you do not want spaces on your brackets
        } else if (input_array[i] == ")") {
            input_array[i] = `<span class="brackets">)</span`; // you do not want spaces on your brackets 
        } else if (input_array[i] == "%") {
            input_array[i] = `<span class="operator">%</span`;
        }

    }
    return input_array.join("");
}


function cleanOutput (output) {
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];

    let output_array = output_string.split("");

    if (output_array.length > 3) {
        for (let i = output_array.length -3; i > 0; i -= 3) {
            output_array.splice(i, 0, ",");
        }
    }

    if (decimal) {
        output_array.push(".");
        output_array.push(decimal);
    }

    return output_array.join("");
}