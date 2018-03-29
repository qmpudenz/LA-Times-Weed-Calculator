/* script.js 
   Author: Stefani Urmas, Alejandra Ramos
   Date: 03/28/2018
*/


// GLOBAL VARIABLES

var selected

// SEARCH BAR FUNCTION (Filtering search results)

function searchbarFilter() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("p")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
        } else {
            li[i].style.display = "none";
        }
    }
}

// LOOP FOR THE WEED LIST

var leng = weed.length;

for (i = 0; i < leng; i++) {

    $("#myUL").append('<li><p class="weed-name" data-id="'+ i +'">'+ weed[i].name +' <span class="strain">'+ weed[i].strain +'</span></p></li>')
}

// BUTTON FUNCTIONS

function buttonOff() {
    $("#cancel").css({"background-color":"#ddd","color":"#111","border":"1px","cursor":"default"});
}

function buttonOn() {
    $("#cancel").css({"background-color":"#FF5443","color":"white","border":"0px","cursor":"pointer"});
}

// SMOKES SLIDER

var slider = document.getElementById("smokes-range");
var output = document.getElementById("weed-amount");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

// SMOKES CALCULATION FUNCTION

function smokesCalculator() {

    $("#myUL").css({"display":"none"});

    buttonOff();

    $("#myInput").attr("placeholder", weed[selected].name);

    $("#myInput").val(weed[selected].name);

    $("#myInput").css({"color":"#FF5443","font-weight":"700"});

    $("#calculate").css({"background-color":"#FF5443","color":"white","cursor":"pointer"});

    $("#weed-info").html('<div class="weed-info-name">'+ weed[selected].name +'</div><div class="weed-info-strain">Strain<span>'+ weed[selected].strain +'</span></div><div class="weed-info-thc">THC<span>'+ weed[selected].thc +' %</span></div><div class="weed-info-cbd">CBD<span>'+ weed[selected].cbd +' %</span></div>')

    var weedAmount = slider.value * 1000; // convert to milligrams
    var thcMaxAmount = parseInt((weedAmount * weed[selected].thc)/100);

    $("#intake-container").css({"display":"block"});

    var smokeIntake = parseInt(thcMaxAmount * 0.38); // 38% efficiency for joints
    var vapeIntake = parseInt(thcMaxAmount * 0.54); // 54% efficiency for vapes
    var bongIntake = parseInt(thcMaxAmount * 0.40); // 40% efficiency for bongs

    var smokeLoss = parseInt(thcMaxAmount - smokeIntake);
    var vapeLoss = parseInt(thcMaxAmount - vapeIntake);
    var bongLoss = parseInt(thcMaxAmount - bongIntake);

    var smokeBar = parseInt((smokeIntake*100)/thcMaxAmount);
    var vapeBar = parseInt((vapeIntake*100)/thcMaxAmount);
    var bongBar = parseInt((bongIntake*100)/thcMaxAmount);

    $(".infographic-container").css({"display":"block"});

    $("#intake-smoke-gray").html('<div id="intake-smoke-orange"></div>');
    $("#intake-vape-gray").html('<div id="intake-vape-orange"></div>');
    $("#intake-bong-gray").html('<div id="intake-bong-orange"></div>');

    $("#intake-smoke-orange").animate({"width": smokeBar + '%'},800);
    $("#intake-vape-orange").animate({"width": vapeBar + '%'},800);
    $("#intake-bong-orange").animate({"width": bongBar + '%'},800);

    $("#intake-smoke-gray").append(smokeLoss + ' mg');
    $("#intake-vape-gray").append(vapeLoss + ' mg');
    $("#intake-bong-gray").append(bongLoss + ' mg');

    $("#intake-smoke-orange").html(smokeIntake + ' mg');
    $("#intake-vape-orange").html(vapeIntake + ' mg');
    $("#intake-bong-orange").html(bongIntake + ' mg');

    $("#legend-max").html('THC max: '+ thcMaxAmount +' mg');

    $("#dosage-amount-smoke").animate({"width": smokeIntake + '%'},800);
    $("#dosage-amount-vape").animate({"width": vapeIntake + '%'},800);
    $("#dosage-amount-bong").animate({"width": bongIntake + '%'},800);

    $("#intake-scale-numb2").html(parseInt(thcMaxAmount * 0.2));
    $("#intake-scale-numb3").html(parseInt(thcMaxAmount * 0.4));
    $("#intake-scale-numb4").html(parseInt(thcMaxAmount * 0.6));
    $("#intake-scale-numb5").html(parseInt(thcMaxAmount * 0.8));
    $("#intake-scale-numb6").html(parseInt(thcMaxAmount * 1));

}

// EDIBLE SLIDERS

// amount
var amountSlider = document.getElementById("amount-range");
var amountOutput = document.getElementById("edibles-amount");
amountOutput.innerHTML = amountSlider.value;

amountSlider.oninput = function() {
amountOutput.innerHTML = this.value;
}

// strength
var strengthSlider = document.getElementById("strength-range");
var strengthOutput = document.getElementById("edibles-strength");
strengthOutput.innerHTML = strengthSlider.value;

strengthSlider.oninput = function() {
strengthOutput.innerHTML = this.value;
}

// portions
var portionsSlider = document.getElementById("portions-range");
var portionsOutput = document.getElementById("edibles-portions");
portionsOutput.innerHTML = portionsSlider.value;

portionsSlider.oninput = function() {
portionsOutput.innerHTML = this.value;
}


// EDIBLES CALCULATING FUNCTION
    
function ediblesCalculator() {
      
    var ediblesTHC = parseInt((amountSlider.value) * (strengthSlider.value/100) / (portionsSlider.value) * 1000); // convert to milligrams

    var ediblesTHCintake = parseInt(ediblesTHC * 0.6); // 60% efficiency for edibles

    var ediblesLoss = parseInt(ediblesTHC - ediblesTHCintake);

    var ediblesBar = parseInt((ediblesTHCintake*100)/ediblesTHC);

    $("#edible-infographic-container").css({"display":"block"});

    $("#edibles-intake-gray").html('<div id="edibles-intake-orange"></div>');

    $("#edibles-intake-orange").animate({"width": ediblesBar + '%'},800);

    $("#edibles-intake-gray").append(ediblesLoss + ' mg');

    $("#edibles-intake-orange").html(ediblesTHCintake + ' mg');

    $("#edibles-legend-max").html('THC max: '+ ediblesTHC +' mg');

    $("#dosage-amount-edibles").animate({"width": ediblesTHCintake + '%'},800);

    $("#edibles-scale-numb2").html(parseInt(ediblesTHC * 0.2)); // x-axis ticks
    $("#edibles-scale-numb3").html(parseInt(ediblesTHC * 0.4));
    $("#edibles-scale-numb4").html(parseInt(ediblesTHC * 0.6));
    $("#edibles-scale-numb5").html(parseInt(ediblesTHC * 0.8));
    $("#edibles-scale-numb6").html(parseInt(ediblesTHC * 1));

}

// ***************************//

$(document).ready(function(){ // begin document.ready block
    
    // SMOOTH AUTO SCROLL
     
    // for smokes
	$(".weed-name").on({
        
        click: function(){

            var scrolly = $("#scrollTarget1").offset().top;
            console.log('scrolly');
            
            $("html, body").animate({
                scrollTop: $("#scrollTarget1").offset().top                
            }, 500);
        }
    });
    
    // for edibles
    $("#amount-range, #strength-range, #portions-range").on({
        
        click: function(){

            var scrolly = $("#scrollTarget2").offset().top;
            console.log('scrolly');
            
            $("html, body").animate({
                scrollTop: $("#scrollTarget2").offset().top                
            }, 500);
        }
    });
    
    // SEARCH SMOKES
    
    $("#myInput").click(function(){
        
        $("#myUL").css({"display":"block"});
        buttonOn();
        
    });
    
    // CANCEL BUTTON
    
    $("#cancel").click(function(){
        
        $("#myUL").css({"display":"none"});
        $("#myInput").html('');
        buttonOff();
        
    });
    
    // CALCULATE SMOKES
    
    // menu item
    $(".weed-name").click(function(){
        
        selected = Number($(this).attr("data-id"));
        smokesCalculator();
        
    });
    
    // smokes slider
    $('#smokes-range').change(function() {
        
        smokesCalculator();
        
    });

    $('#portions-range').trigger('slidechange');
    
    
    //EDIBLES AUTO SUM (TRIGGERED BY SLIDERS)

    // amount slider
    $('#amount-range').change(function() {
        
        var ediblesTHC = parseInt((amountSlider.value) * (strengthSlider.value/100) / (portionsSlider.value) * 1000); // convert to milligrams
    
        var ediblesTHCintake = parseInt(ediblesTHC * 0.6); // 60% efficiency for edibles
        
        $("#edibles-portions-sum span").html(ediblesTHC);
        $("#edibles-portions-intake span").html(ediblesTHCintake);
        ediblesCalculator();
    });

    $('#amount-range').trigger('slidechange');

    // strength slider
    $('#strength-range').change(function() {
        
        var ediblesTHC = parseInt((amountSlider.value) * (strengthSlider.value/100) / (portionsSlider.value) * 1000);
    
        var ediblesTHCintake = parseInt(ediblesTHC * 0.6); // 60% efficiency for edibles
        $("#edibles-portions-sum span").html(ediblesTHC);
        $("#edibles-portions-intake span").html(ediblesTHCintake);
        ediblesCalculator();
    });

    $('#strength-range').trigger('slidechange');
    
    // portions slider
    $('#portions-range').change(function() {
        
        var ediblesTHC = parseInt((amountSlider.value) * (strengthSlider.value/100) / (portionsSlider.value) * 1000);
    
        var ediblesTHCintake = parseInt(ediblesTHC * 0.6); // 60% efficiency for edibles
        $("#edibles-portions-sum span").html(ediblesTHC);
        $("#edibles-portions-intake span").html(ediblesTHCintake);
        ediblesCalculator();
    });

    $('#portions-range').trigger('slidechange');


}); //end document.ready block
