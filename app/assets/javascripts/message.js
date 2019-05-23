$(function(){
  function buildHTML(message){
    var html_common = `<div class= "message">
                  <div class= "upper-message">
                    <div class= "upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>`
    if (message.image.url === null) {
      var html = html_common + `</div>
                  </div>`
      return html;
    } else {
      var html = html_common + `<image class="lower-message__image", src= ${message.image}>                 
                  </div>
                </div>`
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
    })

    .fail(function(){
      alert('error');
    })
  })
});
