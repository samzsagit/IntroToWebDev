function login() {
	var url = 'https://rhitktpwebsite.herokuapp.com';
	// url = '';
	$.ajax({
		url: url + '/login/login',
		method: 'POST',
		data: {
			username: $('#username').val(),
			password: $('#password').val()
		}
	}).done(function (data) {
		if (data.loggedIn == "true") {
			document.cookie = data.guid;  // not secure.  every user has their own uid which means that it wil generate same cookies for users
			window.location.replace('/');
		}
	});
}
