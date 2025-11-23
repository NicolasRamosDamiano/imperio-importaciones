const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("exampleInputEmail1").value;
  const pass = document.getElementById("exampleInputPassword1").value;

  if (!email.includes("@")) {
    alert("Email inválido");
    return;
  }

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPass", pass);
  localStorage.setItem("verified", "true");

  alert("Guardado");
  window.location.href = "index.html";
});
