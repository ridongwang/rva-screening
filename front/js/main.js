window.App = window.App || {};

var inputClearingFunctions = [
  ['input', function(){ $(this).val(''); }],
  ['textarea', function(){ $(this).html(''); }],
  ['select', function(){ $(this).children().each(function(){
    if( $(this).hasClass('default-choice')){ this.selected = true;
    } else { this.selected = false; }
  }); }]
];

var AppController = function ( options ) {
  // console.info('App initialized :)');
  this.options = options || {};
  addEventListeners();
  function addEventListeners() {
    /*
    **  EXPANDER CLICK
    **  This toggles the expander element and animates.
    **
    */
    $('.expander-title').on('click', function(){
      $(this).parent().toggleClass('open');
      $(this).next('.expander-content').slideToggle(300);
    });

    /*
    **  ADD FORM ITEM CLICK
    **  This adds new empty forms for many-to one items
    **  .form-list contains both .add-form-list-item and .form-list-item
    *   .form-list-item is the div to be added
    */
    $('.multiform_control_edit').on('click', multiform.edit);
    $('.multiform_control_remove').on('click', multiform.remove);
    $('.multiform_control_add').on('click', multiform.add);

  }

  // If we're on the print page, hide everything that shouldn't print
  if (window.location.pathname.indexOf('/patient_print') > -1) {
    convertForPrint();
  }

};

var multiform = {
  add: function(event) {
    event.preventDefault();
    var id = $(this).attr('data-clone-id');
    var clone = $('#'+id).clone();
    var elem_id = clone.find(":input")[0].id;
    var elem_num = parseInt(elem_id.replace(/.*-(\d{1,4})-.*/m, '$1')) + 1;
    clone.attr('data-id', elem_num);
    clone.find(":input").each(function() {
      var new_elem_id = $(this).attr('id').replace('-' + (elem_num - 1) + '-', '-' + (elem_num) + '-');
      $(this).attr('name', new_elem_id).attr('id', new_elem_id).val('').removeAttr("checked");
    });
    $('#'+id).after(clone);
    // console.log(id, clone);
    return;
  },
  remove: function(event) {
    event.preventDefault();
    var entry = $(this).parent().parent();
    var entryForm = entry.find('.multiform_content_fields');
    entryForm.find('.field_input').each(function(){
      $(this).attr('value', '');
      if ($(this).attr('type') == 'date') {
        $(this).attr('value', 'mm/dd/yyyy');
      }
    });
    entry.hide();
    // entry.remove(); // removes from DOM, not from db until page save
    return;
  },
  edit: function(event) {
    event.preventDefault();
    var entry = $(this).parent().parent();
    var entryForm = entry.find('.multiform_content_fields');
    var entryRead = entry.find('.multiform_content_readonly');

    if (entry.hasClass('form_multiform_read')) {
      entry.removeClass('form_multiform_read');
      entry.addClass('form_multiform_edit');
    }

    return;
  }
};

function convertForPrint() {
  $('#patient_details_form').find(':input').not('.hidden-input').not('.hidden').replaceWith(function(){
    return '<span>'+this.value+'</span>'
  });
  $('.expander').replaceWith(function(){
    return $(this).children()
  });
  $('.expander-title').hide();
  $('table').not('#phone_number_table').find('th:last-child, td:last-child').hide();
}


/*
**  REQUEST BUTTON CLICK / UPDATE
**  Updates the className of the patient-list-item and changes
**  the text within the button.
**
*/
function sharePatientInfo( btn, patient_id, app_user_id, service_id ) {
  $.post('/add_referral', {
    patient_id: patient_id,
    app_user_id: app_user_id,
    service_id: service_id
  }).done(function() {
    $(btn).addClass('shared');
    $(btn).text('Referral sent!');
  });
}


