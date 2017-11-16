var actualSection;
const upArrowKey = 38;
const pageUpKey = 33;
const homeKey = 36;
const downArrowKey = 40;
const pageDownKey = 34;
const endKey = 35;

const INTEREST = "Global"
const AGE_RANGE = "16-80";
const COLUMNS = 6;
const ROWS = 4;

var window_width = window.innerWidth;
var window_height = window.innerHeight;

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
box_width = window_width - margin.left - margin.right,
box_height = window_height - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, box_width/COLUMNS])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([box_height/ROWS, 0]);

var chart;
var data = {};
var chart_visible = false;
var colors = d3.scaleOrdinal(d3.schemeCategory10);


$(document).ready(function(){
  actualSection = 1;
  totalModules = $('.module').size();
  carregarDados("data.csv");
});

$('html').keydown(function(e){
	if (e.which == pageDownKey || e.which == downArrowKey) {
		if (actualSection == totalModules) {
			actualSection = 1;
			$('html, body').animate({ scrollTop: $("#section" + actualSection).offset().top }, 'slow');
		}
		else {
			actualSection = actualSection + 1;
			$.when($("html, body").animate({ scrollTop: $("#section" + actualSection).offset().top }, 'slow')).then(function() {
				if (actualSection == 5 && !chart_visible) {
          drawMap(box_width/COLUMNS+margin.left+margin.right, box_height/ROWS + margin.top + margin.bottom);
					$.when(drawBars()).then(function() {
						drawValues();
            $("#map").animate({opacity : "1"}, 2000);
					});
					chart_visible = true;
				}
			});
		}
	}
	else if (e.which == pageUpKey || e.which == upArrowKey) {
		if (actualSection == 1 || e.which == endKey) {
			actualSection = totalModules;
			$('html, body').animate({ scrollTop: $("#section" + actualSection).offset().top }, 'slow');
		}
		else {
			actualSection = actualSection - 1;
			$('html, body').animate({ scrollTop: $("#section" + actualSection).offset().top }, 'slow');
		}
	}
});

function carregarDados(file) {
  // get the data
  d3.csv(file, function(error, all_data) {
    if (error) throw error;

    all_data.forEach(function(d) {
      if (d.ages_ranges == AGE_RANGE) {
        if (d.connections in data == false) {
          data[d.connections] = [];
        }

        if (d.interests != "Global") {
          data[d.connections].push({"interests": d.interests, "percentage": calculatePerc(d.audience, d.location_total)});
        }
      }

    });

    drawAxis();

  });
}

function drawAxis() {
    for (var key in data) {
      if (key != "Tepatitlán De Morelos" && key != "Tlajomulco de Zúñiga") {
        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        chart = d3.select("#charts").append("svg")

          .attr("width", box_width/COLUMNS + margin.left + margin.right)
          .attr("height", box_height/ROWS + margin.top + margin.bottom)

          .append("g")
          .attr("id", key.replace(/\s/g, ''))
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Scale the range of the data in the domains
        x.domain(data[key].map(function(d) { return d.interests; }));
        y.domain([0, 50]);
        //y.domain([0, d3.max(data[key], function(d) { return d.percentage; })]);

        // add the x Axis
        chart.append("g")
        .attr("transform", "translate(0," + box_height/ROWS + ")")
        .call(d3.axisBottom(x)).selectAll(".tick").remove();

        // add the y Axis
        chart.append("g")
        .call(d3.axisLeft(y));

        // Add title
        chart.append("svg:text")
         .attr("class", "chartTitle")
         .attr("x", 5)
         .attr("y", 0)
         .text(key.toUpperCase());
    	}
  	}

  	var legendRectSize = 18;
    var legendSpacing = 4;

	var legend = d3.select("#legendas").selectAll('.legend')
          .data(data[key].map(function(d) { return d.interests; }))
          .enter()
          .append('svg')
          .attr('width', "200")
          .attr('height', "30")
          .append('g')
          .attr('class', 'legend');

        legend.append('rect')
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .attr("y", 10)
          .attr("x", 10)
          .style("fill",function(d,i){return colors(i)});

        legend.append('text')
          .attr('x', legendRectSize + legendSpacing)
          .attr('y', legendRectSize - legendSpacing)
          .text(function(d){return d;});

}

function drawBars() {
	for (var key in data) {
    //console.log(key);
  		if (key != "Tepatitlán De Morelos" && key != "Tlajomulco de Zúñiga") {
  			var chart = d3.select("#" + key.replace(/\s/g, ''));
    		// append the rectangles for the bar chart
    		chart.selectAll(".bar")
		    .data(data[key])
		    .enter().append("rect")
		    .attr("class", "bar")

		    .attr("x", function(d) { return x(d.interests); })
		    .attr("width", x.bandwidth())

		    .attr("y", function(d) { return y(0); })
		    .attr("height", 0)

		    .attr("fill",function(d,i){return colors(i)})

		    .transition()
		    .duration(1200)
		    .delay(function (d, i) {
		      return i * 120;
		    })
		    .attr("y", function(d) { return y(d.percentage); })
		    .attr("height", function(d) { return box_height/ROWS - y(d.percentage); });
		}
	}
}

function drawValues() {
	for (var key in data) {
		if (key != "Tepatitlán De Morelos" && key != "Tlajomulco de Zúñiga") {

	 	chart = d3.select("#" + key.replace(/\s/g, ''));

	    chart.selectAll("barValue")
	    .data(data[key])
		.enter()
		.append("text")
		.attr("class", "barValue")
		  .attr("text-anchor", "middle")
		  .attr("opacity", 0)
		  .attr("x", function(d) { return x(d.interests) + (x.bandwidth()/2); })
		  .attr("y", function(d) { return ((d.percentage > 4.5) ? y(d.percentage) + 15 : y(d.percentage) - 5); })
		  .text(function(d) { return Math.round(d.percentage*100)/100 + "%"; });

		}
	}

	d3.selectAll(".barValue").transition().duration(1200).delay(1000).attr("opacity", 1);
}

function calculatePerc(audience, location_total) {
  var result = (audience / location_total) * 100;
  return result;
}

function drawMap (width, height) {
  $("#map").width(width*2);
  $("#map").height((height*2) - 10);

  var center = [40.410527, -3.693791];
  var map = L.map('map').setView(center, 14);
  var layer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png');
  var circle = L.circle(center, { radius: 1, color:"#000", weight: 1 });
  var cCircle = L.circle(center, { radius: 20, color: '#000', weight: 2, fillOpacity: 1});
  map.addLayer(layer);
  map.addLayer(circle);
  map.addLayer(cCircle);

  setTimeout(function() {
    circle.setRadius(1000);
  }, 1500);

}