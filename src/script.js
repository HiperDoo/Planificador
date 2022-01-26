var monthName = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
var dayNames = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
var colors = ["3C5BA8", "F0AD4E", "5BC0DE"]; //A0A6A0
var stateColors = ["#2EEB0F", "#F0AD4E"];

var users;
if (localStorage.getItem("all-users") !== null) {
	users = JSON.parse(localStorage.getItem("all-users"));
} else {
	var info = new Array(
		new Array(
			"Alexia",
			new Array(
				/*,
				new Array (
					"Importante",
					"2021-09-14T00:00:00",
					"2021-09-14T23:59:59",
					true
				)*/
				new Array(
					"3168 LUM-33",
					"2022-01-20T00:00:00",
					"2022-01-24T23:59:59"
				),
				new Array(
					"3197 LUM-38",
					"2022-01-25T00:00:00",
					"2022-01-26T23:59:59"
				),
				new Array(
					"3121_DL2424",
					"2022-01-27T00:00:00",
					"2022-01-30T23:59:59"
				)
			)
		),
		new Array(
			"Andres",
			new Array(
				new Array(
					"3163_CP",
					"2022-01-18T00:00:00",
					"2022-01-20T23:59:59"
				)/*,
				new Array(
					"3132 LUM-14-03",
					"2021-09-14T00:00:00",
					"2021-09-15T11:59:59",
					true
				)*/,
				new Array(
					"3132 LUM-14-03",
					"2022-01-23T00:00:00",
					"2022-01-28T11:59:59"
				)
			)
		),
		new Array(
			"Jefte",
			new Array(
				new Array(
					"3161 WL-1",
					"2022-02-04T00:00:00",
					"2022-02-07T23:59:59"
				),
				new Array(
					"3168 LUM-31",
					"2022-01-17T00:00:00",
					"2022-01-24T23:59:59"
				)
			)
		),
		new Array(
			"Abraham",
			new Array(
				new Array(
					"3140 Custom Fixture Addition",
					"2022-01-22T00:00:00",
					"2022-01-22T23:59:59"
				),
				new Array(
					"3456",
					"2022-01-23T00:00:00",
					"2022-01-23T23:59:59"
				),
				new Array(
					"3140 Custom Fixture Addition",
					"2022-01-24T00:00:00",
					"2022-01-24T23:59:59"
				)/*,
				new Array(
					"Importante",
					"2021-09-14T12:00:00",
					"2021-09-14T23:59:59",
					true
				)*/,
				new Array(
					"3140 Custom Fixture Addition",
					"2022-01-25T00:00:00",
					"2022-01-25T23:59:59"
				)/*,
				new Array(
					"Importante",
					"2021-09-15T12:00:00",
					"2021-09-15T23:59:59",
					true
				)*/
			)
		));
	localStorage.setItem("all-users", JSON.stringify(info));
	users = JSON.parse(localStorage.getItem("all-users"));
}

var numUsers = 0, numWeek = 0, debbugWork = true;
var loadedBars = []; var loadedBars2 = [];

loadUsers();
loadUsersData();
document.getElementsByClassName("pop-up-box")[0].style.display = "none";

function loadUsers() {
	var userName = document.getElementsByClassName("name")[0].innerHTML = users[0][0];
	for (var i = 1; i < users.length; i++) {
		var userGroup = document.getElementById('user-' + numUsers);
		var cl_userGroup = userGroup.cloneNode(true);
		cl_userGroup.id = "user-" + ++numUsers;
		userGroup.parentNode.appendChild(cl_userGroup);

		var userName = document.getElementsByClassName("name")[i].innerHTML = users[i][0];
	}
	document.getElementsByClassName("calendar")[0].style.height = document.getElementById("user-" + numUsers)
		.getBoundingClientRect().bottom - document.getElementsByClassName("calendar")[0]
		.getBoundingClientRect().top + 8 + 'px';

	var users_cont = document.getElementsByClassName("users")[0];
	var buttons_cont = document.getElementsByClassName("cont-buttons")[0];
	buttons_cont.style.height = window.getComputedStyle(users_cont).marginTop;
}

function loadUsersData() {
	loadedBars.splice(0, loadedBars.length);
	loadedBars2.splice(0, loadedBars2.length);
	var today = new Date();
	var numWeekToday = today.getDay();
	var numOfBars = 0;

	var sunday = getFirstLastDay(0);
	var saturday = getFirstLastDay(1);
	var sunday_format = new Date(sunday);
	var saturday_format = new Date(saturday);
	saturday_format.setHours(23);
	saturday_format.setMinutes(59);
	saturday_format.setSeconds(59);

	for (var i = 0; i < 7; i++) {
		var tempDate = new Date(sunday);
		tempDate.setDate(tempDate.getDate() + i);
		document.getElementById("d" + i).innerHTML = dayNames[i] + "<br/>" + tempDate.getDate() + " " + monthName[tempDate.getMonth()];
	}

	for (var i = 0; i < users.length; i++) {
		var tempCount = 0;
		var grayBar = [];
		var reset = document.getElementById("user-" + i).getElementsByClassName('tasks')[0];
		reset.innerHTML = "";

		var numBarGroups = 0;
		for (var j = 0; j < users[i][1].length; j++) {
			var startDayJob = users[i][1][j][1];
			var endDayJob = users[i][1][j][2];
			var startDayJob_format = new Date(startDayJob);
			var endDayJob_format = new Date(endDayJob);

			if (sunday_format < endDayJob_format && //Si el domigo es menor que el ultimo dia de trabajo,
				saturday_format > startDayJob_format) { //y si el sabado es mayor que el primer dia de trabajo...

				var barGroup = document.getElementsByClassName('base-group-bars')[0];
				var cl_barGroup = barGroup.cloneNode(true);
				cl_barGroup.className = "";
				cl_barGroup.classList.add("group-bars-" + ++numBarGroups);
				var temp = document.getElementById("user-" + i).getElementsByClassName('tasks')[0];
				temp.appendChild(cl_barGroup);

				var jobBar = document.getElementById("user-" + i).getElementsByClassName("bar-task")[numBarGroups - 1];
				var backJobBar = document.getElementById("user-" + i).getElementsByClassName("back-bar-task")[numBarGroups - 1];
				jobBar.style.width = 0 + '%'; backJobBar.style.width = 0 + '%';
				jobBar.style.marginLeft = 0 + '%'; backJobBar.style.marginLeft = 0 + '%';
				jobBar.style.background = "#" + colors[i % 3]; backJobBar.style.background = "#" + colors[i % 3] + "80";
				jobBar.style.top = 0 + '%'; backJobBar.style.top = 0 + '%';
				backJobBar.removeAttribute('id');

				var conditionWeek = 0;
				if (today > sunday_format && today < saturday_format) {
					conditionWeek = 0;
				} else if (today < sunday_format) {
					conditionWeek = 1;
				} else if (today > saturday_format) {
					conditionWeek = 2;
				}

				if (users[i][1][j][3] == true) { //Tareas Importantes
					jobBar.style.background = "#FA2828";
					backJobBar.style.background = "#FA282824";

					if (tempCount < 2) {
						jobBar.style.top = 16.6666 + (33.3333 * tempCount) + '%';
						backJobBar.style.top = 16.6666 + (33.3333 * tempCount) + '%';
						grayBar.push(new Array(numBarGroups, tempCount));
					} else {
						jobBar.style.top = 16.6666 + (33.3333 * (tempCount - 2)) + '%';
						backJobBar.style.top = 16.6666 + (33.3333 * (tempCount - 2)) + '%';
						grayBar.push(new Array(numBarGroups, tempCount));
					}
				} else { //Tareas Normales
					if (tempCount < 3) {
						jobBar.style.top = 16.6666 + (33.3333 * tempCount) + '%';
						backJobBar.style.top = 16.6666 + (33.3333 * tempCount) + '%';
					} else {
						jobBar.style.top = 16.6666 + '%';
						backJobBar.style.top = 16.6666 + '%';
						tempCount = 0;
					}
					tempCount++;
				}

				var porcentage = 0;

				if (sunday_format <= startDayJob_format) { //Si el primer dia de trabajo es visible en la semana...
					var marginLeft = 14.285714 * (startDayJob_format.getDay() + (startDayJob_format.getHours() / 24));
					backJobBar.style.setProperty('margin-left', "calc(" + marginLeft + "% + 1px)");
					if (saturday_format >= endDayJob_format) { //Si el ultimo dia de trabajo es visible en la semana...
						backJobBar.style.setProperty('width', "calc(" + Math.abs(marginLeft - (14.285714 * (endDayJob_format.getDay() + (endDayJob_format.getHours() / 24)))) + "% + 3px)");
						jobBar.style.setProperty('margin-left', "calc(" + marginLeft + "% + 1px)");
						porcentage = getWidthDay(jobBar, today, startDayJob_format, endDayJob_format, sunday_format, saturday_format, conditionWeek, 0, i, j);
					} else { //Si el ultimo dia de trabajo no es visible en la semana...
						backJobBar.style.setProperty('width', "calc(" + (100 - marginLeft) + "% - 1px)");
						jobBar.style.setProperty('margin-left', "calc(" + marginLeft + "% + 1px)");
						porcentage = getWidthDay(jobBar, today, startDayJob_format, endDayJob_format, sunday_format, saturday_format, conditionWeek, 1, i, j);
					}
				} else { //Si el primer dia de trabajo no es visible en la semana...
					backJobBar.style.marginLeft = 1 + 'px';
					jobBar.style.marginLeft = 1 + 'px';
					if (saturday_format >= endDayJob_format) { //Si el ultimo dia de trabajo es visible en la semana...
						backJobBar.style.setProperty('width', "calc(" + (14.285714 * (endDayJob_format.getDay() + (endDayJob_format.getHours() / 24))) + "% + " + (endDayJob_format.getDay() + 2) + "px)");
						porcentage = getWidthDay(jobBar, today, startDayJob_format, endDayJob_format, sunday_format, saturday_format, conditionWeek, 2, i, j);
					} else { //Si el ultimo dia de trabajo no es visible en la semana...
						backJobBar.style.setProperty('width', "calc(100% - 1px)");
						porcentage = getWidthDay(jobBar, today, startDayJob_format, endDayJob_format, sunday_format, saturday_format, conditionWeek, 3, i, j);
					}
				}

				backJobBar.id = "bn-" + numOfBars;
				loadedBars.push(
					new Array(
						i,
						j,
						porcentage
					)
				);
				loadedBars2.push(backJobBar);
				numOfBars++;
			}
		}
		if (grayBar.length != 0) {
			for (var k = 0; k < grayBar.length; k++) {
				var barGroup = document.getElementById("user-" + i).getElementsByClassName('group-bars-' + grayBar[k][0])[0];
				var cl_barGroup = barGroup.cloneNode(true);
				cl_barGroup.className = "";
				cl_barGroup.classList.add("group-bars-" + k + "-gray");
				barGroup.parentNode.appendChild(cl_barGroup);
				
				var jobBar = document.getElementById("user-" + i).getElementsByClassName("group-bars-" + k  + "-gray")[0].getElementsByClassName("bar-task")[0];
				var backJobBar = document.getElementById("user-" + i).getElementsByClassName("group-bars-" + k + "-gray")[0].getElementsByClassName("back-bar-task")[0];
				jobBar.style.background = "#A0A6A0"; backJobBar.style.background = "#A0A6A080";
				if (grayBar[k][1] > 2) {
					jobBar.style.top = 16.6666 + (33.3333 * (grayBar[k][1] - 1)) + '%';
					backJobBar.style.top = 16.6666 + (33.3333 * (grayBar[k][1] - 1)) + '%';
				} else {
					jobBar.style.top = 16.6666 + (33.3333 * (grayBar[k][1] - 1)) + '%';
					backJobBar.style.top = 16.6666 + (33.3333 * (grayBar[k][1] - 1)) + '%';
				}
				backJobBar.removeAttribute('id');
			}
		}
	}
	popBox();
}

function getFirstLastDay(fL) {
	var today = new Date();
    var temp = new Date(today.setDate(today.getDate() - today.getDay() + (fL == 0 ?  0 : 6) - numWeek));
    var dd = String(temp.getDate()).padStart(2, '0');
	var mm = String(temp.getMonth() + 1).padStart(2, '0');
	var yyyy = temp.getFullYear();
	return mm + '/' + dd + '/' + yyyy;
}

function getWidthDay(jobBar, today, startDayJob_format, endDayJob_format, sunday_format, saturday_format, condition, state, i, j) {
	var porcentage = 0, work = false;
	var point = document.getElementById("user-" + i).getElementsByClassName("point")[0];
	var porcentageText = document.getElementById("user-" + i).getElementsByClassName("porcentage-job")[0];
	if (today > startDayJob_format &&  today < endDayJob_format) {
		var tempTotalDays = (today.getTime() - startDayJob_format.getTime()) / (1000 * 3600 * 24);
		var porcentage = (endDayJob_format.getTime() - startDayJob_format.getTime()) / (1000 * 3600 * 24);
		porcentage = Math.round((tempTotalDays / porcentage) * 100);
		point.style.backgroundColor = stateColors[1];
		point.style.boxShadow = "0 0 2px red, 0 0 5px " + stateColors[1] + ", 0 0 10px " + stateColors[1] + ", 0 0 15px " + stateColors[1] + ", 0 0 20px " + stateColors[1] + ", 0 0 25px " + stateColors[1] + ", 0 0 30px " + stateColors[1] + ", 0 0 40px " + stateColors[1];
		porcentageText.innerHTML = porcentage + "%";
	} else if (today > endDayJob_format) {
		porcentage = 100;
		point.style.backgroundColor = stateColors[0];
		point.style.boxShadow = "0 0 2px red, 0 0 5px " + stateColors[0] + ", 0 0 10px " + stateColors[0] + ", 0 0 15px " + stateColors[0] + ", 0 0 20px " + stateColors[0] + ", 0 0 25px " + stateColors[0] + ", 0 0 30px " + stateColors[0] + ", 0 0 40px " + stateColors[0];
	}

	switch (condition) {
		case 0:
		if (today > startDayJob_format && today < endDayJob_format) { //Medio
			if (!(startDayJob_format < sunday_format)) {
				var tempTotalDays = (today.getTime() - startDayJob_format.getTime()) / (1000 * 3600 * 24);
				jobBar.style.setProperty('width', "calc(" + (14.285714 * tempTotalDays + "% - 2px)"));
				
			} else {
				jobBar.style.setProperty('width', "calc(" + (14.285714 * (today.getTime() - sunday_format.getTime()) / (1000 * 3600 * 24) + "% - 2px)"));
			}
		} else if (today < startDayJob_format) { //Vacio
			jobBar.style.width = 0 + '%';
		} else { //Leno
			if (!(startDayJob_format < sunday_format)) {
				jobBar.style.setProperty('width', "calc(" + (14.285714 * (endDayJob_format.getTime() - startDayJob_format.getTime()) / (1000 * 3600 * 24) + "% - 2px)"));
			} else {
				jobBar.style.setProperty('width', "calc(" + (14.285714 * (endDayJob_format.getTime() - sunday_format.getTime()) / (1000 * 3600 * 24) + "% - 2px)"));
			}
		}
		break;

		case 1:
		jobBar.style.width = 0 + '%';
		break;

		case 2:
		switch (state) {
			case 0:
			jobBar.style.setProperty('width', "calc(" + (14.285714 * (endDayJob_format.getTime() - startDayJob_format.getTime()) / (1000 * 3600 * 24) + "% - 2px)"));
			break;

			case 1:
			jobBar.style.setProperty('width', "calc(" + (14.285714 * (saturday_format.getTime() - startDayJob_format.getTime()) / (1000 * 3600 * 24) + "% - 2px)"));
			break;

			case 2:
			jobBar.style.setProperty('width', "calc(" + (14.285714 * (endDayJob_format.getTime() - sunday_format.getTime()) / (1000 * 3600 * 24) + "% - 2px)"));
			break;

			case 3:
			jobBar.style.setProperty('width', "calc(" + (14.285714 * (saturday_format.getTime() - sunday_format.getTime()) / (1000 * 3600 * 24) + "% - 2px)"));
			break;
		}
		break;
	}
	return porcentage;
}

function popBox() {
	var popBox = document.getElementsByClassName("pop-up-box")[0];
	for (var i = 0; i < loadedBars.length; i++) {
		loadedBars2[i].addEventListener("mouseover", function() {
			popBox.style.top = (this.getBoundingClientRect().top - 155.71250915527344 + (this.getBoundingClientRect().height * 1.5)) + window.scrollY + 'px';
			popBox.style.left = (this.getBoundingClientRect().left - 64.05000305175781 + (this.getBoundingClientRect().width / 2) - (popBox.getBoundingClientRect().width / 2)) + 'px';
			popBox.style.display = "";
			for (var j = 0; j < loadedBars2.length; j++) {
				if (this == loadedBars2[j]) {
					popBox.innerHTML = users[loadedBars[j][0]][1][loadedBars[j][1]][0] + "<br/>" +
						parseInt(users[loadedBars[j][0]][1][loadedBars[j][1]][1].slice(8, 10)) + " " +
						monthName[parseInt(users[loadedBars[j][0]][1][loadedBars[j][1]][1].slice(5, 7)) - 1] + " - " +
						parseInt(users[loadedBars[j][0]][1][loadedBars[j][1]][2].slice(8, 10)) + " " +
						monthName[parseInt(users[loadedBars[j][0]][1][loadedBars[j][1]][2].slice(5, 7)) - 1] +
						"<br/>" + loadedBars[j][2] + "%";
					if (users[loadedBars[j][0]][1][loadedBars[j][1]][3]) {
						popBox.style.background = "#FA282880";
					} else {
						popBox.style.background = "#" + colors[loadedBars[j][0] % 3] + "80";
					}
				}
			}
		});
		loadedBars2[i].addEventListener("mouseout", function() {
			popBox.style.display = "none";
		});
	}
}

function left() {
	numWeek += 7;
	loadUsersData();
	popBox();
}

function right() {
	numWeek += -7;
	loadUsersData();
	popBox();
}

var today = new Date();
var token = 0, tempPos = 0;
for (var i = 0; i < users.length; i++) {
	for (var j = 0; j < users[i][1].length; j++) {
		if (today > new Date(users[i][1][j][1]) && today < new Date(users[i][1][j][2])) {
			document.getElementById("user-" + i).getElementsByClassName("working-on")[0].innerHTML = "Trabajando en: " + users[i][1][j][0];
			document.getElementById("user-" + i).getElementsByClassName("date-job")[0].innerHTML = parseInt(users[i][1][j][1].slice(8, 10)) + " " + monthName[parseInt(users[i][1][j][1].slice(5, 7)) - 1] + " - " +
				parseInt(users[i][1][j][2].slice(8, 10)) + " " + monthName[parseInt(users[i][1][j][1].slice(5, 7)) - 1];
			break;
		} else if (today > new Date(users[i][1][j][2])) {
			if ((users[i][1].length - 1) > j) {
				document.getElementById("user-" + i).getElementsByClassName("working-on")[0].innerHTML = "Siguiente Trabajo: " + users[i][1][j + 1][0];
				document.getElementById("user-" + i).getElementsByClassName("date-job")[0].innerHTML = parseInt(users[i][1][j + 1][1].slice(8, 10)) + " " + monthName[parseInt(users[i][1][j + 1][1].slice(5, 7)) - 1] + " - " +
				parseInt(users[i][1][j + 1][2].slice(8, 10)) + " " + monthName[parseInt(users[i][1][j + 1][1].slice(5, 7)) - 1];
			} else {
				document.getElementById("user-" + i).getElementsByClassName("working-on")[0].innerHTML = "Descansando...";
				document.getElementById("user-" + i).getElementsByClassName("date-job")[0].innerHTML = "-- --- - -- ---";
			}
		}
	}
}

var edit_box = document.getElementsByClassName("cont-edit")[0];
const box = document.getElementsByClassName('cont-box')[0];
var exit_box = document.getElementsByClassName("exit")[0];
const divs = document.querySelectorAll('.ver-mas');
divs.forEach((item, index) => {
	item.addEventListener('click', function() {
		box.style.display = "block";
		document.getElementsByClassName("name-user")[0].innerHTML = users[index][0];
		var ul = document.getElementsByClassName("list")[0];
		ul.innerHTML = ''; //Borra lista
		for (var i = 0; i < users[index][1].length; i++) {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(users[index][1][i][0]));
			ul.appendChild(li);
		}
	})
});

window.onclick = function(event) {
  if (event.target == exit_box) {
    box.style.display = "none";
  }
  if (event.target == edit_box) {
    edit_box.style.display = "none";
  }
}

var listElem = document.querySelectorAll(".elmL");
var selection = -1;
listElem.forEach((item, index) => {
	item.addEventListener('click', function() {
		if (state != 0) {
			selection = index;
			console.log("Pos: " + selection);
		}
	});
});

var state = 0;
var add_cont = document.getElementsByClassName("add_cont")[0];
var edit_cont = document.getElementsByClassName("edit_cont")[0];
var del_cont = document.getElementsByClassName("del_cont")[0];

var add_user_task = document.getElementsByClassName("controlBtn-2")[0];
var del_user_task = document.getElementsByClassName("controlBtn-3")[0];

function add_user() {
	document.getElementsByClassName("add-cont-1")[0].style.display = "block";
	document.getElementsByClassName("add-cont-2")[0].style.display = "none";
	document.getElementsByClassName("add-cont-3")[0].style.display = "none";

	document.getElementsByClassName("add_save_1")[0].style.display = "block";
	document.getElementsByClassName("add_save_2")[0].style.display = "none";

	state = 1;
}

var check = -1;
function add_task() {
	document.getElementsByClassName("add-cont-1")[0].style.display = "block";
	document.getElementsByClassName("add-cont-2")[0].style.display = "block";
	document.getElementsByClassName("add-cont-3")[0].style.display = "block";

	document.getElementsByClassName("add_save_1")[0].style.display = "none";
	document.getElementsByClassName("add_save_2")[0].style.display = "block";

	state = 2;

	var nameAdd = document.getElementById("add-name-inp");
	var firstDAdd = document.getElementById("add-first-day-inp");
	var lastDAdd = document.getElementById("add-last-day-inp");

	for (var i = 0; i < users.length; i++) {
		if (users[i][0] == nameAdd.value) {
			check = i;
			break;
		}
	}

	if (check != -1) {
		var ul = document.getElementsByClassName("add-list-ul")[0];
		ul.innerHTML = '';
		for (var i = 0; i < users[check][1].length; i++) {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(users[check][1][i][0]));
			li.classList.add("elmL");
			ul.appendChild(li);
		}
		listElem = document.querySelectorAll(".elmL");

		listElem.forEach((item, index) => {
			item.addEventListener('click', function() {
				if (state != 0) {
					selection = index + 1;
					console.log("Pos: " + selection);
					firstDAdd.value = users[check][1][index][1];
					lastDAdd.value = users[check][1][index][2];
				}
			});
		});
	}
}

function add() {
	add_user_task.style.display = "block";
	del_user_task.style.display = "none";

	document.getElementsByClassName("add-cont-1")[0].style.display = "none";
	document.getElementsByClassName("add-cont-2")[0].style.display = "none";
	document.getElementsByClassName("add-cont-3")[0].style.display = "none";

	document.getElementById("add-Task").style.display = "block";
	document.getElementById("add-Task-inp").style.display = "block";
}

function edit() {
	add_user_task.style.display = "none";
	del_user_task.style.display = "none";
	state = 3;

	document.getElementsByClassName("add-cont-1")[0].style.display = "block";
	document.getElementsByClassName("add-cont-2")[0].style.display = "block";
	document.getElementsByClassName("add-cont-3")[0].style.display = "block";

	document.getElementsByClassName("add_save_1")[0].style.display = "none";
	document.getElementsByClassName("add_save_2")[0].style.display = "block";

	var nameAdd = document.getElementById("add-name-inp");
	var firstDAdd = document.getElementById("add-first-day-inp");
	var lastDAdd = document.getElementById("add-last-day-inp");

	document.getElementById("add-Task").style.display = "block";
	document.getElementById("add-Task-inp").style.display = "block";

	if (nameAdd.value) {
		check = -1;
		for (var i = 0; i < users.length; i++) {
			if (users[i][0] == nameAdd.value) {
				check = i;
				break;
			}
		}
		if (check != -1) {
			var ul = document.getElementsByClassName("add-list-ul")[0];
			ul.innerHTML = '';
			for (var i = 0; i < users[check][1].length; i++) {
				var li = document.createElement("li");
				li.appendChild(document.createTextNode(users[check][1][i][0]));
				li.classList.add("elmL");
				ul.appendChild(li);
			}
			listElem = document.querySelectorAll(".elmL");

			listElem.forEach((item, index) => {
				item.addEventListener('click', function() {
					if (state != 0) {
						selection = index + 1;
						console.log("Pos: " + selection);
						firstDAdd.value = users[check][1][index][1];
						lastDAdd.value = users[check][1][index][2];
					}
				});
			});
		}
	}
}

function del_user() {
	document.getElementsByClassName("add-cont-1")[0].style.display = "block";
	document.getElementsByClassName("add-cont-2")[0].style.display = "none";
	document.getElementsByClassName("add-cont-3")[0].style.display = "none";

	document.getElementsByClassName("add_save_1")[0].style.display = "block";
	document.getElementsByClassName("add_save_2")[0].style.display = "none";

	document.getElementById("add-Task").style.display = "block";
	document.getElementById("add-Task-inp").style.display = "block";

	state = 4;
}

function del_task() {
	document.getElementsByClassName("add-cont-1")[0].style.display = "block";
	document.getElementsByClassName("add-cont-2")[0].style.display = "block";
	document.getElementsByClassName("add-cont-3")[0].style.display = "none";

	document.getElementsByClassName("add_save_1")[0].style.display = "none";
	document.getElementsByClassName("add_save_2")[0].style.display = "block";

	document.getElementById("add-Task").style.display = "none";
	document.getElementById("add-Task-inp").style.display = "none";

	state = 5;

	var nameAdd = document.getElementById("add-name-inp");
	for (var i = 0; i < users.length; i++) {
		if (users[i][0] == nameAdd.value) {
			check = i;
			break;
		}
	}

	if (check != -1) {
		var ul = document.getElementsByClassName("add-list-ul")[0];
		ul.innerHTML = '';
		for (var i = 0; i < users[check][1].length; i++) {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(users[check][1][i][0]));
			li.classList.add("elmL");
			ul.appendChild(li);
		}
		listElem = document.querySelectorAll(".elmL");

		listElem.forEach((item, index) => {
			item.addEventListener('click', function() {
				if (state != 0) {
					selection = index + 1;
					console.log("Pos: " + selection);
				}
			});
		});
	}
}

function del() {
	add_user_task.style.display = "none";
	del_user_task.style.display = "block";

	document.getElementsByClassName("add-cont-1")[0].style.display = "none";
	document.getElementsByClassName("add-cont-2")[0].style.display = "none";
	document.getElementsByClassName("add-cont-3")[0].style.display = "none";
}

function add_save() {
	if (state == 1) {
		users.push(new Array(
			document.getElementById("add-name-inp").value || "None",
			new Array()
		));
		localStorage.setItem("all-users", JSON.stringify(users));
		window.location.reload(1);
		console.log("Se agrego un nuevo usuario");
	} else if (state == 2) {
		var nameAdd = document.getElementById("add-Task-inp");
		var firstDAdd = document.getElementById("add-first-day-inp");
		var lastDAdd = document.getElementById("add-last-day-inp");
		var tempElement = [];
		if (nameAdd.value && firstDAdd.value && lastDAdd.value) {
			users[check][1].splice(selection, 0, new Array(nameAdd.value, firstDAdd.value, lastDAdd.value));

			selection = -1;
			check = -1;
			localStorage.setItem("all-users", JSON.stringify(users));
			window.location.reload(1);
			console.log("Se a agregado una nueva tarea!");
		} else {
			console.log("Ingrese los datos");
		}
	} else if (state == 3) {
		var nameAdd = document.getElementById("add-name-inp");
		var firstDAdd = document.getElementById("add-first-day-inp");
		var lastDAdd = document.getElementById("add-last-day-inp");
		if (nameAdd.value && selection != -1) {
			check = -1;
			for (var i = 0; i < users.length; i++) {
				if (users[i][0] == nameAdd.value) {
					check = i;
					break;
				}
			}
			if (check != -1) {
				if (document.getElementById("add-Task-inp").value) {
					console.log("Texto");
					users[check][1].splice(
						selection,
						0,
						new Array(
							document.getElementById("add-Task-inp").value,
							firstDAdd.value,
							lastDAdd.value
						)
					);
				} else {
					users[check][1][selection - 1][1] = firstDAdd.value;
					users[check][1][selection - 1][2] = lastDAdd.value;
				}

				localStorage.setItem("all-users", JSON.stringify(users));
				window.location.reload(1);
				console.log("Se ha editado un usuario");
			} else {
				console.log("No se ha ingresado un usuario valido");
			}
		} else {
			console.log("Ingrese los datos");
		}
	} else if (state == 4) {
		var delUser = document.getElementById("add-name-inp");
		
		if (delUser.value) {
			check = -1;
			for (var i = 0; i < users.length; i++) {
				if (users[i][0] == delUser.value) {
					check = i;
					break;
				}
			}
			if (check != -1) {
				if (confirm("Estas seguro que quieres borrar este usuario?")) {
					users.splice(check, 1);
					localStorage.setItem("all-users", JSON.stringify(users));
					window.location.reload(1);
				}
			}
		}
	} else if (state == 5) {
		if (check != -1 && selection != -1) {
			if (confirm("Estas seguro que quieres borrar esta tarea?")) {
				users[check][1].splice(selection - 1, 1);
				localStorage.setItem("all-users", JSON.stringify(users));
				window.location.reload(1);
			}
		}
	}

	state = 0;
	check = -1;
	selection = -1;
}

function addTask(user, pos, taskName, startDay, endDay, important = false) {
	try {
		users[user][1].splice(pos, 0, new Array(taskName, startDay, endDay, important));

		var nA = new Date(startDay);
		var nB = new Date(endDay);
		var wA = new Date(users[user][1][pos - 1][1]);
		var wB = new Date(users[user][1][pos - 1][2]);

		var a;
		if (important) {
			//Generar bloque gris
			if (wA <= nB && wB >= nA) {
				if (wA <= nA) { //Primer dia visiblie
					if (wB >= nB) { //Ultimo dia visible
						a = new Date(wB.getTime() + (nB.getTime() - nA.getTime()));
					} else { //Ultimo dia NO visible
						a = new Date(wB.getTime() + (wB.getTime() - nA.getTime()));
					}
				} else { //Primer dia NO visble
					if (wB >= nB) { //Ultimo dia visible
						a = new Date(wB.getTime() + (nB.getTime() - wA.getTime()));
					} else { //Ultimo dia NO visible
						a = new Date(wB.getTime() + (nB.getTime() - nA.getTime()))
					}
				}

				var fixMonth, fixDay;
				if (a.getMonth().toString().length == 2 && a.getMonth() > 9) {
					fixMonth = a.getMonth() + 1;
				} else {
					var temp = a.getMonth() + 1;
					fixMonth = "0" + (a.getMonth() + 1);
				}
				if ((a.getDate().toString().length) == 2) {
					fixDay = a.getDate();
				} else {
					fixDay = "0" + a.getDate().toString();
				}
				users[user][1][pos - 1][2] = a.getFullYear() + "-" + ((a.getMonth().toString().length == 2 || a.getMonth() > 8) ? (a.getMonth() + 1) : ("0" + (a.getMonth() + 1))) + "-" + (((a.getDate().toString().length) == 2) ? a.getDate() : "0" + a.getDate().toString()) + "T" + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
			} else {
				//console.log("El trabajo NO interfiere");
			}

			var temp = pos + 1;
			if (temp < users[user][1].length && new Date(users[user][1][temp][1]) < new Date(users[user][1][temp - 2][2])) {
				var aa = new Date(users[user][1][temp][1]);
				var bb = new Date(users[user][4][temp][2]);
				var a = new Date(aa.getTime() + (nB.getTime() - nA.getTime()));
				var b = new Date(bb.getTime() + (nB.getTime() - nA.getTime()));
				users[user][1][temp][1] = a.getFullYear() + "-" + ((a.getMonth().toString().length == 2 || a.getMonth() > 8) ? (a.getMonth() + 1) : ("0" + (a.getMonth() + 1))) + "-" + (((a.getDate().toString().length) == 2) ? a.getDate() : "0" + a.getDate().toString()) + "T" + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
				users[user][1][temp][2] = b.getFullYear() + "-" + ((b.getMonth().toString().length == 2 || b.getMonth() > 8) ? (b.getMonth() + 1) : ("0" + (b.getMonth() + 1))) + "-" + (((b.getDate().toString().length) == 2) ? b.getDate() : "0" + b.getDate().toString()) + "T" + b.getHours() + ":" + b.getMinutes() + ":" + b.getSeconds();
				temp++;

				while (temp < users[user][4].length) {
					console.log(new Date(users[user][1][temp][1]));
					console.log(new Date(users[user][1][temp - 1][2]));
					if (new Date(users[user][1][temp][1]) > new Date(users[user][1][temp - 1][2])) {
						break;
					}

					var aa = new Date(users[user][1][temp][1]);
					var bb = new Date(users[user][1][temp][2]);
					var a = new Date(aa.getTime() + (nB.getTime() - nA.getTime()));
					var b = new Date(bb.getTime() + (nB.getTime() - nA.getTime()));
					users[user][1][temp][1] = a.getFullYear() + "-" + ((a.getMonth().toString().length == 2 || a.getMonth() > 8) ? (a.getMonth() + 1) : ("0" + (a.getMonth() + 1))) + "-" + (((a.getDate().toString().length) == 2) ? a.getDate() : "0" + a.getDate().toString()) + "T" + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
					users[user][1][temp][2] = b.getFullYear() + "-" + ((b.getMonth().toString().length == 2 || b.getMonth() > 8) ? (b.getMonth() + 1) : ("0" + (b.getMonth() + 1))) + "-" + (((b.getDate().toString().length) == 2) ? b.getDate() : "0" + b.getDate().toString()) + "T" + b.getHours() + ":" + b.getMinutes() + ":" + b.getSeconds();
					temp++;
				}
			}
		}
	} catch(e) {
		console.log(e);
	}
}

function manage() {
	edit_box.style.display = "block";
	var inputs = edit_box.getElementsByTagName('input');
    for (var index = 0; index < inputs.length; ++index) {
        inputs[index].value = '';
    }
}

function delTask(user, pos) {
	try {
		users[user][1].splice(pos, 1);
		console.log("Se ha eliminado un trabajo del usuario " + users[user][0] + "!");
	} catch(e) {
		console.log("No se ha ingresado un usuario valido.");
	}
}

function save() {
	switch (state) {
		case 0:
		addUser();
		break;

		case 1:
		/*var bool = false;
		if (document.getElementById("important").value === "true") {
			bool = true;
		}
		addTask(parseInt(document.getElementById("user").value), parseInt(document.getElementById("position2").value), document.getElementById("name-task").value, document.getElementById("start-date").value, document.getElementById("end-date").value, bool);*/
		
		break;

		case 2:
		//editUser(parseInt(document.getElementById("user2").value), document.getElementById("new-user").value, parseInt(document.getElementById("position3").value), document.getElementById("new-name-task").value);
		break;
	}
	localStorage.setItem("all-users", JSON.stringify(users));
}

function reset() {
	localStorage.removeItem('all-users');
}