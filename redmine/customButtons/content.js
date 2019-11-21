$('.return-to-author').before('<div class="to-test" title="На тестирование">На тестирование</div>');

$(document).on('click', '.to-test', function() {
  $('#issue_assigned_to_id').val(10); // на Ваню
  $($('input[name=commit]').get(2)).trigger('click');
});