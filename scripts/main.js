document.addEventListener("DOMContentLoaded", () => {
  const flightSelect = document.getElementById("flight");
  const form = document.getElementById("bookingForm");
  const output = document.getElementById("output");

  // Fetch flights from JSON file
  fetch("assets/flights.json")
    .then((res) => res.json())
    .then((flights) => {
      flights.forEach((f) => {
        const option = document.createElement("option");
        option.value = f.id;
        option.textContent = `${f.id}: ${f.from} → ${f.to} (${f.time})`;
        flightSelect.appendChild(option);
      });
    });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const services = [];
    form.querySelectorAll("input[name='services']:checked").forEach((cb) =>
      services.push(cb.value)
    );

    const bookingData = {
      name: formData.get("fullName"),
      email: formData.get("email"),
      flight: formData.get("flight"),
      seat: formData.get("seat"),
      services: services,
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData, null, 2));
    output.textContent = JSON.stringify(bookingData, null, 2);
    alert("Booking confirmed!");
  });
});
