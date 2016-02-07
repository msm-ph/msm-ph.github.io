/*------------------------------------------------------------------
Project:	HighLand
Version:	1.2
Created: 		18/10/2013
Last change:	26/11/2013
-------------------------------------------------------------------*/

// Sign in & sing out nav bar demo. To be removed on an operational website
// ========================================================================
$('#signin-menu').on('click', function() {
	$(this).toggleClass('display-none');
	$("#signup-menu").addClass("display-none");
	$("#cogs-menu").addClass("display-block");
	$("#profile-menu").toggleClass("display-block");
});
$('#signout-menu').on('click', function() {
	$("#signup-menu").removeClass("display-none");
	$("#signin-menu").removeClass("display-none");
	$("#cogs-menu").removeClass("display-block");
	$("#profile-menu").removeClass("display-block");
});

// Search box toggle
// =================
$('#search-btn').on('click', function() {
	$("#search-icon").toggleClass('fa-times margin-2');
	$("#search-box").toggleClass('display-block animated fadeInUp');
});

// Smooth scrolling for UI elements page
// =====================================
$(document).ready(function(){
   $('a[href*=#buttons],a[href*=#panels], a[href*=#info-boards], a[href*=#navs], a[href*=#alerts], a[href*=#thumbnails], a[href*=#social], a[href*=#section-header],a[href*=#page-tip], a[href*=#block-header]').bind("click", function(e){
	  var anchor = $(this);
	  $('html, body').stop().animate({
		 scrollTop: $(anchor.attr('href')).offset().top
	  }, 1000);
	  e.preventDefault();
   });
   return false;
});

// 404 error page smile
// ====================
$('#search-404').on('click', function() {
	$("#smile").removeClass("fa-meh-o");
	$("#smile").addClass("fa-smile-o");
});

// Sign up popovers
// ================
$(function(){
	$('#exampleInputName1').popover();
});

$(function(){
	$('#exampleInputUsername1').popover();
});

$(function(){
	$('#exampleInputEmail1').popover();
});

$(function(){
	$('#exampleInputPassword1').popover();
});

$(function(){
	$('#exampleInputPassword2').popover();
});

// Profile - Status Update 
// =======================

$('#update-status').on('click', function() {
	$(".user-status > p").toggleClass("show hidden");
	$(".user-status > form").toggleClass("hidden show");
	return false;
});

$('.user-status > form > button').on('click', function() {
	$(".user-status > p").toggleClass("show hidden");
	$(".user-status > form").toggleClass("hidden show");
	return false;
});

// Lost password form
//===================

$('.pwd-lost > .pwd-lost-q > a').on('click', function() {
	$(".pwd-lost > .pwd-lost-q").toggleClass("show hidden");
	$(".pwd-lost > .pwd-lost-f").toggleClass("hidden show");
	return false;
});

//Upload 2x2 photo submodal
$('#btnUploadCancel').click(function(){
	$('#upload-avatar').modal('toggle');
});

//Modal Carousel

$('#finish').hide();

$('.btn-modal').click(function(){
	document.getElementById('passInputID').style.display = "none";
    document.getElementById('sirbInputID').style.display = "none";
	if ($(window).width() <= 320){
		$('#prev').removeClass('pull-left');
		$('#prev').css('display', '');
		$('.modal-footer').css('text-align','center');
	}
	else{
		$('#prev').addClass('pull-left');
		$('#prev').css('display', 'block');
		$('.modal-footer').css('text-align','right');
	}
	$('#prev').hide();
});

$('#next').click(function(){
	var enableNext = true;
	if(($('#carousel-example-generic').data('bs.carousel').getActiveIndex())!=3){
		$('input:visible, textarea:visible').each(function(index){
			var length = $('input:visible, textarea:visible').length;
			if($(this).val()==''){
				$('#next').prop('disabled', true);
				enableNext = false;
				return false;
			}
			else if(index==length-1)
				enableNext = true;
		});
	}
	if(enableNext==true){
		$('#prev').show();
		if(($('#carousel-example-generic').data('bs.carousel').getActiveIndex())==5){
			$('#next').hide();
			$('#finish').show();
		}
		else{
			$('#finish').hide();
		}
	}
});

$('#app-form').on('change keyup', function(){
	$('#next').prop('disabled', false);
});

$('#prev').click(function(){
	$('#finish').hide();
	$('#next').show();
	$('#next').prop('disabled', false);
	if(($('#carousel-example-generic').data('bs.carousel').getActiveIndex())==1)
		$('#prev').hide();
});

$('#myModal').on('hidden.bs.modal', function(){
	$('textarea, input, select').val('');
	$('.carousel').carousel(0);
	$(".content-modal").empty();
	$(".content-modal").append(workContent);
});

//Modal Work Experience

var workContent = $(".work-experience").html();

$("#work-button").click(function(){
	$("#work-button").before(workContent);
})

//Home

$('#recent-news p').each(function(index){
	var charCount, readMore, string, newsFilter, newsTitle;
	newsFilter = $('#recent-news .home-filter')[index].getAttribute('id');
	newsTitle = $(this).parent().parent().find('h4').text();
	charCount = $(this).text().length;
//	readMore = $('<a href="news.html#fromHome'+index+'"><button type="button" class="hl-btn hl-btn-blue pull-right open-news" onClick="showNews('+index+')">Read more</button></a>');
	if(charCount > 560){
		string = $(this).text().slice(0, 560);
		$(this).text(string+"...");
		$(this).parent().append(readMore);
	}
});

// News

$(function(){
	$('#news-title').text($('#filters').find('h4').first().text());
});

function readMore(newsTitle){
	location.href='#top';
	$('#news-title').text(newsTitle);
}

$('#filters p').each(function(index){
	var charCount, readMore, string, newsFilter, newsTitle;
	newsFilter = $('#filters li')[index].getAttribute('data-filter');
	newsTitle = $(this).parent().parent().find('h4').text();
	charCount = $(this).text().length;
	readMore = $('<button type="button" class="hl-btn hl-btn-blue pull-right filter" data-filter="'+newsFilter+'" onClick="readMore(\''+newsTitle+'\')">Read more</button>');
	if(charCount > 560){
		string = $(this).text().slice(0, 560);
		$(this).text(string+"...");
		$(this).parent().append(readMore);
	}
});
	
$('.filter').on('click', function(){
	$('#filters').children().show();
	var newsSelector = $(this).parents('.news-list');
	newsSelector.hide();
});

$('.img-news').on('click', function(){
	if($(this).is('#img-news1'))
		$('button[data-filter="news1"]').trigger("click");
	else if($(this).is('#img-news2'))
		$('button[data-filter="news2"]').trigger("click");
	else
		$('button[data-filter="news3"]').trigger("click");
});

//Passport and SIRB disable function - Javascript//

function enableDisablePass(){
	var passInput = document.getElementById('checkboxOne').checked;

	if (passInput==0){
		document.getElementById('passInputID').style.display = "none";
	}
	else
	{
		document.getElementById('passInputID').style.display = "block";
	}
}


function enableDisableSirb(){
	var sirbInput = document.getElementById('checkboxTwo').checked;

	if (sirbInput==0){
		document.getElementById('sirbInputID').style.display = "none";
	}
	else
	{
		document.getElementById('sirbInputID').style.display = "block";
	}
}


// On load
//===================
window.onload = function(){
	$('#Grid').mixitup({
    	showOnLoad: 'news1',
    	transitionSpeed: 800
    });
    if(location.hash=='#fromHome1')
		$('button[data-filter="news2"]').trigger("click");
	else if(location.hash=='#fromHome2')
		$('button[data-filter="news3"]').trigger("click");
	else
		$('button[data-filter="news1"]').trigger("click");
	$('#slider').nivoSlider({
		manualAdvance: true
	});
}

$(window).load(function() {
    $('#slider').nivoSlider();
});

//Responsiveness
$(window).resize(function() {
	if ($(window).width() <= 320){
		$('#prev').removeClass('pull-left');
		$('#prev').css('display', '');
		$('.modal-footer').css('text-align','center');
	}
	else{
		$('#prev').addClass('pull-left');
		$('#prev').css('display', 'block');
		$('.modal-footer').css('text-align','right');
	}
});

//** jQuery Scroll to Top Control script- (c) Dynamic Drive DHTML code library: http://www.dynamicdrive.com.
//** Available/ usage terms at http://www.dynamicdrive.com (March 30th, 09')
//** v1.1 (April 7th, 09'):
//** 1) Adds ability to scroll to an absolute position (from top of page) or specific element on the page instead.
//** 2) Fixes scroll animation not working in Opera. 


var scrolltotop={
	//startline: Integer. Number of pixels from top of doc scrollbar is scrolled before showing control
	//scrollto: Keyword (Integer, or "Scroll_to_Element_ID"). How far to scroll document up when control is clicked on (0=top).
	setting: {startline:100, scrollto: 0, scrollduration:1000, fadeduration:[500, 100]},
	controlHTML: '<div class="scrolltotop"><i class="fa fa-angle-up"></i></div>', //HTML for control, which is auto wrapped in DIV w/ ID="topcontrol"
	controlattrs: {offsetx:5, offsety:5}, //offset of control relative to right/ bottom of window corner
	anchorkeyword: '#top', //Enter href value of HTML anchors on the page that should also act as "Scroll Up" links

	state: {isvisible:false, shouldvisible:false},

	scrollup:function(){
		if (!this.cssfixedsupport) //if control is positioned using JavaScript
			this.$control.css({opacity:0}) //hide control immediately after clicking it
		var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto)
		if (typeof dest=="string" && jQuery('#'+dest).length==1) //check element set by string exists
			dest=jQuery('#'+dest).offset().top
		else
			dest=0
		this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
	},

	keepfixed:function(){
		var $window=jQuery(window)
		var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx
		var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety
		this.$control.css({left:controlx+'px', top:controly+'px'})
	},

	togglecontrol:function(){
		var scrolltop=jQuery(window).scrollTop()
		if (!this.cssfixedsupport)
			this.keepfixed()
		this.state.shouldvisible=(scrolltop>=this.setting.startline)? true : false
		if (this.state.shouldvisible && !this.state.isvisible){
			this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0])
			this.state.isvisible=true
		}
		else if (this.state.shouldvisible==false && this.state.isvisible){
			this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1])
			this.state.isvisible=false
		}
	},
	
	init:function(){
		jQuery(document).ready(function($){
			var mainobj=scrolltotop
			var iebrws=document.all
			mainobj.cssfixedsupport=!iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest //not IE or IE7+ browsers in standards mode
			mainobj.$body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body')
			mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+'</div>')
				.css({position:mainobj.cssfixedsupport? 'fixed' : 'absolute', bottom:mainobj.controlattrs.offsety, right:mainobj.controlattrs.offsetx, opacity:0, cursor:'pointer'})
				.attr({title:'Scroll Back to Top'})
				.click(function(){mainobj.scrollup(); return false})
				.appendTo('body')
			if (document.all && !window.XMLHttpRequest && mainobj.$control.text()!='') //loose check for IE6 and below, plus whether control contains any text
				mainobj.$control.css({width:mainobj.$control.width()}) //IE6- seems to require an explicit width on a DIV containing text
			mainobj.togglecontrol()
			$('a[href="' + mainobj.anchorkeyword +'"]').click(function(){
				mainobj.scrollup()
				return false
			})
			$(window).bind('scroll resize', function(e){
				mainobj.togglecontrol()
			})
		})
	}
}

scrolltotop.init()

