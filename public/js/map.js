google.load('visualization', '1', {'packages':['geochart']});
  google.setOnLoadCallback(drawRegionsMap);
  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
      ['State', 'Reps'],
      ['Alabama', 2],
    ['Alaska', 2],
    ['American Samoa', 2],
    ['Arizona', 2],
    ['Arkansas', 2],
    ['California', 2],
    ['Colorado', 2],
    ['Connecticut', 2],
    ['Delaware', 2],
    ['District of Columbia', 2],
    ['Florida', 2],
    ['Georgia', 2],
    ['Guam', 2],
    ['Hawaii', 2],
    ['Idaho', 2],
    ['Illinois', 2],
    ['Indiana', 2],
    ['Iowa', 2],
    ['Kansas', 2],
    ['Kentucky', 2],
    ['Louisiana', 2],
    ['Maine', 2],
    ['Maryland', 2],
    ['Massachusetts', 2],
    ['Michigan', 2],
    ['Minnesota', 2],
    ['Mississippi', 2],
    ['Missouri', 10],
    ['Montana', 2],
    ['Nebraska', 2],
    ['Nevada', 2],
    ['New Hampshire', 2],
    ['New Jersey', 2],
    ['New Mexico', 2],
    ['New York', 2],
    ['North Carolina', 2],
    ['North Dakota', 2],
    ['Northern Marianas Islands', 2],
    ['Ohio', 2],
    ['Oklahoma', 2],
    ['Oregon', 2],
    ['Pennsylvania', 2],
    ['Puerto Rico', 2],
    ['Rhode Island', 2],
    ['South Carolina', 2],
    ['South Dakota', 2],
    ['Tennessee', 2],
    ['Texas', 2],
    ['Utah', 2],
    ['Vermont', 2],
    ['Virginia', 2],
    ['Virgin Islands', 2],
    ['Washington', 2],
    ['West Virginia', 2],
    ['Wisconsin', 2],
    ['Wyoming', 2]
 ]);

    var options = {
        colorAxis: {colors: ['#f5f5f5','#428bca']},
        legend: 'Visits',
        region: "US",
        resolution: 'provinces',
        backgroundColor:{
                    fill: '#f5f5f5', 
                    stroke: '#428bca', 
                    strokeWidth: 5},
        width: 750
    };

    var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
    chart.draw(data, options);
    
    google.visualization.events.addListener(chart, 'select', function() {
        var selectionIdx = chart.getSelection()[0].row;
        var stateName = data.getValue(selectionIdx, 0);
        window.location.replace('rep_profile/' + stateName);
    });            
  }