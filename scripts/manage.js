document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("manageForm");
  const bookingDetails = document.getElementById("bookingDetails");
  const bookingInfo = document.getElementById("bookingInfo");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const bookingRef = formData.get("bookingRef").toUpperCase();
    const lastName = formData.get("lastName");

    // Check if booking exists in global storage
    let foundBooking = null;
    
    if (window.flydreamair_bookings && window.flydreamair_bookings.has(bookingRef)) {
      const booking = window.flydreamair_bookings.get(bookingRef);
      // Verify last name matches (simple check - get last word of full name)
      const bookingLastName = booking.name.split(' ').pop().toLowerCase();
      if (bookingLastName === lastName.toLowerCase()) {
        foundBooking = booking;
      }
    }

    if (foundBooking) {
      // Display real booking details
      const bookingHTML = `
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #28a745;">
          <h4 style="color: #28a745; margin: 0 0 10px 0;">✓ Booking Found</h4>
          <p style="margin: 0; font-weight: 600;">Reference: ${foundBooking.bookingReference}</p>
          <p style="margin: 5px 0 0 0; color: #666;">Status: ${foundBooking.status}</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div>
            <h4 style="color: #2c3e50; margin-bottom: 10px;">Passenger Details</h4>
            <p><strong>Name:</strong> ${foundBooking.name}</p>
            <p><strong>Email:</strong> ${foundBooking.email}</p>
            <p><strong>Seat:</strong> ${foundBooking.seat}</p>
          </div>
          <div>
            <h4 style="color: #2c3e50; margin-bottom: 10px;">Flight Details</h4>
            <p><strong>Flight:</strong> ${foundBooking.flight ? foundBooking.flight.id : 'N/A'}</p>
            <p><strong>Route:</strong> ${foundBooking.flight ? `${foundBooking.flight.from} → ${foundBooking.flight.to}` : 'N/A'}</p>
            <p><strong>Date & Time:</strong> ${foundBooking.flight ? foundBooking.flight.time : 'N/A'}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h4 style="color: #2c3e50; margin-bottom: 10px;">Additional Information</h4>
          <p><strong>In-Flight Services:</strong> ${foundBooking.services.length > 0 ? foundBooking.services.join(", ") : "None"}</p>
          <p><strong>Booking Time:</strong> ${foundBooking.bookingTime}</p>
          <p><strong>Status:</strong> <span style="color: #28a745; font-weight: 600;">${foundBooking.status}</span></p>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #666;">
            <strong>Important:</strong> Please arrive at the airport 2 hours before domestic flights.
            Online check-in opens 24 hours before departure.
          </p>
        </div>
      `;
      
      bookingInfo.innerHTML = bookingHTML;
      bookingDetails.style.display = "block";
      bookingDetails.scrollIntoView({ behavior: 'smooth' });
      
    } else {
      // Show mock booking for demonstration (when real booking not found)
      const mockBooking = {
        reference: bookingRef,
        passenger: lastName,
        flight: "FDA330: Sydney → Melbourne",
        date: "2025-06-03",
        time: "09:00",
        seat: "12A",
        services: ["Meal", "Drink"],
        status: "Confirmed"
      };

      const mockBookingHTML = `
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
          <h4 style="color: #856404; margin: 0 0 10px 0;">⚠️ Demo Booking</h4>
          <p style="margin: 0; font-size: 14px; color: #856404;">This is demonstration data. For real bookings, use the booking reference from your confirmation.</p>
        </div>
        
        <div style="font-family: 'Courier New', monospace; background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
          <p><strong>Booking Reference:</strong> ${mockBooking.reference}</p>
          <p><strong>Passenger:</strong> ${mockBooking.passenger}</p>
          <p><strong>Flight:</strong> ${mockBooking.flight}</p>
          <p><strong>Date:</strong> ${mockBooking.date}</p>
          <p><strong>Time:</strong> ${mockBooking.time}</p>
          <p><strong>Seat:</strong> ${mockBooking.seat}</p>
          <p><strong>Services:</strong> ${mockBooking.services.join(", ")}</p>
          <p><strong>Status:</strong> ${mockBooking.status}</p>
        </div>
      `;
      
      bookingInfo.innerHTML = mockBookingHTML;
      bookingDetails.style.display = "block";
      bookingDetails.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Add event listeners for action buttons
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("modify-btn")) {
      alert("Modify booking functionality:\n\n• Change seat assignment\n• Update passenger details\n• Add/remove services\n• Upgrade fare class\n\nThis would redirect to a modification form in a real application.");
    } else if (e.target.classList.contains("cancel-btn")) {
      if (confirm("Are you sure you want to cancel this booking?\n\nCancellation fees may apply according to fare conditions.")) {
        // Update booking status if it's a real booking
        const bookingRef = document.getElementById("bookingRef").value.toUpperCase();
        if (window.flydreamair_bookings && window.flydreamair_bookings.has(bookingRef)) {
          const booking = window.flydreamair_bookings.get(bookingRef);
          booking.status = "Cancelled";
          window.flydreamair_bookings.set(bookingRef, booking);
        }
        
        alert("Booking cancelled successfully.\n\nRefund processing time: 5-7 business days\nCancellation reference will be sent to your email.");
        
        // Refresh the display
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    }
  });
});