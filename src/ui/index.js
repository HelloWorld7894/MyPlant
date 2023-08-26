//init setup
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


//code for drawing charts
function drawChart() {
    var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work', 8],
    ['Eat', 2],
    ['TV', 4],
    ['Gym', 2],
    ['Sleep', 8]
  ]);
  
    // Optional; add a title and set the width and height of the chart
    var options = {
        width:690, 
        height:400, 
        backgroundColor: 'transparent', 
        textStyle:{
            color: 'white',
            fontSize: 30
        },
        is3D: true
    };
  
    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }