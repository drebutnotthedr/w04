var pkWeAreUpTo = 1;
var listItems = [
	
];

function bodyDidLoad() {
	const inputElement = document.getElementById("fileUploader");
	inputElement.addEventListener("change", handleFiles, false);
	function handleFiles() {
		file0 =  this.files[0];
		var myFileReader = new FileReader();
		myFileReader.onload = function(fileLoadedEvent){
			var textFromFileLoaded = fileLoadedEvent.target.result;
			fileDidFinishGettingRead(textFromFileLoaded);
		};
		myFileReader.readAsText(file0);
	}
}

function fileDidFinishGettingRead(textFromFileLoaded) {
	console.log(textFromFileLoaded);
	myNewList = JSON.parse(textFromFileLoaded);
	redrawTableFromList(myNewList);
}

function redrawTableFromList(myNewList) {
	$("tbodyForTasks").html("");
	myNewList.forEach(element => addItemToTable(element));
}

function userDidClickCreate() {
	var minTemp = captureMinTemp();
	var maxTemp = captureMaxTemp();
	var conditions = captureConditions();

	var newItemDictionary = {
		"id": pkWeAreUpTo
		, "minTemp": minTemp
		, "maxTemp": maxTemp
		, "conditions": conditions
	};
	listItems.push(newItemDictionary);
	pkWeAreUpTo++;
	addItemToTable(newItemDictionary);

	console.log(newItemDictionary);
}

function captureMinTemp() {
	var input_minTemp = $("#input_minTemp").val();

	var minTemp = input_minTemp;

	return minTemp;
}

function captureMaxTemp() {
	var input_maxTemp = $("#input_maxTemp").val();

	var maxTemp = input_maxTemp;

	return maxTemp;
}

function captureConditions() {
	var input_conditions = $("#input_conditions").val();

	var conditions = input_conditions;

	return conditions;
}

function addItemToTable(newItemDictionary) {
	var tbodyForTasks = document.getElementById("tbodyForTasks");
	var myActions = "<a onclick='deleteItem(" + newItemDictionary["id"] + ")' href='#'>Delete This One</a>";

	var preparedRowHTML = "<tr id='rowForItem_" + newItemDictionary["id"] + "'>";
	preparedRowHTML += "<td class='subtleText'>" + newItemDictionary["id"] + "</td>";
	preparedRowHTML += "<td><em>" + newItemDictionary["minTemp"] + "</em></td>";
	preparedRowHTML += "<td><em>" + newItemDictionary["maxTemp"] + "</em></td>";
	preparedRowHTML += "<td><em>" + newItemDictionary["conditions"] + "</em></td>";
	preparedRowHTML += "<td>" + myActions + "</td>";
	preparedRowHTML+= "</tr>";

	tbodyForTasks.innerHTML += preparedRowHTML;

	console.log(listItems);
}

function deleteItem(rowToDelete) {
	console.log("deleteItem triggered for row = " + rowToDelete);
	var itemToRemove = _.findWhere(listItems, {"id": rowToDelete});
	listItems = _.without(listItems, itemToRemove);
	// IMPLEMENT LATER

	// go to DOM and delete the row
	document.getElementById("rowForItem_" + rowToDelete).innerHTML = "";
}

function downloadJSON() {
	download("data.json", JSON.stringify(listItems, null, '\t'));
}

// Adapted from:
// https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
  
	element.style.display = 'none';
	document.body.appendChild(element);
  
	element.click();
  
	document.body.removeChild(element);
}