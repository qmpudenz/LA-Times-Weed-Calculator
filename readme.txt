JOUR-555 Advanced Coding for Storytelling - Final Assignment

LA TIMES WEED CALCULATOR
Alejandra Ramos, Kristine de Leon and Stefani Urmas

-------------------------------
*-*-* Project description *-*-*
-------------------------------
 
For our story, we did exhaustive research so that we could explain, in simple and accurate words, how much THC is consumed when smoking or eating weed. During our planning process, we needed to read a lot of articles and research papers to be able to make the calculators.
 
In developing the calculator, we found two open source datasets that we decided to merge: one containing strain data and one containing THC and CBD  data. We used Python to clean and merge the data. We then exported the dataset to a .csv file, which we then converted into a JSON file. From the merged database (weed.json), we took a subset to show to the user: Strain, THC percentage, and CBD percentage.
 
For the edible calculator, we collected dosage information of ten different products into a database (edibles.json). We used the THC values and portion sizes as the base of calculations.
 
The content ingested in each way to consume weed was based on different studies and research papers, as well as the effects and the dosage suggestions.
 
The three of us worked really hard to accomplish and spend a lot of time together to solve all the challenges we face during the process.
 
----------------------------
*-*-* Code description *-*-*
---------------------------- 

/// Html structure ///
 
<header> Headlines and the byline
<section class="text-section"> First text passage
<section class="graphics-section"> THC calculator
<section class="text-section"> Second text passage (including the svg effect graph)
<section class="graphics-section"> Edible calculator
 
/// Interactives: THC calculator ///
 
1. We merged two weed databases, cleaned up the data and created the weed.json file. (index.html line 438)
2. We coded an input form (dropdown menu id="myInput") for the weed product selection using "for loops". We added a filter feature to help finding products from the long list. You can find the javascript code from the script.js file (lines 22–31).
3. We set the Blue Dream product as a pre-selected product (script.js lines 225–227).
4. We created the weed information table that shows the strain and THC and CBD values of the selected product. (script.js lines 96-97 in the smokesCalculator()  function).
5. We added some if-else statement to tell the user how strong (low, medium, high, very high) is the selected weed product (script.js lines 99–107).
6. We created a slider <input id="smokes-range"> so that the user can change the amount of weed he/she is planning to use.
7. We created two dynamic infographics that show 1) the THC amount when using joint, bong or vaporizer and 2) the effect of the dosage among different user types. We made the bar charts more engaging by animating the bars (js lines 146–149), and we added the loss and intake numbers onto the bars (js lines 151–158). You can find the calculations on the script.js file (lines 124–135)
 
/// Interactives: Edible calculator ///
 
1. We collected a sample set of weed edibles and inputted all the data into the edible.json database. (index.html line 439)
2. We copied the THC dropdown menu scripts and tweaked them a bit for the edible listing.
3. We set a cookie product as a pre-selected product (script.js lines 229–239).
4. We created the edible information table that shows the weight, THC value and read more link to the selected product. (script.js line 203).
5. We added some if-else statement to see if the selected amount is above 1 (the unit should be written in a plural form) or below 1 (the unit should be written in a singular form). Script.js lines 207–218.
6. We created a slider <input id="amount-range"> so that the user can change the amount of the edible product he/she is planning to use.
7. We copied the THC dosage chart and tweaked it to show the effect of the selected amount of edible. You can find the calculations on the script.js file (lines 309–347)
 
-----------------
*-*-* Links *-*-*
----------------- 

Here is our complete file on Git Hub:
https://github.com/StefUrmas/LA-Times-Weed-Calculator

The LA Times URL:
http://www.latimes.com/projects/la-me-weed-101-thc-calculator/
 
Here is the Google Drive with all the text edits and some of the questions of the LA Times team:
https://docs.google.com/document/d/1tR1lsQun4Wpj2UK6HY_8QpZqB2HWshaFPra8HHqHpDs/edit?usp=sharing
