$(function(){
  function buildHTML(message){
    var html_common = `<div class= "message" data-id="${message.id}">
                  <div class= "upper-message">
                    <div class= "upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>`
    if (message.image.url === null) {
      var html = html_common 
      return html;
    } else {
      var html = html_common + `<image class="lower-message__image", src= ${message.image.url}>`                 
      return html;
    }
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.pathname;
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__submit').prop('disabled', false);
      $('.form__message').val('');
      $('.hidden').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $("form")[0].reset();
    })

    .fail(function(){
      alert('error');
    })
  });

  var interval = setInterval(function() {
  if (location.href.match(/\/groups\/\d+\/messages/)){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    var last_message_id = $('.message').last().data('id');
    var href = 'api/messages'
    $.ajax({
      url: href,
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json',
    })

    .done(function(data) {
      data.forEach(function(message){
        var insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
    })

    .fail(function() {
      alert('自動更新に失敗しました');
    });

  } else {
      clearInterval(interval);
    }
  }, 5000 );
})

