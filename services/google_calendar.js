function addGoogleCalendarEvent(appointment) {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const text = `Haircut Appointment with ${appointment.barber}`;
    const startTime = appointment.dateStart.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; 
    const endTime = appointment.dateEnd.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; // End time for event
    const details = `Appointment for ${appointment.service}.`;
    const location = appointment.location;
  
    const calendarUrl = `${baseUrl}&text=${encodeURIComponent(text)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
    window.open(calendarUrl, '_blank');
  }
  