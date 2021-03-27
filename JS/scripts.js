window.onload = function(){
    init();
}

// Declare Variables here
var backgroundElem, staticEffectElem, noiseEffectElem, scanLineOneElem, scanLineTwoElem, heroSectionElem, heroLogoElem, sectionElems, allSectionElems;
var windowHeight;
var waypoints;

function init(){
    console.log("%cInitializing...","color:#999");

    waypoints = new NavWaypoints(document.querySelector("nav.side-nav"));
    projectManager = new ProjectManager();

    addEvents();
    gatherNodes();
    setupSections();
    // Set Interval
    var animations = setInterval(animationHandler, 100);
}

/**
* GATHER NODES
* ----------------------------------------------------------------------------------
* Gathers up all of the Nodes on init and sets them to variables
* --------------------------------------------------------------------------------*/
function gatherNodes(){
    windowHeight = window.innerHeight;
    backgroundElem = document.getElementById("background");
    staticEffectElem = document.getElementById("static-effect");
    noiseEffectElem = document.getElementById("noise-effect");
    scanLineOneElem = backgroundElem.querySelector("hr:first-of-type");
    scanLineTwoElem = backgroundElem.querySelector("hr:last-of-type");

    heroSectionElem = document.querySelector("section.hero");
    allSectionElems = document.querySelectorAll("section");
    heroLogoElem = document.querySelector(".hero-logo");
    sectionElems = document.querySelectorAll("section:not(.hero)");
}

function addEvents(){
    window.addEventListener("scroll",debounce(scrollHandler,50));
}

function setupSections(){
    for(let i = 0; i < sectionElems.length; i++){
        sectionElems[i].style.minHeight = windowHeight+"px";
    }
}

/**
* ANIMATION HANDLER
* ----------------------------------------------------------------------------------
* This function controls all of the Animations that go on in the background
*   of the page
* --------------------------------------------------------------------------------*/
function animationHandler(){

    // Background
    handleStaticEffects(staticEffectElem);
    handleNoiseEffects(noiseEffectElem);
    moveScanLine(scanLineOneElem,1);
    moveScanLine(scanLineTwoElem,4);

    // Hero
    handleLogoEffects(heroLogoElem);
    modJitter(heroSectionElem.querySelector(".scroll-arrow"),15,"rotate(45deg)");

    // Sections
}

/**
* MOVE SCAN LINE
* ----------------------------------------------------------------------------------
* There are scan lines that move across the back of the screen, and this function
*   moves them
* ----------------------------------------------------------------------------------
* @param {Node}    line    The Node Element for the hr
* @param {Number}  delta   The Number of pixels to move the line
* --------------------------------------------------------------------------------*/
function moveScanLine(line,delta){
    let prevTop = line.offsetTop;

    if(prevTop > windowHeight) prevTop = -5;
    line.style.top = (prevTop + delta) + "px";
}

/**
* STATIC EFFECT HANDLER
* ----------------------------------------------------------------------------------
* The static in the background is a randomized grain
* ----------------------------------------------------------------------------------
* @param {Node}    elem    The Node Element of the Static Elem
* --------------------------------------------------------------------------------*/
function handleStaticEffects(elem){
    let rando = Math.floor(Math.random() * 6) + 1;
    elem.style.backgroundImage = `url('MEDIA/EFFECTS/static${rando}.png')`;
}

/**
* HANDLE NOISE EFFECTS
* ----------------------------------------------------------------------------------
* There are sporatic noise effects handled by this
* ----------------------------------------------------------------------------------
* @param {Node}    elem    The Node Element for the Noise Effect Elem
* --------------------------------------------------------------------------------*/
function handleNoiseEffects(elem){
    let randoChance = Math.floor(Math.random() * 100);
    if(randoChance <= 85){
        let randoImg = Math.floor(Math.random() * 5) + 1;
        elem.style.backgroundImage = `url('MEDIA/EFFECTS/dmg${randoImg}.png')`;
    } else{
        elem.style.backgroundImage = 'none';
    }
}


function handleLogoEffects(elem){
    let randoOne = Math.floor(Math.random() * 40);
    if(randoOne % 20 == 0){
        let randoX = Math.floor(Math.random() * 5);
        let randoY = Math.floor(Math.random() * 5);
        elem.style.transform = `translate(${randoX}px,${randoY}px)`;
    } else{
        elem.style.transform = "translate(0,0)";
    }

    modJitter(heroLogoElem.querySelector(`.red-logo`),2);
    modJitter(heroLogoElem.querySelector(`.green-logo`),2);
    modJitter(heroLogoElem.querySelector('.blue-logo'),2);

    if(randoOne % 40 == 0){
        Math.floor(Math.random()*2) % 2 == 0 ? elem.querySelector(".white-logo").setAttribute("src","MEDIA/LogoWhiteOffright.svg") : elem.querySelector(".white-logo").setAttribute("src","MEDIA/LogoWhiteOffleft.svg");
    } else{
        elem.querySelector(".white-logo").setAttribute("src","MEDIA/LogoWhite.svg");
    }

    modScale(elem.querySelector(".white-logo"),50,1.25);
}

/**
* MOD JITTER
* ----------------------------------------------------------------------------------
* When you want something to jitter, which only moves 1-2 pixels in a direction
* ----------------------------------------------------------------------------------
* @param {Node}     elem        The Node Element for the Scale Effect
* @param {Number}   chance      The chance 1 in X that the effect will trigger
* @param {String}   oldTrans    Any Transitions that existed on the element before effects
* --------------------------------------------------------------------------------*/
function modJitter(elem,chance, oldTrans){
    let randoChance = Math.floor(Math.random() * chance) + 1;

    let randoX = Math.floor(Math.random() * 4) * (Math.round(Math.random()) ? 1 : -1);
    let randoY = Math.floor(Math.random() * 4) * (Math.round(Math.random()) ? 1 : -1);

    let transformString = randoChance % chance == 0 ? `translate(${randoX}px,${randoY}px)` : 'translate(0,0)'

    elem.style.transform = oldTrans ? transformString + " " + oldTrans : transformString;
}

/**
* MOD SCALE
* ----------------------------------------------------------------------------------
* When you want to handle a Scale Transform
* ----------------------------------------------------------------------------------
* @param {Node}     elem    The Node Element for the Scale Effect
* @param {Number}   chance  The chance 1 in X that the effect will trigger
* @param {Number}   scale   The scale to modify the Element by
* @param {String}   oldTrans    Any Transitions that existed on the element before effects
* --------------------------------------------------------------------------------*/
function modScale(elem, chance, scale, oldTrans){
    let rando = Math.floor(Math.random() * chance);

    let transformString = rando % chance == 0 ? `scale(${scale})` : "scale(1)";

    elem.style.transform = oldTrans ? transformString + " " + oldTrans : transformString;
}

/**
* IS ELEMENT ON SCREEN
* ----------------------------------------------------------------------------------
* Checks if the element in question is currently visible on the screen
* ----------------------------------------------------------------------------------
* @param {Node}     elem    The Node Element for the Scale Effect
* --------------------------------------------------------------------------------*/
function isElementOnScreen(elem){

}

/**
* SCROLL HANDLER
* ----------------------------------------------------------------------------------
* Handles all that silly scrolling
* ----------------------------------------------------------------------------------
* @param {Event}    e   Standard event param
* --------------------------------------------------------------------------------*/
function scrollHandler(e){
    let scroll = window.scrollY;
    waypoints.setCurrent(findCurrentSection(scroll));
}

/**
* FIND CURRENT SECTION
* ----------------------------------------------------------------------------------
* Checks the scroll position to the sections, to determine which one is currently
*   scrolled to
* ----------------------------------------------------------------------------------
* @param {Number}   scroll   The current Window scroll position
* @returns  The current section Elem
* --------------------------------------------------------------------------------*/
function findCurrentSection(scroll){
    let currentSection;
    let modScroll = scroll + (windowHeight / 2);

    for(let i = 0; i < allSectionElems.length; i++){
        let section = allSectionElems[i];
        let sectionTop = section.getBoundingClientRect().top + scroll;
        let nextTop = (i+1) < allSectionElems.length ? allSectionElems[i+1].getBoundingClientRect().top + modScroll : 100000;
        if(modScroll > sectionTop && modScroll < nextTop) currentSection = section;
    }

    return currentSection;
}

// Utilities


/**
* DEBOUNCE
* ----------------------------------------------------------------------------------
* This code was taken from the internet - from Underscore.js
* It only calls your event function every X number of miliseconds
* ----------------------------------------------------------------------------------
* @param {Function} func        The function being debounced
* @param {Number}   wait        The time to wait between each call
* @param {Boolean}  immediate   If true, function calls on leading edge, rather than following
* --------------------------------------------------------------------------------*/
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};