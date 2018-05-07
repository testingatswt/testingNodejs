$(document).ready(function(){
//  $('.myDiv').append('<input type="text" name="" value="Hello HII">');
  $.get( "../assets/bin/whereamii.html", function( data ) {
      var data_compiled = $('<div>'+data+'</div>').find('a:first');
      var href = $('<div>'+data+'</div>').find('a').attr('href');
      $(data_compiled).attr('href', 'https://nomadlist.com/petracca'+href);
      $( ".myDiv" ).html( data_compiled );
    });
});
