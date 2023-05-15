/* script.js 
   Author: Stefani Urmas, Kristine de Leon, Alejandra Ramos
   Date: 04/11/2018
*/


// GLOBAL VARIABLES

var selectedWeed
var selectedEdible
var ediblesTHC

// SMOKES (interactive 1): SEARCH BAR FUNCTION, filtering the list when typing

function searchbarFilter() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    
    // Filtering search results
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("p")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
        } else {
            li[i].style.display = "none";
        }
    }
}

// LOOP FOR THE SMOKES/WEED LIST

// creating list items
for (i = 0; i < weed.length; i++) {
    $("#myUL").append('<li><p class="weed-name" data-id="'+ i +'">'+ weed[i].name +' <span class="strain">'+ weed[i].strain +'</span></p></li>')
}

// LOOP FOR THE EDIBLES LIST: creating list items

// creating list items
for (i = 0; i < edibles.length; i++) {
    $("#myUL-edibles").append('<li><p class="edible-name" data-id="'+ i +'">'+ edibles[i].product +'</p></li>')
}

// CANCEL BUTTON FUNCTIONS, SMOKES

function button1Off() {
    $("#cancel1").css({"background-color":"#ddd","color":"#111","border":"1px","cursor":"default"});
}

function button1On() {
    $("#cancel1").css({"background-color":"#FF5443","color":"white","border":"0px","cursor":"pointer"});
}

// CANCEL BUTTON FUNCTIONS, EDIBLES

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

    // styling the input field
    $("#myInput").css({"color":"#FF5443","font-family":"'Benton Gothic SemiBold', Arial, serif", "font-size":"18px"});
    $(".input-container").css({"margin-bottom":"10px"});
    
    // styling the cancel button
    $("#calculate").css({"background-color":"#FF5443","color":"white","cursor":"pointer"});

    // creating the weed info table
    $("#weed-info").html('</div><div class="weed-info-strain">Cepa<span>'+ weed[selectedWeed].strain +'</span></div><div class="weed-info-thc">THC<span>'+ parseInt(weed[selectedWeed].thc) +' % <span class="thc-strength"></span></span></div><div class="weed-info-cbd">CBD <span class="cbd-strength"></span><span>'+ weed[selectedWeed].cbd +' %</span></div>')
    
    // checking how strong is the THC content
    if (weed[selectedWeed].thc < 10 ) {
        $("#weed-info span.thc-strength").html('(bajo)')
    } else if (weed[selectedWeed].thc > 10 && weed[selectedWeed].thc < 15 ) {
        $("#weed-info span.thc-strength").html('(medio)')
    } else if (weed[selectedWeed].thc > 15 && weed[selectedWeed].thc < 20 ) {
        $("#weed-info span.thc-strength").html('(alto)')
    } else if (weed[selectedWeed].thc > 20 ) {
        $("#weed-info span.thc-strength").html('(muy alto)')
    }
    
    // checking how strong is the CBD content
    if (weed[selectedWeed].cbd < 1 ) {
        $("#weed-info span.cbd-strength").html('(bajo)')
    } else if (weed[selectedWeed].cbd > 1 && weed[selectedWeed].thc < 5 ) {
        $("#weed-info span.cbd-strength").html('(medio)')
    } else if (weed[selectedWeed].cbd > 5 ) {
        $("#weed-info span.cbd-strength").html('(alto)')
    }
    
    var weedAmount = slider.value * 1000; // convert to milligrams
    var thcMaxAmount = parseInt((weedAmount * weed[selectedWeed].thc)/100); // counting the maximum possible thc amount for the selected weed

    $("#intake-container").css({"display":"block"});

    var smokeIntake = parseInt(thcMaxAmount * 0.37); // 37% efficiency for joints
    var bongIntake = parseInt(thcMaxAmount * 0.40); // 40% efficiency for bongs
    var vapeIntake = parseInt(thcMaxAmount * 0.54); // 54% efficiency for vapes
    
    // storing calculations into variables
    var smokeLoss = parseInt(thcMaxAmount - smokeIntake);
    var bongLoss = parseInt(thcMaxAmount - bongIntake);
    var vapeLoss = parseInt(thcMaxAmount - vapeIntake);
    
    var smokeBar = parseInt((smokeIntake*100)/thcMaxAmount);
    var bongBar = parseInt((bongIntake*100)/thcMaxAmount);
    var vapeBar = parseInt((vapeIntake*100)/thcMaxAmount);
    
    $(".infographic-container").css({"display":"block"});
    
    $("#weed-label span").html(weed[selectedWeed].name);

    // creating bars
    $("#intake-smoke-gray").html('<div id="intake-smoke-orange"></div>');
    $("#intake-bong-gray").html('<div id="intake-bong-orange"></div>');
    $("#intake-vape-gray").html('<div id="intake-vape-orange"></div>');
    
    // animating bars
    $("#intake-smoke-orange").animate({"width": smokeBar + '%'},800);
    $("#intake-bong-orange").animate({"width": bongBar + '%'},800);
    $("#intake-vape-orange").animate({"width": vapeBar + '%'},800);
    
    // thc loss and intake
    $("#intake-smoke-gray").append(smokeLoss + ' mg');
    $("#intake-bong-gray").append(bongLoss + ' mg');
    $("#intake-vape-gray").append(vapeLoss + ' mg');
    
    $("#intake-smoke-orange").html(smokeIntake + ' mg');
    $("#intake-bong-orange").html(bongIntake + ' mg');
    $("#intake-vape-orange").html(vapeIntake + ' mg');
    
    $("#legend-max").html('THC máx: '+ thcMaxAmount +' mg');
    
    // dosage amounts
    $("#dosage-amount-smoke").animate({"width": smokeIntake + '%'},800);
    $("#dosage-amount-bong").animate({"width": bongIntake + '%'},800);
    $("#dosage-amount-vape").animate({"width": vapeIntake + '%'},800);
    
    // dosage graph x-axis
    $("#intake-scale-numb2").html(parseInt(thcMaxAmount * 0.2));
    $("#intake-scale-numb3").html(parseInt(thcMaxAmount * 0.4));
    $("#intake-scale-numb4").html(parseInt(thcMaxAmount * 0.6));
    $("#intake-scale-numb5").html(parseInt(thcMaxAmount * 0.8));
    $("#intake-scale-numb6").html(parseInt(thcMaxAmount * 1));

}

// EDIBLE SLIDER

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

    $("#myInput-edibles").css({"color":"#FF5443","font-family":"'Benton Gothic SemiBold', Arial, serif", "font-size":"18px"});
    $(".input-container").css({"margin-bottom":"10px"});
    
    $("#calculate2").css({"background-color":"#FF5443","color":"white","cursor":"pointer"});

    // creating an info table for edibles
    $("#edibles-info").html('</div><div class="weed-info-strain">Peso por '+ edibles[selectedEdible].productSpecific +'<span>'+ edibles[selectedEdible].americanServing +'</span></div><div class="weed-info-thc">THC<span>'+ edibles[selectedEdible].thcTotal +' mg</span></div><div class="weed-info-cbd"><a href="'+ edibles[selectedEdible].linktoSource +'">Leer más sobre el producto</a></div>') 
    
    $("#dosage-amount-edibles").html('<span>'+ edibles[selectedEdible].product +'</span>');
    
    // checking if the unit should be in plural form
    if (amountSlider.value > 1) {
        $("#edibles-value-grams").html('<span>'+ edibles[selectedEdible].unit +'s</span>');
    } else {
        $("#edibles-value-grams").html('<span>'+ edibles[selectedEdible].unit +'</span>');
    }
    
    ediblesTHC = parseInt((amountSlider.value)*(edibles[selectedEdible].thcTotal));
    
    $("#dosage-amount-edibles").animate({"width": ediblesTHC + '%'},800);
    
    $("#edibles-slider").css({"display":"block"});
}

// BEGING DOCUMENT.READY BLOCK

$(document).ready(function(){ 
    
    // PRE-SELECTED SMOKES: selects the Blue Dream product, shows the info box, slider and graphs when the document is ready
    selectedWeed = 28; // Blue Dream
    smokesCalculator();
    
    // PRE-SELECTED EDIBLES: selects the Cookie product, shows the info box, slider and graphs when the document is ready
    selectedEdible = 0; // Cookie

    $("#edibles-amount").html('<span>'+ edibles[selectedEdible].suggestedValue +'</span>');
    
    $("#amount-range").attr('max', ''+ edibles[selectedEdible].maxValue +'');
    $("#amount-range").attr('step', ''+ edibles[selectedEdible].step +'');
    $("#amount-range").attr('value', ''+ edibles[selectedEdible].suggestedValue +'');
    
    console.log(edibles[selectedEdible].suggestedValue);
    console.log(amountSlider.value);
    
    ediblesCalculator();
    
    // SMOOTH AUTO SCROLL: takes the user to the charts after clicking a weed/edible name
     
    // for smokes, interactive 1
	$(".weed-name").on({
        click: function(){
            $("html, body").animate({
                scrollTop: $("#scrollTarget1").offset().top -10                
            }, 500);
        }
    });
    
    // for edibles, interactive 2
	$(".edible-name").on({
        click: function(){
            $("html, body").animate({
                scrollTop: $("#scrollTarget2").offset().top -10 
            }, 500);
        }
    });
    
     
    // SEARCH SMOKES: reveals the dropdown menu
    
    $("#myInput").click(function(){
        $("#myUL").css({"display":"block"});
        button1On();
    });
    
    // SEARCH EDIBLES: reveals the dropdown menu
    
    $("#myInput-edibles").click(function(){
        $("#myUL-edibles").css({"display":"block"});
        button2On();
    });
    
    // CANCEL BUTTON, SMOKES: hides the dropdown menu and clears the input field
    
    $("#cancel1").click(function(){
        $("#myUL").css({"display":"none"});
        $("#myInput").html('');
        button1Off();
    });
    
    // CANCEL BUTTON, EDIBLES: hides the dropdown menu and clears the input field
    
    $("#cancel2").click(function(){
        $("#myUL-edibles").css({"display":"none"});
        $("#myInput-edibles").html('');
        button2Off();
    });
    
    // CALCULATE SMOKES: triggers the smokesCalculator function
    
    // menu item
    $(".weed-name").click(function(){
        selectedWeed = Number($(this).attr("data-id"));
        smokesCalculator();
    });
    
    // smokes slider
    $('#smokes-range').change(function() {
        smokesCalculator();
    });

    $('#smokes-range').trigger('slidechange');
    
    // CALCULATE EDIBLES (TRIGGERED BY DROPDOWN MENU)
    
    // menu item
    $(".edible-name").click(function(){
        selectedEdible = Number($(this).attr("data-id"));
        
        $("#edibles-amount").html('<span>'+ edibles[selectedEdible].suggestedValue +'</span>');

        $("#amount-range").attr('max', ''+ edibles[selectedEdible].maxValue +'');
        $("#amount-range").attr('step', ''+ edibles[selectedEdible].step +'');
        $("#amount-range").attr('value', ''+ edibles[selectedEdible].suggestedValue +'');
        
        amountSlider.value = edibles[selectedEdible].suggestedValue;
        
        console.log(edibles[selectedEdible].suggestedValue);
        console.log(amountSlider.value);
        
        ediblesCalculator();
        
    });
    
    // CALCULATE EDIBLES (TRIGGERED BY SLIDERS)

    // edibles slider
    $('#amount-range').change(function() {
        
        var ediblesTHC = parseInt((amountSlider.value)*(edibles[selectedEdible].thcTotal));
            
        $("#edibles-amount").html('<span>'+ amountSlider.value +'</span>');

        $("#amount-range").attr('max', ''+ edibles[selectedEdible].maxValue +'');
        $("#amount-range").attr('step', ''+ edibles[selectedEdible].step +'');
        
        ediblesCalculator();
        
        console.log(amountSlider.value);
    });

    $('#amount-range').trigger('slidechange');


}); //end document.ready block
