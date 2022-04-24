/*
Time complexity of FCFS algorithm = O(n)
*/

function autoGenerate() {
    var x = document.querySelector("#inputNumber");
    var i = Math.floor((Math.random() * 499) + 1);
    x.value += i + " ";
}

// a function for displaying error alert
function error(messageError, message) {
    //adding alert class in classList to show error
    messageError.classList.add('alert');
    messageError.classList.add('alert-danger');
    //adding error string in message
    messageError.innerHTML = message;
}

// a function for removing error alert
function hideError(messageError) {
    //removing alert class in classList to show error
    messageError.classList.remove('alert');
    messageError.classList.remove('alert-danger');
    //adding empty string in message
    messageError.innerHTML = "";
}

//function for showing result on web page
function showResult(count, seekSequence) {
    var div = document.getElementById('count-output');
    if (count == "") div.innerHTML = "";
    else div.innerHTML = `<br/>Seek Sequence: <b>[` + seekSequence + `]</b><br /><br/>Total Seek Count: <b>` + count + `<b>`;
}


// First Come First Serve algorithm
function fcfs(Numbers, Head) {

    var tempArray = []; //initializing an empty array to collect the discrete integer
    var seekCountSequence = [];  //initializing an empty array to store the total head movements
    var totalNumbersLength = Numbers.length;
    var totalHeadMovements = 0; // initially assigning total head movement to 0
    var distance = 0;

    //getting all the input in form of integer
    for (var i = 0; i < totalNumbersLength; i++) {
        Numbers[i] = parseInt(Numbers[i]);// parsing values to integer
    }

    //it consist calculation part of total seek time
    for (var i = 0; i < totalNumbersLength; i++) {
        var currentTrack = Numbers[i];
        distance = Math.abs(currentTrack - Head); // taking absolute difference of currenTrack position to head position
        totalHeadMovements += distance; // adding distance to total head movement
        seekCountSequence.push(totalHeadMovements); // pushing totalHeadMovement value in seekCountSequence
        Head = currentTrack; // assigning head position as currentTrack
    }

    //storing all the resulted data in array
    for (var i = 1; i < totalNumbersLength; i++) {
        tempArray.push(Numbers[i]);
    }

    //calling showResult to display result on web page
    showResult(totalHeadMovements, tempArray);
    return seekCountSequence;
}

function Calculate() {
    //for error
    var messageError = document.getElementById('messageError');
    hideError(messageError);

    //taking inputs of users
    var inputNumberString = document.getElementById('inputNumber').value;

    // for removing removes whitespace from both sides of a input
    inputNumberString = inputNumberString.trim();

    //it is used it split input
    var inputNumber = inputNumberString.split(" ");

    //getting value of head position
    var userHeadPos = document.getElementById('userHeadPos').value;

    //Removing head position value from input if present
    for (var i = 0; i < inputNumber.length; i++) {
        if (inputNumber[i] == userHeadPos) {
            // at position i removing 1 iteam
            inputNumber.splice(i, 1);
        }
    }
    //Adding head position value at the start of inputNumbers
    inputNumber.unshift(userHeadPos);

    //Removing the duplicate values
    inputNumber = inputNumber.filter(function (item, pos) {
        return inputNumber.indexOf(item) == pos;
    });

    //Validation
    var isValidInput = true;

    //if value of userHeadPos is empty
    if (userHeadPos == "") {
        //displaying error if occurred
        error(messageError, "Current Head position is required");
        isValidInput = false;
    }

    //if value of userHeadPos is not a number
    else if (isNaN(userHeadPos)) {
        //displaying error if occurred
        error(messageError, "Only Numeric value allowed for current Head position !!!");
        isValidInput = false;
    }

    //if value of userHeadPos is negative
    else if (parseInt(userHeadPos) < 0) {
        error(messageError, "Current Head position must be positive integer");
        isValidInput = false;
    }

    //if value of userInputQueue is empty
    else if (inputNumberString == "") {
        //displaying error if occurred
        error(messageError, "Numeric values required for Queue");
        isValidInput = false;
    }
    else {
        var totalNumbers = inputNumber.length;

        //using for loop to check every input of inputNumber
        for (var i = 0; i < totalNumbers; i++) {

            //if values of inputNumbers is not a number
            if (isNaN(inputNumber[i])) {
                //displaying error if occurred
                error(messageError, "Number queue must only contain numbers");
                isValidInput = false;
            }

            //if values of inputNumbers is negative
            else if (parseInt(inputNumber[i]) < 0) {
                //displaying error if occurred
                error(messageError, "Number queue values must be positive integer");
                isValidInput = false;
            }
        }
    }

    //Generating graph 
    var ctx = document.getElementById("line-chart").getContext('2d');
    if (isValidInput) {
        var lineChart = new Chart(ctx, {
            type: 'line',
            data: {

                labels: fcfs(inputNumber, userHeadPos), //taking input from fcfs function

                // for displaying data of the value that are appearing on the chart
                legend: {
                    display: true
                },
                datasets: [
                    {
                        label: "First Come First Serve (FCFS) Algorithm",
                        data: inputNumber,
                        fill: false,
                        backgroundColor: "rgba(0,178,255, 0.8)",
                        borderColor: "rgba(0,178,255, 1)",
                        pointBackgroundColor: "rgba(0,178,255, 0.6)",
                        pointBorderColor: "#55bae7",
                        pointHoverBackgroundColor: "red",
                        pointHoverBorderColor: "black",
                        borderWidth: 3,
                    }
                ]
            },
            options: {
                elements: {
                    line: {
                        tension: 0
                    }
                },
                tooltips: {
                    enabled: true
                },
                hover: {
                    animationDuration: 2
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Seek Sequence"
                        },
                        ticks: {
                            beginAtZero: true,
                            fontSize: 16,
                            padding: 0,
                            fontColor: '#003b55'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Seek Count (upto Particular Point)",
                        },
                        ticks: {
                            fontSize: 16,
                            padding: 0,
                            fontColor: '#003b55'
                        }
                    }]
                }

            }
        });
    }
    document.querySelector(".canvas button").classList.add("printChart");
    document.querySelector(".printChart").style.visibility = "initial";
    document.querySelector(".printChart").addEventListener("click", function () {
        printImage();
    });
}

function printImage() {
    var canvas = document.querySelector("#line-chart");
    var canvas_img = canvas.toDataURL("image/png", 1.0);
    var pdf = new jsPDF('landscape', 'in', 'letter');
    pdf.addImage(canvas_img, 'png', .5, 1.75, 10, 5);
    pdf.save('FCFS Chart.pdf');
};