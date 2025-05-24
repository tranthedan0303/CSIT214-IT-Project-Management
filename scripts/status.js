document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("statusForm");
  const flightStatus = document.getElementById("flightStatus");

  // Mock flight data
  const flightData = {
    "FDA330": {
      route: "Sydney → Melbourne",
      departure: { time: "09:00", airport: "Sydney (SYD)" },
      arrival: { time: "10:30", airport: "Melbourne (MEL)" },
      status: "On Time",
      gate: "A12",
      terminal: "1",
      aircraft: "Boeing 737-800"
    },
    "FDA721": {
      route: "Brisbane → Perth",
      departure: { time: "13:30", airport: "Brisbane (BNE)" },
      arrival: { time: "16:00", airport: "Perth (PER)" },
      status: "Delayed",
      gate: "B08",
      terminal: "2",
      aircraft: "Airbus A320"
    },
    "FDA125": {
      route: "Adelaide → Canberra",
      departure: { time: "16:15", airport: "Adelaide (ADL)" },
      arrival: { time: "18:45", airport: "Canberra (CBR)" },
      status: "Boarding",
      gate: "C05",
      terminal: "1",
      aircraft: "Boeing 737-700"
    }
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const flightNumber = formData.get("flightNumber").toUpperCase();
    const flightDate = formData.get("flightDate");

    const flight = flightData[flightNumber];

    if (flight) {
      // Update flight status display
      document.getElementById("flightNum").textContent = flightNumber;
      document.getElementById("route").textContent = flight.route;
      document.getElementById("depTime").textContent = flight.departure.time;
      document.getElementById("depAirport").textContent = flight.departure.airport;
      document.getElementById("arrTime").textContent = flight.arrival.time;
      document.getElementById("arrAirport").textContent = flight.arrival.airport;
      document.getElementById("gate").textContent = flight.gate;
      document.getElementById("terminal").textContent = flight.terminal;
      document.getElementById("aircraft").textContent = flight.aircraft;

      // Update status badge
      const statusBadge = document.getElementById("statusBadge");
      statusBadge.textContent = flight.status;
      
      // Change badge color based on status
      statusBadge.className = "status-badge";
      if (flight.status === "Delayed") {
        statusBadge.style.background = "#dc3545";
      } else if (flight.status === "Boarding") {
        statusBadge.style.background = "#ffc107";
        statusBadge.style.color = "#000";
      } else {
        statusBadge.style.background = "#28a745";
        statusBadge.style.color = "#fff";
      }

      // Show flight status
      flightStatus.style.display = "block";
      flightStatus.scrollIntoView({ behavior: 'smooth' });
      
    } else {
      alert("Flight not found. Please check the flight number and try again.");
    }
  });
});