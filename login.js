const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("exampleInputEmail1").value;
  const pass = document.getElementById("exampleInputPassword1").value;

  if (!email.includes("@")) {
    alert("Email inválido");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass }),
    });

    const data = await res.json();

    if (data.ok) {
      alert("Guardado en la base");
      window.location.href = "index.html";
    } else {
      alert("Error guardando");
    }
  } catch (err) {
    alert("No se pudo conectar al servidor");
  }
});
