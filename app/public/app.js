let data

setTimeout(function () {
  $('.app_scroll').perfectScrollbar()
}, 10);

setTimeout(function () {
  data = 'Hey. Enter your magnet to start your torrent download. =)'
  $('.app_container').append('<div class="bubble_bot"><div class="bubble_bot_avatar fade-in one"></div><div class="bubble bubble_bot_message animation-target">'+data+'</div></div>')
  $(".app_scroll").scrollTop( $( ".app_scroll" ).prop( "scrollHeight" ) );
  $(".app_scroll").perfectScrollbar('update');
}, 100)

setTimeout(function () {
  data = 'Or add torrent file'
  $('.app_container').append('<div class="bubble_bot"><div class="bubble bubble_bot_button animation-target">'+data+'</div></div>')
  $(".app_scroll").scrollTop( $( ".app_scroll" ).prop( "scrollHeight" ) );
  $(".app_scroll").perfectScrollbar('update');
}, 200)

setTimeout(function () {
  data = 'magnet:?xt=urn:btih:ef330b39f4801d25b4245212e75a38634bfc856e'
  $('.app_container').append('<div class="bubble_user"><div class="bubble bubble_user_message animation-target-2">'+data+'</div></div>')
  $(".app_scroll").scrollTop( $( ".app_scroll" ).prop( "scrollHeight" ) );
  $(".app_scroll").perfectScrollbar('update');
}, 800)

setTimeout(function () {
  data = '<div class="bubble_user_icon"></div>'
  $('.app_container').append('<div class="bubble_user"><div class="bubble bubble_user_message animation-target-2">'+data+'</div></div>')
  $(".app_scroll").scrollTop( $( ".app_scroll" ).prop( "scrollHeight" ) );
  $(".app_scroll").perfectScrollbar('update');
}, 800)

setTimeout(function () {
  data = 'Thank’s. I work on it.'
  $('.app_container').append('<div class="bubble_bot"><div class="bubble_bot_avatar fade-in one"></div><div class="bubble bubble_bot_message animation-target">'+data+'</div></div>')
  $(".app_scroll").scrollTop( $( ".app_scroll" ).prop( "scrollHeight" ) );
  $(".app_scroll").perfectScrollbar('update');
}, 1000)

setTimeout(function () {
  $('.app_container').append('<div class="bubble_bot animation-target"><div class="bubble bubble_bot_message bubble_bot_dl"><div class="bubble_bot_dl_icon_dl"></div><div class="bubble_bot_dl_display"><div class="bubble_bot_dl_bar"></div><div class="bubble_bot_dl_bar_back"></div><div class="bubble_bot_dl_display_text">Torrent File<span>00:33</span></div></div></div></div>')
  $(".app_scroll").scrollTop( $( ".app_scroll" ).prop( "scrollHeight" ) );
  $(".app_scroll").perfectScrollbar('update');
}, 1100)

setTimeout(function () {
  data = 'Ok, it’s done. I put your file is the Desktop.'
  $('.app_container').append('<div class="bubble_bot"><div class="bubble bubble_bot_message bubble_after animation-target">'+data+'</div></div>')
  $(".app_scroll").scrollTop( $( ".app_scroll" ).prop( "scrollHeight" ) );
  $(".app_scroll").perfectScrollbar('update');
}, 1500)

setTimeout(function () {
  data = 'If you have another torrent, enter your magnet to start your torrent download again. =)'
  $('.app_container').append('<div class="bubble_bot"><div class="bubble bubble_bot_message bubble_after animation-target">'+data+'</div></div>')
  $(".app_scroll").scrollTop( $( ".app_scroll" ).prop( "scrollHeight" ) );
  $(".app_scroll").perfectScrollbar('update');
}, 1600)

setTimeout(function () {
  data = 'Or add torrent file'
  $('.app_container').append('<div class="bubble_bot"><div class="bubble bubble_bot_button animation-target">'+data+'</div></div>')
  $(".app_scroll").scrollTop( $( ".app_scroll" ).prop( "scrollHeight" ) );
  $(".app_scroll").perfectScrollbar('update');
}, 1700)
