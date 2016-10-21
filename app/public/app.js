let bubble = function(time, type, msg){
    setTimeout(function () {
      if(type == 'bubble_bot'){
        $('.app_container').append('<div class="bubble_bot"><div class="bubble_bot_avatar fade-in one"></div><div class="bubble bubble_bot_message animation-target">'+msg+'</div></div>')
      }else if (type == 'bubble_bot_button') {
        $('.app_container').append('<div class="bubble_bot"><div class="bubble bubble_bot_button animation-target">'+msg+'</div></div>')
      }else if (type == 'bubble_user') {
        $('.app_container').append('<div class="bubble_user"><div class="bubble bubble_user_message animation-target-2">'+msg+'</div></div>')
      }else if (type == 'bubble_user_icon_dl') {
        $('.app_container').append('<div class="bubble_user"><div class="bubble bubble_user_message animation-target-2"><div class="bubble_user_icon"></div></div></div>')
      }else if (type == 'bubble_bot_dl') {
        $('.app_container').append('<div class="bubble_bot animation-target"><div class="bubble bubble_bot_message bubble_bot_dl"><div class="bubble_bot_dl_icon_dl"></div><div class="bubble_bot_dl_display"><div class="bubble_bot_dl_bar"></div><div class="bubble_bot_dl_bar_back"></div><div class="bubble_bot_dl_display_text">Torrent File<span>00:33</span></div></div></div></div>')
      }else if (type == 'bubble_bot_after') {
        $('.app_container').append('<div class="bubble_bot"><div class="bubble bubble_bot_message bubble_after animation-target">'+msg+'</div></div>')
      }
      $(".app_scroll").scrollTop( $( ".app_scroll" ).prop( "scrollHeight" ) )
      $(".app_scroll").perfectScrollbar('update')
    }, time)
}

setTimeout(function () {
  $('.app_scroll').perfectScrollbar()
}, 10)

let socket = io();

bubble('100', 'bubble_bot', 'Hey. Enter your magnet to start your torrent download. 🙂')
bubble('300', 'bubble_bot_button', 'Or add torrent file')
bubble('500', 'bubble_user_icon_dl', '')
bubble('600', 'bubble_bot', 'Thank’s. I work on it.')
bubble('700', 'bubble_bot_dl', '')
bubble('1000', 'bubble_bot_after', 'Ok, it’s done. I put your file is the Desktop.')
bubble('1100', 'bubble_bot_after', 'If you have another torrent, enter your magnet to start your torrent download again. 🙂')
bubble('1200', 'bubble_bot_button', 'Or add torrent file')
bubble('1200', 'bubble_bot_dl', '')
