import { format } from 'date-fns'


import { task } from './task.js';
// All functions relating to saving and fetching from localStorage


var exampleDate = new Date();
// Sample Data 


var makeBed = task('make bed', 'Make the bloody bed yeah!', 'default', exampleDate, 'low');
var postShorts = task('post shorts', 'Return shorts to Surfdome', 'default', exampleDate, 'medium');
var goWalk = task('go walking', 'go for a bloody nice walk', 'cow', exampleDate, 'medium');
var fixToilet = task('fix toilet', 'fix the fucking toilet', 'default', exampleDate, 'low');
var shoutLoud = task('shout loud', 'shout as loud as I can', 'cow', exampleDate, 'high');
var stopTrain = task('stop train', 'engage beast mode and stop a bloody train', 'trains', exampleDate, 'medium')

const allTasks = [makeBed, postShorts, goWalk, fixToilet, shoutLoud, stopTrain];

allTasks.forEach(saveTask);

// Stores individual task in localStorage.
function saveTask(task) {
  window.localStorage.setItem(`${task.title}`, JSON.stringify(task));
}

function fetchTask(taskName) {
  const task = JSON.parse(localStorage.getItem( taskName ));
  console.log(task);
  return task;
}

// Fetches and returns all tasks in array.
function fetchAll() {
  const fetchedTasks = [];
  for (var i = 0; i < localStorage.length; i++) {
    var obj = JSON.parse(localStorage.getItem( localStorage.key( i )));
    fetchedTasks.push(obj);
  };
  return allTasks;
}


// Filters all stored tasks by provided project name passed by button value. 
function filterTasks(inputName) {
  var allTasks = fetchAll();
  var relatedTasks = [];
  for (var task of allTasks) {
    if (task.project === inputName) {
      relatedTasks.push(task);
      }
    };
  return relatedTasks;
};

// Returns list of unique project names
function getProjectNames() {
  var projectNames = [];
  var allTasks = fetchAll();
  for (var task of allTasks) {
    if (!projectNames.includes(task.project)) {
      projectNames.push(task.project)
    }; 
  };
  return projectNames;
}

// Toggles task complete/uncomplete
function complete() {
  var task = JSON.parse(localStorage.getItem(this.value));
  if (task.completed) {
    task.completed = false;
  } else {
    task.completed = true;
  }
  localStorage.setItem(this.value, JSON.stringify(task));
  console.log(task);
}

// Deletes item from local storage 
function removeItem(title) {
  console.log(`${title} Removed`)
  localStorage.removeItem(title);
}











export { saveTask, fetchTask, fetchAll, filterTasks, getProjectNames, complete, removeItem };
