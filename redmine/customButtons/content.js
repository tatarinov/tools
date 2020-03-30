if( $('#issue_assigned_to_id').val() != '10' )
  $('.return-to-author').before('<div class="to-test" title="На тестирование">На тестирование</div>');

if( $('#issue_status_id').val() != '2' )
  $('.return-to-author').before('<div class="to-my" title="Взять задачу">Взять задачу</div>');
else if( isTaskForMy() ) {
  $('.return-to-author').before('<div class="end-task" title="Завершить">Завершить</div>');
}

$('.settings').closest('li').after('<li><a href="/issues?query_id=222" class="programmer-issue-list" title="Разработка">Разработка</a></li>');

$(document).on('click', '.to-test', function() {
  $('#issue_assigned_to_id').val('10'); // на Ваню
  $('#issue_status_id').val('7');  // 1 - Новая 7 - тестирование
  submitForm();
});

$(document).on('click', '.to-my', function() {
  startTimer()
  $('#issue_assigned_to_id').val('6'); // мне
  $('#issue_status_id').val('2'); // выпоняется
  submitForm();
});

$(document).on('click', '.end-task', function() {
  createTimePopup($(this));
});

function getTimerValue(callback) {
  $.ajax({
    async: true,
    type: 'GET',
    url: 'https://redmine.shogo.ru/time_loggers',
    success: function(result) {
      var content = $(result);
      var time = $(content.find('#user-time-loggers-list .spent-time').get(1)).text();
      callback(time);
    }
  });
}

function createTimePopup($button) {

  if( $('#dialog-message').length == 0)
  {
    $('body').append('<div id="dialog-message" title="Затраченное время"><p><input id="my-time-input" name="my-time"></p><p><textarea cols="2" id="my-comment-input" name="my-comment" placeholder="Комментарий"></textarea></p></div>');
  }

  getTimerValue(function(time) {
    $('#my-time-input').val(time);
  });


  $( "#dialog-message" ).dialog({
    modal: false,
    buttons: {
      Ok: function() {
        $( this ).dialog( "close" );
        setTime();
        $('#issue_status_id').val('2'); // выпоняется
        stopTimer();
        submitForm();
      }
    },
    position: { my: "left top", at: "left bottom", of: $button }
  });

  $( "#issue_notes" ).focus();
}

function setTime() {
  $('#time_entry_hours').val($('#my-time-input').val());
  $('#issue_notes').val($('#my-comment-input').val());
}

function submitForm() {
  $($('input[name=commit]').get(2)).trigger('click');
}

function isTaskForMy() {
 return $('#issue_assigned_to_id').val() == 6
}

function startTimer() {
  if( $('#time-logger-menu a.icon-start').length )
    $('#time-logger-menu a.icon-start').trigger('click');
}

function stopTimer() {
  $.ajax({
    async: true,
    type: 'GET',
    url: '//redmine.shogo.ru/time_loggers/stop',
    success: function(result) {    }
  });
}

