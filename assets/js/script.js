$(document).ready(function(){
//  $('.myDiv').append('<input type="text" name="" value="Hello HII">');
var jsonOBJ = [];
  $.get( "../assets/bin/whereamii.html", function( data ) {
    $('<div>'+data+'</div>').find('a').each(function(){
      jsonOBJ.push({
        name: $(this).text()
      });

    });
    //console.log(jsonOBJ);
      var data_compiled = $('<div>'+data+'</div>').find('a:first');
      var href = $('<div>'+data+'</div>').find('a').attr('href');
      $(data_compiled).attr('href', 'https://nomadlist.com/petracca'+href);
      $( ".myDiv" ).html( JSON.stringify(jsonOBJ) );
    });
});
