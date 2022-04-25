//Random Number Generation from 1-499
function autoGenerate()
{
    var x = document.querySelector("#inputNumbers");
    var i = Math.floor((Math.random() * 499) + 1);
    x.value += i + " ";
}

function Calculate()
{
    var errorMessage = document.getElementById('errorMessage');  
    hideError(errorMessage);

    //Getting numbers(data)from user input
    var inputNumbersString = document.getElementById('inputNumbers').value;
    inputNumbersString = inputNumbersString.trim();
    var inputNumbers = inputNumbersString.split(" ");
    var inputHeadPos = document.getElementById('inputHeadPos').value;

    //Removing header values from user input
    for (var i = 0; i < inputNumbers.length; i++)
    {
        if (inputNumbers[i] == inputHeadPos)
        {
            inputNumbers.splice(i, 1);
        }
    }
    inputNumbers.unshift(inputHeadPos);

    //Removing the duplicate values
    inputNumbers = inputNumbers.filter(function (item, pos)
    {
        return inputNumbers.indexOf(item) == pos;
    });

    //Validation
    var isValidInput = true; 
    
    if (inputHeadPos == "") {
        //displaying error if occurred
        showError(errorMessage, "Current Head position is required");
        isValidInput = false;
    }

    //if value of inputHeadPos is not a number
    else if (isNaN(inputHeadPos)) {
        //displaying error if occurred
        showError(errorMessage, "Only Numeric value allowed for current Head position !!!");
        isValidInput = false;
    }

    //if value of inputHeadPos is negative
    else if (parseInt(inputHeadPos) < 0) {
        showError(errorMessage, "Current Head position must be positive integer");
        isValidInput = false;
    }

    //if value of userInputQueue is empty
    else if (inputNumbersString == "") {
        //displaying error if occurred
        showError(errorMessage, "Numeric values required for Queue");
        isValidInput = false;
    }
    else {
        var totalNumbers = inputNumbers.length;

        //using for loop to check every input of inputNumbers
        for (var i = 0; i < totalNumbers; i++) {

            //if values of inputNumbers is not a number
            if (isNaN(inputNumbers[i])) {
                //displaying error if occurred
                showError(errorMessage, "Number queue must only contain numbers");
                isValidInput = false;
            }

            //if values of inputNumbers is negative
            else if (parseInt(inputNumbers[i]) < 0) {
                //displaying error if occurred
                showError(errorMessage, "Number queue values must be positive integer");
                isValidInput = false;
            }
        }
    }

    if(isValidInput){
    // var graphType = document.getElementById("chartType").value;
    var ctx = document.getElementById("line-chart").getContext('2d');
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fcfs(inputNumbers, inputHeadPos),
            legend: {
                display: true
            },
            datasets: [
                {
                    label: "First Come First Serve (FCFS) Algorithm",
                    data: inputNumbers,
                    lineTension: 0,
                    fill: false,
                    backgroundColor: "rgba(0,178,255, 0.8)",
                    borderColor: "rgba(0,178,255, 1)",
                    pointBackgroundColor: "rgba(0,178,255, 0.6)",
                    pointBorderColor: "#55bae7",
                    pointHoverBackgroundColor: "#55bae7",
                    pointHoverBorderColor: "#55bae7",
                    borderWidth: 3,
                }
            ]
        },
        options: {
            tooltips: {
                enabled: true
            },
            hover: {
                animationDuration: 1
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Seek Sequence"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Seek Count (upto Particular Point)",
                    }
                }]
            }
        }
    });

    document.querySelector(".canvas button").classList.add("printChart");
    document.querySelector(".printChart").style.visibility = "initial";
    document.querySelector(".printChart").addEventListener("click", function () {
        printImage();
    });
}
} 

function printImage()
{
    var canvas = document.querySelector("#line-chart");
    var canvas_img = canvas.toDataURL("image/png",1.0);
    var pdf = new jsPDF('landscape','in', 'letter');
    pdf.addImage(canvas_img, 'png', .5, 1.75, 10, 5);
    pdf.save('FCFS Chart.pdf');
};

function showError(errorMessage, msg)
{
    errorMessage.classList.add('alert');
    errorMessage.classList.add('alert-danger');
    errorMessage.innerHTML = msg;
}

function hideError(errorMessage)
{
    errorMessage.classList.remove('alert');
    errorMessage.classList.remove('alert-danger');
    errorMessage.innerHTML = "";
}

function showResult(count, seekSequence)
{
    var div = document.getElementById('count-output');
    if (count == "") div.innerHTML = "";
    else div.innerHTML = "<br/>Seek Sequence: <b>[" + seekSequence + "]</b><br /><br/>Total Seek Count: <b>" + count + "<b>";
}

function fcfs(Numbers, Head)
{
    var tempArray = [];
    var seekCountSequence = [];
    var totalNumbersLength = Numbers.length;
    var totalHeadMovements = 0;
    var distance = 0;

    for (var i = 0; i < totalNumbersLength; i++)
    {
        Numbers[i] = parseInt(Numbers[i]);
    }

    for (var i = 0; i < totalNumbersLength; i++)
    {
        var currentTrack = Numbers[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        seekCountSequence.push(totalHeadMovements);
        Head = currentTrack;
    }
    for (var i = 1; i < totalNumbersLength; i++)
    {
        tempArray.push(Numbers[i]);
    }
    showResult(totalHeadMovements, tempArray);
    return seekCountSequence;
}
