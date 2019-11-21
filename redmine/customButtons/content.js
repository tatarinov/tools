if( $('#issue_assigned_to_id').val() != '10' )
  $('.return-to-author').before('<div class="to-test" title="На тестирование">На тестирование</div>');

if( $('#issue_status_id').val() != '2' )
  $('.return-to-author').before('<div class="to-my" title="Взять задачу">Взять задачу</div>');
else
  $('.return-to-author').before('<div class="end-task" title="Завершить">Завершить</div>');

$(document).on('click', '.to-test', function() {
  $('#issue_assigned_to_id').val('10'); // на Ваню
  $($('input[name=commit]').get(2)).trigger('click');
});

$(document).on('click', '.to-my', function() {
  $('#issue_assigned_to_id').val('6'); // мне
  $('#issue_status_id').val('2'); // выпоняется
  $($('input[name=commit]').get(2)).trigger('click');
});

$(document).on('click', '.end-task', function() {
  createTimePopup();
  //$($('input[name=commit]').get(2)).trigger('click');
});

function getTimerValue() {
  $.get('https://redmine.shogo.ru/time_loggers', function(result){
    var content = $(result);
    var time = $(content.find('#user-time-loggers-list .spent-time').get(1)).text();
    $('#my-time-input').val(time);
  });
}

function createTimePopup() {

  if( $('#dialog-message').length == 0)
  {
    $('body').append('<div id="dialog-message" title="Затраченное время"><p><input id="my-time-input" name="my-time"></p><p><textarea cols="2" id="my-comment-input" name="my-comment" placeholder="Комментарий"></textarea></p></div>');
  }

  getTimerValue();

  $( "#dialog-message" ).dialog({
    modal: true,
    buttons: {
      Ok: function() {
        $( this ).dialog( "close" );
        setTime();
      }
    }
  });

  $( "#issue_notes" ).focus();
}

function setTime() {
  $('#time_entry_hours').val($('#my-time-input').val());
  $('#issue_notes').val($('#my-comment-input').val());
}

