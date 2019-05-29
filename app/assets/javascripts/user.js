$(function() {

  var searchList = $("#user_search_result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    searchList.append(html);
  }

  function appendNoUserName(failComment) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name'>${failComment}</p>
                </div>`
    searchList.append(html); 
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if(input!==""){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { name: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user_search_result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUserName("一致する名前はありません");
        }
      })
      .fail(function() {
        alert('名前検索に失敗しました');
      })
    }
  });

  var searchListAdd = $("#chat-group-users");

  function addUserName(userName, userId) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    searchListAdd.append(html);
  };

  $(document).on("click", ".chat-group-user__btn--add", function () {
    var userName = $(this).data("user-name");
    var userId = $(this).data("user-id");
    addUserName(userName, userId);
    $(this).parent().remove();
  });

  $(document).on("click", ".js-remove-btn", function () {
    $(this).parent().remove();
  });

});