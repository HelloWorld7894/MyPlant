const ipcRender = require("electron").ipcRenderer

//init setup
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


//code for drawing charts
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Gas', 'Percentage'],
        ['LPG', 1.6],
        ['Propan', 1.6],
        ['Butan', 1.6],
        ['Metan', 1.6],
        ['Vodík', 1.6],
        ["Vzduch", 2]
    ]);
  
    // Optional; add a title and set the width and height of the chart
    var options = {
        width: 250, 
        height: 200, 
        backgroundColor: 'transparent',
        legend: 'none',
        is3D: true,
        slices: {0: {color: '#7e3b3a'}, 1:{color: '#7e703a'}, 2:{color: '#5a7e3a'}, 3: {color: '#3a7e6b'}, 4:{color: '#3c3a7e'}}
    };
  
    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

function update_temp(){
    let temp = document.getElementsByClassName("val-float")
    ipcRender.send("getdata", "temp")
    ipcRender.on("getdata-reply", (event, data) => {
        temp[0].innerHTML = data
    })
}

function leave(){
    ipcRender.send("actions", "leave")
}

function update_sys(){
    ipcRender.send("actions", "update_system")
}

function update_app(){
    ipcRender.send("actions", "update_application")
}

function turnoff(){
    ipcRender.send("actions", "turnoff")
}

function update_humidity(){
}

function update_graph(){

}

setInterval(update_temp, 3000)