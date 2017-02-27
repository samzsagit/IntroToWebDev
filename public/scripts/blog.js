// var theURL= 'http://localhost:3000';
var theURL = 'https://rhitktpwebsite.herokuapp.com'
var posts;

function setUpBlog() {
    addPoster();
}

function getPosts(postFunc) {
    $.ajax({
        url: theURL + '/posts'
    }).done(function (data){
        postFunc(data.reverse());
    });
}

function displayAdminPosts(posts) {
    for (var x = 0; x < posts.length; x++) {
        var id = posts[x]._id.trim();
        var html = '<div class="post" id="' + id + '">';
        html += '<p class="postTitle">' + posts[x].title + '</p>';
        html += '<p class="postBody">' + posts[x].body + '</p>'
        html += '<p class="postDate">' + posts[x].datePosted + '</p>';
        html += '<div class="postButtons"><button onclick="deletePost(\'' + id + '\')">Delete</button>';
        html += '<button onclick="editPost(\'' + id + '\')">Edit</button></div>';
        html += '</div>';

        $("#blogPosts").append(html);
    }
}

function displayPosts(posts) {
    for (var x = 0; x < posts.length; x++) {
        var id = posts[x]._id.trim();
        var html = '<div class="post" id="' + id + '">';
        html += '<p class="postTitle">' + posts[x].title + '</p>';
        html += '<p class="postBody">' + posts[x].body + '</p>'
        html += '<p class="postDate">' + posts[x].datePosted + '</p>';
        html += '</div>';

        $("#blogPosts").append(html);
    }
} 

function deletePost(id) {
    $.ajax({
        url: theURL + '/posts/' + id,
        method: 'DELETE'
    }).done(function (data) {
        window.location.replace("/blog");
    });
}

function editPost(id) {
    var title = $('#' + id + ' .postTitle').text();
    var body = $('#' + id + ' .postBody').text();
    var date = $('#' + id + ' .postDate').text();

    $('#' + id).empty();
    var html = 'Post Title:<br /><input type="text" class="edittitle" value="' + title + '" /><br /><br />';
    html += 'Post Body:<br /><textarea rows="10" cols="100" class="editbody">' + body + '</textarea><br /><br />';
    html += 'Date Posted:<br /><input type="text" class="editdate" value="' + date + '" /><br /><br />';
    html += '<div class="postButtons"><button onclick="saveEditedPost(\'' + id + '\')">Save</button> ';
    html += '<button onclick="cancelEditing()">Cancel</button></div>';

    $('#' + id).append(html);
}

function saveEditedPost(id) {
    $.ajax({
        url: theURL + '/posts/' + id,
        method: 'PUT',
        data: {
            title: $('#' + id + ' .edittitle').val(),
            body: $('#' + id + ' .editbody').val(),
            datePosted: $('#' + id + ' .editdate').val()
        }
    }).done(function (data) {
        window.location.replace('/blog');
    });
}

function cancelEditing() {
    window.location.replace("/blog");
}

function addPoster() {
    $.ajax({
        url: theURL + '/login/login/checkLoggedIn',
        method: 'POST',
        data: {
            guid: document.cookie
        }
    }).done(function (data) {
        if (data.loggedIn) {
            posts = getPosts(displayAdminPosts);

            var html = '<div id="loginForm">';
            html += 'Post Title:<br />'
            html += '<input type="text" name="title" id="makeTitle" /><br /><br />';
            html += 'Post Body:<br />';
            html += '<textarea class="paragraphInput" rows="10" cols="103"></textarea><br /><br />';
            html += '<div class="postButtons"><button onclick="postPost()">Post it!</button></div>';
            html += '</div>';

            $("#contentarea").append(html);
        }
        else {
            getPosts(displayPosts);
        }
    });    
}

function postPost() {
    var aTitle = $('#makeTitle').val();
    var aBody = $('.paragraphInput').val();
    $.ajax({
        method: "POST",
        url: theURL + '/posts',
        data: { title: aTitle, body: aBody}
    }).done(function (){
        window.location.replace("/blog");
    });
}