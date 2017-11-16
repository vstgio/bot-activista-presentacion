var actualSection;
const nextSlideKeys = [9, 13, 34, 35, 39, 40];
const prevSlideKeys = [8, 33, 36, 37, 38];

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
var animation_running = false;


$(document).ready(function(){
  actualSection = 1;
  totalModules = $('.module').length;
  carregarDados("data.csv");

  $('html').keydown(function(e){
  	if (nextSlideKeys.indexOf(e.which) !== -1) {
      e.preventDefault();
  		if (actualSection == totalModules) {
  			actualSection = 1;
  			$('html, body').animate({ scrollTop: $("#section" + actualSection).offset().top }, 'slow');
  		}
  		else {
  			actualSection = actualSection + 1;
  			$.when($("html, body").animate({ scrollTop: $("#section" + actualSection).offset().top }, 'slow')).then(function() {
  				if (actualSection == 7 && !chart_visible) {
            drawMap(box_width/COLUMNS+margin.left+margin.right, box_height/ROWS + margin.top + margin.bottom);
  					$.when(drawBars()).then(function() {
  						drawValues();
              $("#map").animate({opacity : "1"}, 2000);
  					});
  					chart_visible = true;
          }
          if (actualSection == 8 && !animation_running) {
            animation_running = true;
            startAnimation();
          }
  			});
  		}
  	}
  	else if (prevSlideKeys.indexOf(e.which) !== -1) {
      e.preventDefault();
      if (actualSection == 1) {
        actualSection = totalModules;
        $('html, body').animate({ scrollTop: $("#section" + actualSection).offset().top }, 'slow');
      }
  		actualSection = actualSection - 1;
  		$('html, body').animate({ scrollTop: $("#section" + actualSection).offset().top }, 'slow');
  	}
  });

});

function startAnimation() {
  console.log('startAnimation() - GO');
  setTimeout(function () {
    $('g#Navbar').show().addClass('animated fadeInUp');
    $('g#your-region').show().addClass('animated fadeInRight');
  }, 100);
  setTimeout(function () {
    $('g#Map g#Map-layer').show();
    $('g#Map g#Markers').hide();
    $('g#Map').show().addClass('animated fadeInUp')
  }, 1000);
  setTimeout(function () {
    $('g#Map g#Markers').show().addClass('animated fadeIn bounce');
  }, 1800);
  setTimeout(function () {
    $('g#Map g#Markers').removeClass('fadeIn');
    $('g#Map g#Markers').show().addClass('animated infinite bounce');
    $('g#Interests').show();
  }, 2300);
  setTimeout(function () {
    $('g#books').show().addClass('animated fadeInLeft');
  }, 2500);
  setTimeout(function () {
    $('g#Head').show().addClass('animated fadeInUp');
  }, 2600);
  setTimeout(function () {
    $('g#eco').show().addClass('animated fadeInLeft');
  }, 2700);
  setTimeout(function () {
    $('g#health').show().addClass('animated fadeInLeft');
  }, 2900);
  setTimeout(function () {
    $('g#row1').show().addClass('animated bounceInUp');
  }, 3100);
  setTimeout(function () {
    $('g#row2').show().addClass('animated bounceInUp');
  }, 3250);
  setTimeout(function () {
    $('g#row3').show().addClass('animated bounceInUp');
    $('path#line3').show().addClass('animated fadeIn');
  }, 3450);
  setTimeout(function () {
    $('path#line4').show().addClass('animated fadeIn');
    $('g#Idea1').show().addClass('animated fadeInUpBig');
  }, 4150);
  setTimeout(function () {
    $('g#Idea1').show().removeClass();
    $('path#line4').removeClass()
    $('g#Idea1').show().addClass('animated bounceOutUp');
    $('path#line4').addClass('animated fadeOut');
  }, 7600);
  setTimeout(function () {
    //In
    $('path#line2').show().addClass('animated fadeIn');
    $('g#Idea2').show().addClass('animated fadeInUpBig');
  }, 8100);
  setTimeout(function () {
    //OUT
    $('g#Idea2').show().removeClass();
    $('path#line2').removeClass()
    $('g#Idea2').show().addClass('animated bounceOutUp');
    $('path#line2').addClass('animated fadeOut');
  }, 11100);
  setTimeout(function () {
    $('path#line1').show().addClass('animated fadeIn');
    $('g#Idea3').show().addClass('animated fadeInUpBig');
  }, 11300);
  setTimeout(function () {
    $('g#Idea3').show().removeClass();
    $('path#line1').removeClass()
    $('g#Idea3').show().addClass('animated bounceOutUp');
    $('path#line1').addClass('animated fadeOut');
  }, 14800);
  setTimeout(function () {
    $('g#your-region').removeClass();
    $('g#Map').removeClass();
    $('g#Interests').removeClass();
    $('g#Table').removeClass();
    $('g#your-region').addClass('animated fadeOutRight');
    $('g#Map').addClass('animated bounceOutLeft');
    $('g#Interests').addClass('animated bounceOutDown');
    $('g#Table').addClass('animated fadeOutRight');
  }, 15000);
  setTimeout(function () {
    $('g#your-competition').show().addClass('animated fadeInRight');
    $('#box-suggestion').show().addClass('animated fadeInLeft');
    $('#text-title-suggetion').show().addClass('animated bounceInUp');
  }, 16000);
  setTimeout(function () {
    $('#text-suggestion1').show().addClass('animated zoomInLeft');
  }, 17000);
  setTimeout(function () {
    $('#dismiss').show().addClass('animated fadeInLeft');
    $('#save-suggestion').show().addClass('animated fadeInRight');
  }, 18000);
  setTimeout(function () {
    $('#button-they').show().addClass('animated bounceIn');
  }, 18500);
  setTimeout(function () {
    $('#save-suggestion').removeClass();
    $('#save-suggestion').addClass('animated flash infinite');
    $('#fullstar-added').show().addClass('animated zoomInRight');
  }, 19000);
  setTimeout(function () {
    $('#button-you').show().addClass('animated bounceIn');
  }, 20500);
  setTimeout(function () {
    $('#text-added').show().addClass('animated fadeInRight');
  }, 20000);
  setTimeout(function () {
    $('#graph-lines').show().addClass('animated bounceIn');
  }, 22500);
  setTimeout(function () {
    $('#text-suggestion1').removeClass();
    $('#text-suggestion1').addClass('animated zoomOutUp');
  }, 23000);
  setTimeout(function () {
    $('#text-suggestion2').show().addClass('animated zoomInDown');
  }, 24000);
  setTimeout(function () {
    $('#button-evaluate').show().addClass('animated fadeInRight');
  }, 25000);
  setTimeout(function () {
    $('#text-review').show().addClass('animated fadeInDown');
  }, 26000);
  setTimeout(function () {
    $('g#suggestion').addClass('animated zoomOut');
    $('g#graph').addClass('animated bounceOutLeft');
    $('g#actionadded').addClass('animated fadeOutRight');
    $('g#your-competition').addClass('animated fadeOutRight');
  }, 29700);
  setTimeout(function () {
    $('g#your-audience').show().addClass('animated fadeInRight');
    $('#table-header-audience').show().addClass('animated fadeIn');
  }, 30500);
  setTimeout(function () {
    $('#row1_1_').show().addClass('animated fadeInDown');
    $('#user-text1').show().addClass('animated bounceInRight');
  }, 32000);
  setTimeout(function () {
    $('#row2_1_').show().addClass('animated fadeInDown');
  }, 34500);
  setTimeout(function () {
    $('#user-text2').show().addClass('animated bounceInRight');
  }, 35000);
  setTimeout(function () {
    $('#user-text2').show().addClass('animated bounceInRight');
    $('#row3_1_').show().addClass('animated fadeInDown');
  }, 37000);
  setTimeout(function () {
    $('#user-text3').show().addClass('animated bounceInRight');
  }, 38000);
  setTimeout(function () {
    $('#row4').show().addClass('animated fadeInDown');
  }, 39500);
  setTimeout(function () {
    $('g#user-table').addClass('animated fadeOutLeft');
    $('g#your-audience').addClass('animated fadeOutRight');
    $('g#navbar').addClass('animated fadeOutDownBig');
  }, 43700);
  setTimeout(function () {
    console.log('Animation ended. Restarting');
    $('svg g').removeClass();
    $('svg path').removeClass();
    $('#Navbar').hide();
    $('#your-region').hide();
    $('g#Map g#Map-layer').hide();
    $('g#Map g#Markers').hide();
    $('g#Map').hide();
    $('g#Interests').hide();
    $('g#books').hide();
    $('g#Head').hide();
    $('g#eco').hide();
    $('g#health').hide();
    $('g#row1').hide();
    $('g#row2').hide();
    $('g#row3').hide();
    $('g#Idea1').hide();
    $('g#Idea2').hide();
    $('g#Idea3').hide();
    $('path#line1').hide();
    $('path#line2').hide();
    $('path#line3').hide();
    $('path#line4').hide();
    $('g#your-competition').hide();
    $('#box-suggestion').hide();
    $('#text-title-suggetion').hide();
    $('#text-suggestion1').hide();
    $('#dismiss').hide();
    $('#save-suggestion').hide();
    $('#button-they').hide();
    $('#fullstar-added').hide();
    $('#button-you').hide();
    $('#text-added').hide();
    $('#graph-lines').hide();
    $('#text-suggestion1').hide();
    $('#text-suggestion2').hide();
    $('#button-evaluate').hide();
    $('#text-review').hide();
    $('g#your-audience').hide();
    $('#table-header-audience').hide();
    $('#row1_1_').hide();
    $('#row2_1_').hide();
    $('#row3_1_').hide();
    $('#row4').hide();
    $('#user-text1').hide();
    $('#user-text2').hide();
    $('#user-text3').hide();
    startAnimation();
    animation_running = false;
  }, 45000);
}

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
        // chart.append("g")
        // .attr("transform", "translate(0," + box_height/ROWS + ")")
        // .call(d3.axisBottom(x)).selectAll(".tick").remove();

        // add the y Axis
        // chart.append("g")
        // .call(d3.axisLeft(y));

        // Add title
        chart.append("svg:text")
         .attr("class", "chartTitle")
         .attr("x", 0)
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
		  .attr("y", function(d) { return ((d.percentage > 4.5) ? y(d.percentage) + 20 : y(d.percentage) - 10); })
      .attr("fill", function(d) { return ((d.percentage > 4.5) ? 'white' : 'black'); })
		  .text(function(d) { return (Math.round(d.percentage*100)/100).toFixed(1) + "%"; });

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

  var center = [40.414851, -3.699927];
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
