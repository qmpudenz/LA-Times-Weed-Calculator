/* script.js 
   Author: Stefani Urmas, Alejandra Ramos
   Date: 03/28/2018
*/


// GLOBAL VARIABLES

var selectedWeed
var selectedEdible

// SMOKES (interactive 1): SEARCH BAR FUNCTION (Filtering search results)

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

// EDIBLES (interactive 2): SEARCH BAR FUNCTION (Filtering search results)

//function searchbarFilter() {
//    var input, filter, ul, li, a, i;
//    input = document.getElementById("myInput-edibles");
//    filter = input.value.toUpperCase();
//    ul = document.getElementById("myUL-edibles");
//    li = ul.getElementsByTagName("li");
//    
//    for (i = 0; i < li.length; i++) {
//        a = li[i].getElementsByTagName("p")[0];
//        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
//            li[i].style.display = "block";
//        } else {
//            li[i].style.display = "none";
//        }
//    }
//}

// LOOP FOR THE SMOKES/WEED LIST

var leng = weed.length;

for (i = 0; i < leng; i++) {

    $("#myUL").append('<li><p class="weed-name" data-id="'+ i +'">'+ weed[i].name +' <span class="strain">'+ weed[i].strain +'</span></p></li>')
}

// LOOP FOR THE EDIBLES LIST

var leng = edibles.length;

for (i = 0; i < leng; i++) {

    $("#myUL-edibles").append('<li><p class="edible-name" data-id="'+ i +'">'+ edibles[i].product +' <span class="edibles-specs">'+ edibles[i].americanServing +'</span></p></li>')
}

// BUTTON FUNCTIONS, SMOKES

function button1Off() {
    $("#cancel1").css({"background-color":"#ddd","color":"#111","border":"1px","cursor":"default"});
}

function button1On() {
    $("#cancel1").css({"background-color":"#FF5443","color":"white","border":"0px","cursor":"pointer"});
}

// BUTTON FUNCTIONS, EDIBLES

function button2Off() {
    $("#cancel2").css({"background-color":"#ddd","color":"#111","border":"1px","cursor":"default"});
}

function button2On() {
    $("#cancel2").css({"background-color":"#FF5443","color":"white","border":"0px","cursor":"pointer"});
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

    button1Off();

    $("#myInput").attr("placeholder", weed[selectedWeed].name);

    $("#myInput").val(weed[selectedWeed].name);

    $("#myInput").css({"color":"#FF5443","font-family":"Benton Gothic Bold", "font-size":"18px"});
    $(".input-container").css({"margin-bottom":"10px"});
    
    $("#calculate").css({"background-color":"#FF5443","color":"white","cursor":"pointer"});

    $("#weed-info").html('</div><div class="weed-info-strain">Strain<span>'+ weed[selectedWeed].strain +'</span></div><div class="weed-info-thc">THC<span>'+ weed[selectedWeed].thc +' %</span></div><div class="weed-info-cbd">CBD<span>'+ weed[selectedWeed].cbd +' %</span></div>')

    var weedAmount = slider.value * 1000; // convert to milligrams
    var thcMaxAmount = parseInt((weedAmount * weed[selectedWeed].thc)/100);

    $("#intake-container").css({"display":"block"});

    var smokeIntake = parseInt(thcMaxAmount * 0.38); // 37% efficiency for joints
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

var amountSlider = document.getElementById("amount-range");
var amountOutput = document.getElementById("edibles-amount");
amountOutput.innerHTML = amountSlider.value;

amountSlider.oninput = function() {
amountOutput.innerHTML = this.value;
}


// EDIBLES CALCULATING FUNCTION
    
function ediblesCalculator() {
      
    $("#myUL-edibles").css({"display":"none"});

    button2Off();

    $("#myInput-edibles").attr("placeholder", edibles[selectedEdible].product);

    $("#myInput-edibles").val(edibles[selectedEdible].product);

    $("#myInput-edibles").css({"color":"#FF5443","font-family":"Benton Gothic Bold", "font-size":"18px"});
    $(".input-container").css({"margin-bottom":"10px"});
    
    $("#calculate2").css({"background-color":"#FF5443","color":"white","cursor":"pointer"});

    $("#edibles-info").html('</div><div class="weed-info-strain">Weight per unit/item<span>'+ edibles[selectedEdible].servingSize +' '+ edibles[selectedEdible].servingSizeUnits +'</span></div><div class="weed-info-thc">THC per unit/item<span>'+ edibles[selectedEdible].thcTotal +' mg</span></div><div class="weed-info-cbd">Suggested dosage:<span>'+ edibles[selectedEdible].suggestedDosage +'</span></div>')

    var ediblesTHC = parseInt((amountSlider.value)*(edibles[selectedEdible].thcTotal));

    $("#edibles-selection-container").css({"display":"block"});
    
    $("#dosage-amount-edibles").animate({"width": ediblesTHC + '%'},800);

    $("#edibles-scale-numb2").html(parseInt(ediblesTHC * 0.2)); // x-axis ticks
    $("#edibles-scale-numb3").html(parseInt(ediblesTHC * 0.4));
    $("#edibles-scale-numb4").html(parseInt(ediblesTHC * 0.6));
    $("#edibles-scale-numb5").html(parseInt(ediblesTHC * 0.8));
    $("#edibles-scale-numb6").html(parseInt(ediblesTHC * 1));
    
    $("#dosage-amount-edibles").html('<span>'+ edibles[selectedEdible].product +'</span>');
    
//    $("#edibles-amount").html('<span>'+ dibles[selectedEdible].suggestedValue +'</span>');
    $("#edibles-value-grams").html('<span>'+ edibles[selectedEdible].unit +'</span>');
    
    $("#amount-range").attr('max', ''+ edibles[selectedEdible].maxValue +'');
    $("#amount-range").attr('step', ''+ edibles[selectedEdible].step +'');
    $("#amount-range").attr('value', ''+ edibles[selectedEdible].suggestedValue +'');
    
    $("#edibles-slider").css({"display":"block"});
    
//    console.log(amountSlider.value);
}

// ***************************//

$(document).ready(function(){ // begin document.ready block
    
    

    
    // SMOOTH AUTO SCROLL
     
    // for smokes, interactive 1
	$(".weed-name").on({
        
        click: function(){

            var scrolly = $("#scrollTarget1").offset().top;
            console.log('scrolly');
            
            $("html, body").animate({
                scrollTop: $("#scrollTarget1").offset().top                
            }, 500);
        }
    });
    
    // for edibles, interactive 2
//	$(".edible-name").on({
//        
//        click: function(){
//
//            var scrolly = $("#scrollTarget2").offset().top;
//            console.log('scrolly');
//            
//            $("html, body").animate({
//                scrollTop: $("#scrollTarget2").offset().top                
//            }, 500);
//        }
//    });
    
    // for edibles
//    $("#amount-range, #strength-range, #portions-range").on({
//        
//        click: function(){
//
//            var scrolly = $("#scrollTarget2").offset().top;
//            console.log('scrolly');
//            
//            $("html, body").animate({
//                scrollTop: $("#scrollTarget2").offset().top                
//            }, 500);
//        }
//    });
    
    // SEARCH SMOKES
    
    $("#myInput").click(function(){
        
        $("#myUL").css({"display":"block"});
        button1On();
        
    });
    
    // SEARCH EDIBLES
    
    $("#myInput-edibles").click(function(){
        
        $("#myUL-edibles").css({"display":"block"});
        button2On();
        
    });
    
    // CANCEL BUTTON, SMOKES
    
    $("#cancel1").click(function(){
        
        $("#myUL").css({"display":"none"});
        $("#myInput").html('');
        button1Off();
        
    });
    
    // CANCEL BUTTON, EDIBLES
    
    $("#cancel2").click(function(){
        
        $("#myUL-edibles").css({"display":"none"});
        $("#myInput-edibles").html('');
        button2Off();
        
    });
    
    // CALCULATE SMOKES
    
    // menu item
    $(".weed-name").click(function(){
        
        selectedWeed = Number($(this).attr("data-id"));
        smokesCalculator();
        
    });
    
    // smokes slider
    $('#smokes-range').change(function() {
        
        smokesCalculator();
        
    });

    $('#portions-range').trigger('slidechange');
    
    // CALCULATE EDIBLES
    
    // menu item
    $(".edible-name").click(function(){
        
        selectedEdible = Number($(this).attr("data-id"));
        ediblesCalculator();
        
    });
    
    // smokes slider
    $('#smokes-range').change(function() {
        
        smokesCalculator();
        
    });

    $('#portions-range').trigger('slidechange');
    
    
    
    
    
    //EDIBLES AUTO SUM (TRIGGERED BY SLIDERS)

    // amount slider
    $('#amount-range').change(function() {
        
        var ediblesTHC = parseInt((amountSlider.value)*(edibles[selectedEdible].thcTotal));
    
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
