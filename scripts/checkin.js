document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkinForm");
  const boardingPass = document.getElementById("boardingPass");
  const passDetails = document.getElementById("passDetails");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const services = [];
    form.querySelectorAll("input[name='services']:checked").forEach((cb) =>
      services.push(cb.value)
    );

    const checkinData = {
      bookingReference: formData.get("checkinRef"),
      passenger: formData.get("passengerName"),
      flight: "FDA330",
      route: "Sydney → Melbourne",
      date: "2025-06-03",
      departure: "09:00",
      seat: "12A",
      gate: "A12",
      terminal: "1",
      boardingTime: "08:30",
      additionalServices: services,
      checkinTime: new Date().toLocaleString(),
      status: "Checked In"
    };

    // Generate boarding pass
    const boardingPassHTML = `
      <div style="border: 2px dashed #667eea; padding: 20px; margin: 10px 0;">
        <h3 style="color: #667eea; text-align: center; margin-bottom: 20px;">BOARDING PASS</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <p><strong>Passenger:</strong> ${checkinData.passenger}</p>
            <p><strong>Flight:</strong> ${checkinData.flight}</p>
            <p><strong>Route:</strong> ${checkinData.route}</p>
            <p><strong>Date:</strong> ${checkinData.date}</p>
          </div>
          <div>
            <p><strong>Seat:</strong> ${checkinData.seat}</p>
            <p><strong>Gate:</strong> ${checkinData.gate}</p>
            <p><strong>Terminal:</strong> ${checkinData.terminal}</p>
            <p><strong>Boarding:</strong> ${checkinData.boardingTime}</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px dashed #667eea;">
          <p style="font-size: 12px; color: #666;">Please arrive at gate 30 minutes before boarding time</p>
        </div>
      </div>
    `;

    // Display boarding pass
    boardingPass.style.display = "block";
    passDetails.innerHTML = boardingPassHTML;
    
    // Smooth scroll to boarding pass
    boardingPass.scrollIntoView({ behavior: 'smooth' });
    
    alert("Check-in successful! Your boarding pass is ready.");
  });
});