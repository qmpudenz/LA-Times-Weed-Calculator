/* script.js 
   Author: Stefani Urmas
   Date:
*/


// SEARCH BAR FUNCTION

function myFunction() {
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

// SLIDER

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}



$(document).ready(function(){ // begin document.ready block
    
    // SMOOTH SCROLL
    
        
	$("#calculate").on({
        
        click: function(){

            var scrolly = $("#weed-info").offset().top;
            console.log('scrolly');
            
            $("html, body").animate({
                scrollTop: $("#weed-info").offset().top                
            }, 500);
        }
    });
    
    
    // SEARCH
    
    $("#myInput").click(function(){
        $("#myUL").css({"display":"block"});
        buttonOn();
    });
    

    $("#calculate").click(function(){
        $("#myUL").css({"display":"none"});
        buttonOff();
    });
    
    $(".weed-name").click(function(){
      
        selected = Number($(this).attr("data-id"));
        $("#myUL").css({"display":"none"});
        buttonOff();
                
        $("#myInput").attr("placeholder", weed[selected].name);
        
        $("#myInput").val(weed[selected].name);
        
        $("#myInput").css({"color":"#FF5443","font-weight":"700"});
        
        $("#calculate").css({"background-color":"#FF5443","color":"white","cursor":"pointer"});
        
    });
        
    // CALCULATE
        
    $("#calculate").click(function(){
        
        $("#weed-info").html('<div class="weed-info-name">'+ weed[selected].name +'</div><div class="weed-info-strain">Strain<span>'+ weed[selected].strain +'</span></div><div class="weed-info-thc">THC<span>'+ weed[selected].thc +' %</span></div><div class="weed-info-cbd">CBD<span>'+ weed[selected].cbd +' %</span></div>')
        
        var weedAmount = slider.value * 1000; // convert to milligrams
        var thcMaxAmount = (weedAmount * weed[selected].thc)/100;

        
        $("#intake-container").css({"display":"block"});
        
        var smokeIntake = parseInt(thcMaxAmount * 0.3);
        var vapeIntake = parseInt(thcMaxAmount * 0.4);
        var eatIntake = parseInt(thcMaxAmount * 0.5);
        
        var smokeLoss = parseInt(thcMaxAmount - smokeIntake);
        var vapeLoss = parseInt(thcMaxAmount - vapeIntake);
        var eatLoss = parseInt(thcMaxAmount - eatIntake);
        
        var smokeBar = parseInt((smokeIntake*100)/thcMaxAmount);
        var vapeBar = parseInt((vapeIntake*100)/thcMaxAmount);
        var eatBar = parseInt((eatIntake*100)/thcMaxAmount);
        
        $(".infographic-container").css({"display":"block"});
        
        $("#intake-smoke-gray").html('<div id="intake-smoke-orange"></div>');
        $("#intake-vape-gray").html('<div id="intake-vape-orange"></div>');
        $("#intake-eat-gray").html('<div id="intake-eat-orange"></div>');
        
        $("#intake-smoke-orange").animate({"width": smokeBar + '%'},800);
        $("#intake-vape-orange").animate({"width": vapeBar + '%'},800);
        $("#intake-eat-orange").animate({"width": eatBar + '%'},800);
        
        $("#intake-smoke-gray").append(smokeLoss + ' mg');
        $("#intake-vape-gray").append(vapeLoss + ' mg');
        $("#intake-eat-gray").append(eatLoss + ' mg');
        
        $("#intake-smoke-orange").html(smokeIntake + ' mg');
        $("#intake-vape-orange").html(vapeIntake + ' mg');
        $("#intake-eat-orange").html(eatIntake + ' mg');
        
        $("#legend-max").html('THC max: '+ thcMaxAmount +' mg');

        
        $("#dosage-amount-smoke").animate({"width": smokeIntake + '%'},800);
        $("#dosage-amount-vape").animate({"width": vapeIntake + '%'},800);
        $("#dosage-amount-eat").animate({"width": eatIntake + '%'},800);
        
        $("#intake-scale-numb2").html(parseInt(thcMaxAmount * 0.2));
        $("#intake-scale-numb3").html(parseInt(thcMaxAmount * 0.4));
        $("#intake-scale-numb4").html(parseInt(thcMaxAmount * 0.6));
        $("#intake-scale-numb5").html(parseInt(thcMaxAmount * 0.8));
        $("#intake-scale-numb6").html(parseInt(thcMaxAmount * 1));
        
    });
    
    
    
    
    
    
    

}); //end document.ready block
