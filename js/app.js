// Caching elements
var taskInput 			= document.getElementById("new-task"); //#new-task
var addButton  			= document.getElementsByTagName("button")[0]; //first button on page
var incompleteTaskList  = document.getElementById("incomplete-tasks"); // #incomplete-tasks
var completeTaskList    = document.getElementById("completed-tasks"); // #completed-tasks

// ===================================================
// ELEMENT CREATION
// ===================================================
var taskElementCreator = function(taskString) {
	/*
		This function will be used when the addTask() function is called.
		It only creates a HTML element for us. Appending this HTML element
		to the incompleteTaskList element will be handled by the addTask() function.

		We will create a parent li that will hold the new task
		and create all it's children elements.
		<li> - PARENT
			<input type="checkbox"> - CHILDREN
			<label>Pay Bills</label> - CHILDREN (takes the taskString var as innerHTML)
			<input type="text"> - CHILDREN
			<button class="edit">Edit</button> - CHILDREN
			<button class="delete">Delete</button> - CHILDREN
		</li>

		After creating all it's children elements, we will
		append them to the parent li created earlier and
		return that newly created element with all the task stuff.
	*/

	// Parent LI
	var parentListItem = document.createElement('li');

	// Children Elements
	var checkBox  	 = document.createElement('input');
	var label     	 = document.createElement('label');
	var editInput 	 = document.createElement('input');
	var editButton	 = document.createElement('button');
	var deleteButton = document.createElement('button');

	//Appending children to Parent LI
	parentListItem.appendChild(checkBox);
	parentListItem.appendChild(label);
	parentListItem.appendChild(editInput);
	parentListItem.appendChild(editButton);
	parentListItem.appendChild(deleteButton);

	//Add attributes, contents and properties to the child elements
	checkBox.type  = "checkbox";

	editInput.type = "text";

	editButton.innerText   = "Edit";
	editButton.className   = "edit";

	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText 	   = taskString;

	// Return Parent LI with all it's appended children with the correct attributes
	return parentListItem;
}

// ===================================================
// TASK HANDLING
// ===================================================
// ADD TASK
var addTask = function() {
	console.log("addTask() run");

	//Creates the HTML element for this new task
	var newListItem = taskElementCreator(taskInput.value);

	//Appends it to the incomplete task list
	incompleteTaskList.appendChild(newListItem);

	//Bind main events on the newly created task
	bindTaskEvents(newListItem, completeTask);

	//Clear the taskInput value
	taskInput.value = " ";
}

// EDIT TASK
var editTask = function() {
	console.log("editTask() run");
	// When edit button is pressed - Toggle edit mode
		//if has class .editMode
			// label holds the input value
			// remove class .editMode
		//else if doesnt has class .editMode
			// add class .editMode
			// input value holds the label text
}

// DELETE TASK
var deleteTask = function() {
	console.log("deleteTask() run");

	//Gets Parent LI from the clicked button	
	var listItem = this.parentNode;

	//Gets the UL that holds all list items - This can be #completed-tasks or #incomplete-tasks
	var ul = listItem.parentNode;

	//remove the parent list item from the task list
	ul.removeChild(listItem);
}

// MARK TASK AS COMPLETE
var completeTask = function() {
	console.log("completeTask() run");

	//Gets Parent LI from the clicked checkbox
	var listItem = this.parentNode

	// append parent list item to #completed-tasks
	completeTaskList.appendChild(listItem);

	//Refresh events in the Parent LI
	bindTaskEvents(listItem, incompleteTask);
}

// MARK TASK AS INCOMPLETE
var incompleteTask = function() {
	console.log("incompleteTask() run");

	//Gets Parent LI from the clicked checkbox
	var listItem = this.parentNode

	// append parent list item to #incomplete-tasks
	incompleteTaskList.appendChild(listItem);

	//Refresh events in the Parent LI
	bindTaskEvents(listItem, completeTask);
}

// ===================================================
// EVENT BINDING
// ===================================================
// BIND UI BUTTONS TO TASK HANDLING FUNCTIONS
var bindTaskEvents = function(currentListItem, checkboxDesiredAction) {
	console.log("bindTaskEvents() run");

	var checkBox     = currentListItem.querySelector("input[type=checkbox");
	var editButton   = currentListItem.querySelector("button.edit");
	var deleteButton = currentListItem.querySelector("button.delete");
	
	// bind editTask() to edit button
	editButton.onclick = editTask;

	// bind deleteTask() to delete button
	deleteButton.onclick = deleteTask;

	// bind checkboxDesiredAction to checkbox
	checkBox.onchange = checkboxDesiredAction;
}

//APPLY THE EVENT BINDING FUNCTION TO UI BUTTONS IN PAGE
//Cycle over incompleteTaskList ul list itens
for (var i = 0; i < incompleteTaskList.children.length; i++) {
	var currentListItem = incompleteTaskList.children[i];

	//bind events to current li children
	bindTaskEvents(incompleteTaskList.children[i], completeTask);
};

//Cycle over completeTaskList ul list itens
for (var i = 0; i < completeTaskList.children.length; i++) {
	var currentListItem = completeTaskList.children[i];
	
	//bind events to current li children
	bindTaskEvents(currentListItem, incompleteTask);
};

//Set the click handler to addTask function
addButton.onclick = addTask;


