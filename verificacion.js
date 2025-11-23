if (localStorage.getItem("verified") !== "true") {
  alert("Acceso denegado");
  window.location.href = "login.html";
}
