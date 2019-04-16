/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */

document.addEventListener('DOMContentLoaded',() =>{
	
	
	
	window.onscroll= ()=>{
		
		const nav_value = document.querySelector('.top-nav-wrapper').offsetHeight;
		const second_nav = document.querySelector('.second-nav');
		const list_burger = document.querySelector('.icon > li');
		
		if( window.scrollY >= nav_value){
			
			
			second_nav.classList.add('open');
			
			list_burger.classList.add('open');
		//second_nav.style.backgroundColor= "red";
		}
		else{
			second_nav.classList.remove('open');
			list_burger.classList.remove('open');
			//document.querySelector('.icon').remove('open');
		}
	};
});




 document.querySelector('.burger-list').onclick = ()=>{
	 document.querySelector('.sidebar').classList.toggle('side');
 };

	
	
	
	
	



function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

var carousel = document.getElementById('carousel');
var slides = 3;
var speed = 7000; // 5 seconds

function carouselHide(num) {
    indicators[num].setAttribute('data-state', '');
    slides[num].setAttribute('data-state', '');

    slides[num].style.opacity=0;
}

function carouselShow(num) {
    indicators[num].checked = true;
    indicators[num].setAttribute('data-state', 'active');
    slides[num].setAttribute('data-state', 'active');

    slides[num].style.opacity=1;
}

function setSlide(slide) {
    return function() {
        // Reset all slides
        for (var i = 0; i < indicators.length; i++) {
            indicators[i].setAttribute('data-state', '');
            slides[i].setAttribute('data-state', '');
            
            carouselHide(i);
        }

        // Set defined slide as active
        indicators[slide].setAttribute('data-state', 'active');
        slides[slide].setAttribute('data-state', 'active');
        carouselShow(slide);

        // Stop the auto-switcher
        clearInterval(switcher);
    };
}

function switchSlide() {
    var nextSlide = 0;

    // Reset all slides
    for (var i = 0; i < indicators.length; i++) {
        // If current slide is active & NOT equal to last slide then increment nextSlide
        if ((indicators[i].getAttribute('data-state') == 'active') && (i !== (indicators.length-1))) {
            nextSlide = i + 1;
        }

        // Remove all active states & hide
        carouselHide(i);
    }

    // Set next slide as active & show the next slide
    carouselShow(nextSlide);
}

if (carousel) {
    var slides = carousel.querySelectorAll('.slide');
    var indicators = carousel.querySelectorAll('.indicator');

    var switcher = setInterval(function() {
        switchSlide();
    }, speed);

    for (var i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener("click", setSlide(i));
    }
}