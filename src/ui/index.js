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
        width:690, 
        height:400, 
        backgroundColor: 'transparent',
        legend: 'none',
        is3D: true,
        slices: {0: {color: '#7e3b3a'}, 1:{color: '#7e703a'}, 2:{color: '#5a7e3a'}, 3: {color: '#3a7e6b'}, 4:{color: '#3c3a7e'}}
    };
  
    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }