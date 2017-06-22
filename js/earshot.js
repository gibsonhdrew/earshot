var AMBIENTNOISE, AUDIOSOUND;
var AUDIOPLAYING = false;
var audioentry, tablebutton, tbltm;

$( document ).ready(function() {

	var deviceheight = $(window).height();
	var devicewidth = $(window).width();
	var current_pg = '';
	var $viewfinder = $('.viewfinder');
	var $bottombar = $('.bottombar');
	var $concentric = $('.concentric');
	tbltm = new TimelineMax({repeat:500}).pause();


	//for refresh
	var hash = location.hash.slice(1).replace(/^\/|\/$/g, '');
	$('body').attr('page',hash);
	var hashclass = '.'+hash;
	// console.log(hash);

	if(devicewidth < 700){
		$('a#home').attr('href','#/pg_about');
		$('body').attr('slidemenu', 'true');
	}else{
		$('a#home').attr('href','#/game');
		$('body').attr('slidemenu', 'false');
	}

	if($.browser.mobile){
		$('a#home').attr('href','#/pg_about');
		$('a#enter-href').attr('href','#/pg_about');
		$('.enter-mssg #instruct').html('').html('Please visit our website on a non-mobile device for the full audio experience');
	}

	$viewfinder.css({'height':deviceheight,'width':devicewidth});
	$viewfinder.scrollTop(2000).scrollLeft(150);

	AMBIENTNOISE = document.createElement('audio');
	AMBIENTNOISE.setAttribute('src', audioObj.mainsrc);
	AMBIENTNOISE.volume = .6;//volume put back up
	AMBIENTNOISE.loop = true;

	AUDIOSOUND = document.createElement('audio');	

	var circarray = $('#game .concentric');
	var tl = new TimelineMax({repeat:500}).pause();
	tl.staggerTo(circarray,.8,{opacity:0,width:"5em",height:"5em",left:"-1.6em",top:"-1.6em"},.3);

	//for refresh
	if($('body').attr('slidemenu') == "true"){
		$('.menu').addClass('expand');
	}

	if(hash == ""){
		$('.full-screen').css({'display':'block'});
	}
	if(hash == 'game' || hash == 'pg_about' || hash == 'pg_tickets' || hash == 'pg_collaborators' || hash == 'pg_supporters' || hash == 'pg_contact'){
		$('.full-screen').css({'display':'none'});
		if(hash == 'game'){
			$('.toplayer, .v-mask').css({'display':'none'});
			$('.viewfinder').css({'overflow':'auto'});
			$('#exp-audio').html('').html('MUTE AUDIO');
			AMBIENTNOISE.play();
			tl.play();
			console.log("OUT");
		}else{
			console.log("IN");
			AMBIENTNOISE.pause();
			tl.progress(0).pause();
	 		tbltm.pause().progress(0);
 			$('.table .sound').removeClass('playing-sound');
			$('#exp-audio').html('').html('PLAY AUDIO');
			if(AUDIOSOUND.src)AUDIOSOUND.pause();
			$('.toplayer, .v-mask').css({'display':'block'});
			$('.viewfinder').css({'overflow':'hidden'});

			var offset = $(hashclass).position().top;
			if(hashclass != ".pg_about"){
				offset = offset + 118;
			}
			$('body, html').css({scrollTop: offset});
		}
	}else{
		if($.browser.mobile){
			// window.location.hash = "pg_about";
		}else{
			// window.location.hash = "game";
		}
	}

	window.addEventListener('hashchange', function() {
		hash = location.hash.slice(1).replace(/^\/|\/$/g, '');
		$('body').attr('page',hash);
		hashclass = '.'+hash;
		// console.log(hash);

		if($('body').attr('slidemenu') == "true"){
			$('.menu').addClass('expand');
		}

		if(hash == ""){
			$('.full-screen').css({'display':'block'});
			$('.viewfinder').css({'overflow':'hidden'});
			tl.progress(0).pause();
			AMBIENTNOISE.pause();
			if(AUDIOSOUND.src)AUDIOSOUND.pause();

		}
		if(hash == 'game' || hash == 'pg_about' || hash == 'pg_tickets' || hash == 'pg_collaborators' || hash == 'pg_supporters' || hash == 'pg_contact'){
			$('.full-screen').css({'display':'none'});
			if(hash == 'game'){
				$('.toplayer, .v-mask').css({'display':'none'});
				$('.viewfinder').css({'overflow':'auto'});
				AMBIENTNOISE.play();
				tl.play();
				$('#exp-audio').html('').html('MUTE AUDIO');
				console.log("OUT");
			}else{
				console.log("IN");
				AMBIENTNOISE.pause();
				tl.progress(0).pause();
	 			tbltm.pause().progress(0);
 				$('.table .sound').removeClass('playing-sound');
 				$('.table .table-text').removeClass('opacity1');
				AUDIOSOUND.src = "";

				$('#exp-audio').html('').html('PLAY AUDIO');
				$('.viewfinder').css({'overflow':'hidden'});

				if(AUDIOSOUND.src)AUDIOSOUND.pause();
				$('.toplayer, .v-mask').css({'display':'block'});

				var offset = $(hashclass).position().top;
				if(hashclass != ".pg_about"){
					offset = offset + 118;
				}
				$('body, html').animate({scrollTop: offset}, 1200);
			}
		}else{
			if($.browser.mobile){
				// window.location.hash = "pg_about";
			}else{
				// window.location.hash = "game";
			}
		}
	
	}, false);


	audioentry = Object.keys(audioObj);

	for(var i = 2; i < audioentry.length; i++){
		var entryname = audioentry[i];
		var entryobj = audioObj[entryname];
		var castname = entryobj.cast;
		var stoolx, stooly;
		$('#'+entryname).append("<div class='table-text table-author'>written by <span>"+entryobj.author+"</span></div>");
		for(var ii = 0; ii < castname.length; ii++){
			if(castname[ii].x && castname[ii].y){
				stoolx = castname[ii].x;
				stooly = castname[ii].y;
			}else{
				stoolx = 0;
				stooly = 0;
			}
			$('#'+entryname).append("<div class='stool' id='actor"+ii+entryname+"' style='left:"+stoolx+"em; top:"+stooly+"em'><div class='table-text'><span id='realname'>"+castname[ii].actor+"</span><br/> as <span>"+castname[ii].character+"</span></div></div>");
		}
		// console.log(audioentry[i]);
	}
	
	$(window).resize(function(){
		deviceheight = $(window).height();
		devicewidth = $(window).width();
		$viewfinder.css({'height':deviceheight,'width':devicewidth});
		if(devicewidth > 700){
			$('.menu').removeClass('expand');
			$('a#home').attr('href','#/game');
			$('body').attr('slidemenu', 'false');
		}else{
			$('a#home').attr('href','#/pg_about');
			$('body').attr('slidemenu', 'true');
		}
	});

	//Bio expansion

	$('body').on('click', '.bio-button h6', function(el){
		var biop = $(this).parent();
		var bioheight = $(this).siblings('p').height()+33;
		$(biop).toggleClass('bio-expanded');
		$(this).children('span.plusminus').toggleClass('minus');
		if($(biop).hasClass('bio-expanded')){
			$(biop).css({'height':bioheight});
		}else{
			$(biop).css({'height':'3.3em'});
		}
	});

	AUDIOSOUND.addEventListener('ended', function() {
		AUDIOSOUND.load();		
		AUDIOSOUND.src = "";
 		tbltm.pause().progress(0);
 		$('.table .sound').removeClass('playing-sound');
 		$('.table .table-text').removeClass('opacity1');
	});

	//Note firefox reload problem
 	$('body').on('click', '.table', function(el){	
 		var scriptid = $(this).attr('id');

 		if(AUDIOSOUND.src == audioObj[scriptid].mainsound){
 			console.log('src already set');
 			return;
 		}else{
 			AUDIOSOUND.load();
			AUDIOSOUND.volume = 1;//volume put back up
			AUDIOSOUND.setAttribute('src', audioObj[scriptid].mainsound);

	 		$('.table .sound').removeClass('playing-sound');
 			$('.table .table-text').removeClass('opacity1');
	 		tbltm.progress(0).clear();
	 		tablebutton = $(this).children('.sound-container').children('.concentric');

	 		$(this).children('.sound-container').children('.sound').addClass('playing-sound');
	 		$(this).find('.table-text').addClass('opacity1');

	 		tbltm.play();
			tbltm.to(tablebutton,0,{opacity:1,width:"1.8em",height:"1.8em",left:-2,top:-1},0)
				.staggerTo(tablebutton,.8,{opacity:0,width:"5em",height:"5em",left:"-1.6em",top:"-1.6em"},.3);
			
			AUDIOSOUND.play();	
		}

 		return;
	});

});




