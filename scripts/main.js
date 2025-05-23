document.addEventListener("DOMContentLoaded", () => {
  const flightSelect = document.getElementById("flight");
  const form = document.getElementById("bookingForm");
  const output = document.getElementById("output");
  const outputSection = document.getElementById("outputSection");

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
    })
    .catch((error) => {
      console.error("Error loading flights:", error);
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
      bookingTime: new Date().toLocaleString()
    };

    // Store booking data in localStorage
    localStorage.setItem("bookingData", JSON.stringify(bookingData, null, 2));
    
    // Show output section and display booking data with a friendly layout
    outputSection.style.display = "block";

    output.innerHTML = `
      <p><strong>Name:</strong> ${bookingData.name}</p>
      <p><strong>Email:</strong> ${bookingData.email}</p>
      <p><strong>Flight:</strong> ${bookingData.flight}</p>
      <p><strong>Seat:</strong> ${bookingData.seat}</p>
      <p><strong>In-Flight Services:</strong> ${bookingData.services.length > 0 ? bookingData.services.join(", ") : "None"}</p>
      <p><strong>Booking Time:</strong> ${bookingData.bookingTime}</p>
    `;

    
    // Smooth scroll to output
    outputSection.scrollIntoView({ behavior: 'smooth' });
    
    alert("Booking confirmed! Check your booking details below.");
  });
});