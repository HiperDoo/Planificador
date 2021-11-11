function login() {
	var userName = document.getElementsByClassName("user")[0].value;
	var password = document.getElementsByClassName("password")[0].value;

	if (userName == "admin" && password == "admin") {
		window.location.replace('index.html');
		return true;
	} else {
		alert("Usuario o Contraseña Incorrecta");
		document.getElementsByClassName("user")[0].value = "";
		document.getElementsByClassName("password")[0].value = "";
	}
}