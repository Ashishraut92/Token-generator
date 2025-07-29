document.getElementById("tokenForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const type = document.getElementById("type").value;

  if (!name || !type) {
    alert("Please enter a name and select a type.");
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/createjwt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, type })
    });

    const data = await res.json();
    document.getElementById("response").textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    document.getElementById("response").textContent = "Error: " + error.message;
  }
});
