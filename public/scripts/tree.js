// tree maker
var nodes;
var edges;
var container;
var data;
var network;
// var theURL= 'http://localhost:3000';
var theURL = 'https://rhitktpwebsite.herokuapp.com'

var options = {
	edges: {arrows: 'to'}
};

function startTree() {
	$.ajax({
        url: theURL + '/users'
    }).done(function (data){
		nodes = new vis.DataSet();
		edges = new vis.DataSet();

        for (var i = 0; i < data.length; i++) {
         	if (data[i].username) {
         		nodes.add([{id: data[i].ref, label: data[i].username}]);
         	}
         }

        for (var i = 0; i < data.length; i++) {
         	if (data[i].littles) {
         		var littleIDS = [];
         		for (var j = 0; j < data.length; j++) {
         			littleIDS.push(data[i].littles[j]);
         		}
         		for (var k = 0; k < data.length; k++) {
         			for (var z = 0; z < littleIDS.length; z++){
         				if (data[k].ref == littleIDS[z]) {
         					edges.add([{from: data[i].ref, to: littleIDS[z]}]);
         				}
    				}
         			
         		}
         	}
         }
		container = $('#mynetwork');  // create network
		data = {
			nodes: nodes,
			edges: edges}; // provide the data in the vis format
		network = new vis.Network(container[0], data, options);
    });
}


function getContainer() {
	return container[0];
}

function getData() {
	return data;
}

function getOptions() {
	return options;
}