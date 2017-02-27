function loadExecs() {
	  var url = 'https://rhitktpwebsite.herokuapp.com/executiveInfo';
    // var url = 'http://localhost:3000/executiveInfo';
  $.ajax({
		url: url
	}).done(function(data) {
    var classes = ['blueBorder', 'greenBorder'];
    var x = 0;

    for (var key in data) {
      var exec = '<div class="execBlock">';
      exec += '<img src="images/' + key + '.jpg" class="execImage ' + classes[x % 2] + '" />';
      exec += key + ' - ' + data[key];
      exec += '</div>';

      $('#contentarea').append(exec);
      x = (x + 1) % 2;
    }
  })
}