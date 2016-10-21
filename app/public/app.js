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

let bubble_bot_dl = function(time, type, msg, status){
  setTimeout(function () {
    if(type == 'done'){
      $('.bubble_bot_dl_icon_dl:last').addClass('bubble_bot_dl_icon_dl_done')
      $('.bubble_bot_dl_display_text:last>span').text('')
    }else if (type == 'init') {
      $('.bubble_bot_dl_icon_dl:last').addClass('bubble_bot_dl_icon_dl')
      $('.bubble_bot_dl_bar:last').css('width' , ''+status+'px')
      $('.bubble_bot_dl_display_text:last>span').text(msg)
    }
  }, time)
}

let tape = function(time, type){
  setTimeout(function () {
    if(type == 'hide'){
      $('.app_input').fadeTo( "100" , 0.4)
      $("input").prop('disabled', true)
    }else if (type == 'show') {
      $('.app_input_icon_tape').removeClass('animation-target-3')
      setTimeout(function () {
        $('.app_input_icon_tape').addClass('animation-target-3')
      }, 10);
      $('.app_input').fadeTo( "100" , 1)
      $("input").prop('disabled', false)
      $("input").focus()
    }
  }, time);
}

$.prototype.enterPressed = function (fn) {
    $(this).keyup(function (e) {
        if ((e.keyCode || e.which) == 13) {
            fn()
        }
    })
}

$(function() {
  setTimeout(function () {
    $('.app_scroll').perfectScrollbar()
  }, 10)

  let socket = io();

  tape('0', 'hide')
  bubble('100', 'bubble_bot', 'Hey. Enter your magnet to start your torrent download. 🙂')
  tape('300', 'show')
  //bubble('300', 'bubble_bot_button', 'Or add torrent file')
  //bubble('500', 'bubble_user_icon_dl', '')
  //bubble('600', 'bubble_bot', 'Thank’s. I work on it.')
  //bubble('700', 'bubble_bot_dl', '')


  //bubble_bot_dl('1500', 'init', '00:50', '0')
  //bubble_bot_dl('1800', 'init', '00:40', '50')
  //bubble_bot_dl('2200', 'init', '00:10', '100')
  //bubble_bot_dl('2500', 'init', '00:01', '149')
  //bubble_bot_dl('2700', 'done', '', '')

  //bubble('3000', 'bubble_bot_after', 'Ok, it’s done. I put your file in your Desktop.')
  //bubble('4000', 'bubble_bot_after', 'If you have another torrent, enter your magnet to start your torrent download again. 🙂')
  //bubble('4200', 'bubble_bot_button', 'Or add torrent file')

  $("input").enterPressed(function() {
      let value_input = $("input").val()
      if(value_input != ""){
        tape('0', 'hide')
        bubble('0', 'bubble_user', $("input").val())
        $("input").val("")
        bubble('500', 'bubble_bot', 'Thank’s. I work on it.')
        bubble('1000', 'bubble_bot_dl', '')
        bubble_bot_dl('1500', 'init', '00:50', '0')
        bubble_bot_dl('1800', 'init', '00:40', '50')
        bubble_bot_dl('2200', 'init', '00:10', '100')
        bubble_bot_dl('2500', 'init', '00:01', '149')
        bubble_bot_dl('2700', 'done', '', '')
        bubble('3000', 'bubble_bot_after', 'Ok, it’s done. I put your file in your Desktop.')
        bubble('4000', 'bubble_bot_after', 'If you have another torrent, enter your magnet to start your torrent download again. 🙂')
        tape('4200', 'show')
      }
  })

})
