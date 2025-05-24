document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("manageForm");
  const bookingDetails = document.getElementById("bookingDetails");
  const bookingInfo = document.getElementById("bookingInfo");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const bookingRef = formData.get("bookingRef");
    const lastName = formData.get("lastName");

    // Simulate booking lookup (in real app, this would be an API call)
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

    // Display booking details
    bookingDetails.style.display = "block";
    bookingInfo.textContent = JSON.stringify(mockBooking, null, 2);
    
    // Smooth scroll to results
    bookingDetails.scrollIntoView({ behavior: 'smooth' });
    
    alert("Booking found! Details displayed below.");
  });

  // Add event listeners for action buttons
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("modify-btn")) {
      alert("Modify booking functionality would be implemented here.");
    } else if (e.target.classList.contains("cancel-btn")) {
      if (confirm("Are you sure you want to cancel this booking?")) {
        alert("Booking cancelled successfully.");
      }
    }
  });
});