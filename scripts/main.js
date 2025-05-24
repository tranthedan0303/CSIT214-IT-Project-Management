document.addEventListener("DOMContentLoaded", () => {
  const flightSelect = document.getElementById("flight");
  const form = document.getElementById("bookingForm");
  const output = document.getElementById("output");
  const outputSection = document.getElementById("outputSection");
  
  let flightsData = [];

  // Generate booking reference
  function generateBookingReference() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let ref = 'FDA';
    
    // Add 3 random letters
    for (let i = 0; i < 3; i++) {
      ref += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    // Add 3 random numbers
    for (let i = 0; i < 3; i++) {
      ref += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    return ref;
  }

  // Store booking in memory (since localStorage is not available)
  const bookingStorage = new Map();

  // Fetch flights from JSON file
  fetch("assets/flights.json")
    .then((res) => res.json())
    .then((flights) => {
      flightsData = flights;
      flights.forEach((f) => {
        const option = document.createElement("option");
        option.value = f.id;
        option.textContent = `${f.id}: ${f.from} → ${f.to} (${f.time})`;
        flightSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error loading flights:", error);
      // Fallback data if JSON fails to load
      flightsData = [
        {
          "id": "FDA330",
          "from": "Sydney",
          "to": "Melbourne",
          "time": "2025-06-03 09:00"
        },
        {
          "id": "FDA721",
          "from": "Brisbane",
          "to": "Perth",
          "time": "2025-06-12 13:30"
        },
        {
          "id": "FDA125",
          "from": "Adelaide",
          "to": "Canberra",
          "time": "2025-06-24 16:15"
        }
      ];
      
      flightsData.forEach((f) => {
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

    // Find selected flight details
    const selectedFlightId = formData.get("flight");
    const selectedFlight = flightsData.find(f => f.id === selectedFlightId);
    
    // Generate booking reference
    const bookingReference = generateBookingReference();
    
    const bookingData = {
      bookingReference: bookingReference,
      name: formData.get("fullName"),
      email: formData.get("email"),
      flight: selectedFlight ? {
        id: selectedFlight.id,
        from: selectedFlight.from,
        to: selectedFlight.to,
        time: selectedFlight.time
      } : null,
      seat: formData.get("seat"),
      services: services,
      bookingTime: new Date().toLocaleString(),
      status: "Confirmed"
    };

    // Store booking data in memory
    bookingStorage.set(bookingReference, bookingData);
    
    // Make booking accessible globally for other pages
    window.flydreamair_bookings = window.flydreamair_bookings || new Map();
    window.flydreamair_bookings.set(bookingReference, bookingData);
    
    // Show output section and display booking data
    outputSection.style.display = "block";

    output.innerHTML = `
      <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #28a745;">
        <h4 style="color: #28a745; margin: 0 0 10px 0;">✓ Booking Confirmed!</h4>
        <p style="margin: 0; font-weight: 600; font-size: 18px;">Booking Reference: <span style="color: #28a745;">${bookingReference}</span></p>
        <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">Please save this reference number for managing your booking</p>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px;">
        <div>
          <p><strong>Passenger Name:</strong> ${bookingData.name}</p>
          <p><strong>Email:</strong> ${bookingData.email}</p>
          <p><strong>Seat:</strong> ${bookingData.seat}</p>
        </div>
        <div>
          <p><strong>Flight:</strong> ${selectedFlight ? selectedFlight.id : 'N/A'}</p>
          <p><strong>Route:</strong> ${selectedFlight ? `${selectedFlight.from} → ${selectedFlight.to}` : 'N/A'}</p>
          <p><strong>Date & Time:</strong> ${selectedFlight ? selectedFlight.time : 'N/A'}</p>
        </div>
      </div>
      
      <p><strong>In-Flight Services:</strong> ${bookingData.services.length > 0 ? bookingData.services.join(", ") : "None"}</p>
      <p><strong>Booking Time:</strong> ${bookingData.bookingTime}</p>
      <p><strong>Status:</strong> <span style="color: #28a745; font-weight: 600;">${bookingData.status}</span></p>
      
      <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
        <p style="margin: 0; font-size: 14px; color: #666;">
          <strong>Next Steps:</strong><br>
          • Use your booking reference <strong>${bookingReference}</strong> to manage your booking<br>
          • Check in online 24 hours before departure<br>
          • Arrive at the airport 2 hours before domestic flights
        </p>
      </div>
    `;

    // Smooth scroll to output
    outputSection.scrollIntoView({ behavior: 'smooth' });
    
    alert(`Booking confirmed! Your booking reference is: ${bookingReference}\n\nPlease save this reference number.`);
  });
});