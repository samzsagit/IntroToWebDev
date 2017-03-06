var publicLinks = [["/", "Home"], ["/about", "About"], ["/rush", "Rush"], ["/executives","Executives"],["/blog","Blog"], ["/profdev","Requirements"]];
var privateLinks = [["/schedule", "Schedule"],["/trees","Trees"], ["/newuser","Register"]];

function mainNavigation() {
	var url = 'https://rhitktpwebsite.herokuapp.com';
	// var url = 'http://localhost:3000';

	$.ajax({
		url: url + '/login/login/checkLoggedIn',
		method: 'POST',
		data: {
			guid: document.cookie
		}
	}).done(function (data) {
		console.log(data);
		initLinks(data.loggedIn);
	});
}

function initLinks(isLoggedOn){
	var html = '<div class="middlewidth"><div id="navigation">';

	for (var i = 0; i < publicLinks.length - 1; i++) {
		html += '<a href="' + publicLinks[i][0] + '">' + publicLinks[i][1]; + '</a>';
		html += '<div class="green"> | </div>';
	}

	html += '<a href="' + publicLinks[i][0] + '">' + publicLinks[i][1]; + '</a>';

	if (isLoggedOn) {
		for(var i=0; i< privateLinks.length; i++){
			html += '<div class="green"> | </div>';
			html += '<a href="' + privateLinks[i][0] + '">' + privateLinks[i][1] + '</a>';
		}
	};
	html += '</div>';	//close navigation div


	html += '<div id="login">'
	if(!isLoggedOn){
		html += '<a href="/login">Log In</a>'
	}
	else {
		// html += 'Hi, Member!'
		// html += '<div class="green"> | </div>';
		html += '<a href="" onclick="logout()">Log Out</a>'
	}
	html += '</div>' // close login div
	html += '</div>'	//close middlewith div 
	// set html to a container

	$("#bottombanner").append(html);
}

function logout() {
	document.cookie = '';
	document.location.href = "https://rhitktpwebsite.herokuapp.com/";
	window.location.href = "https://rhitktpwebsite.herokuapp.com/";
}