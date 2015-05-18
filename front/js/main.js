window.App = window.App || {};

var AppController = function ( options ) {
  console.info('APP INITIALIZED :)');
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
    **  CONSENT BUTTON CLICK
    **  Removes the parent container and shows the patient
    **  information below.
    **
    */
    if ($('#consent-button').length) {
      $('#consent-button').on('click', function(){
        $(this).parent().parent().hide();
        $('.patient-details-wrapper').addClass('show');
      });
    }
  }

  /*
  **  SEARCH FIELD CHECK
  **  If #patient-search exists, initialize the search
  **
  */
  if ($('#patient-search').length) {
    this.search = {};
    this.initSearch('patient-search', { valueNames: ['patient-name', 'patient-dob'] });
  }

  // If we're on the print page, hide everything that shouldn't print
  if (window.location.pathname.indexOf('/patient_print') > -1) {
    convertForPrint();
  }

};


/*
**  SEARCH INITIALIZATION
**  @param(id) - the element ID of the list you're making searchable
**  @param(options) - options you can pass through, currently just an array
**    of valueNames for the classes in your list items you want to make
**    searchable.
**
*/
AppController.prototype.initSearch = function ( id, options ) {
  this.search.id = id;
  this.search.options = options;
  this.search.list = new List(id, options);
};

function addNewInputRow($table, $input_row) {
  $new_row = $input_row.clone();
  $new_row.each(function() {
    $(this).find(':input').val('');
  });
  $table.append($new_row);
  return;
}

function hideRow() {
  $(event.target).parent().siblings().each(
    function() {
      $(this).find(".hidden-input").attr('value', '');
      $(this).find("input[type='date'].hidden-input").attr('value', 'mm/dd/yyyy');
    }
  );
  $(event.target).parent().parent().hide();
}

function showHiddenFields() {
  $(event.target).parent().siblings().each(
    function() {
      $(this).find(".hidden-input").show();
      $(this).find(".read-only").hide();
    }
  );
}

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
function sharePatientInfo( btn ) {
  $(btn).addClass('shared');
  $(btn).text('information sent');
}
