export interface CalendarEvent {
  title: string;
  description: string;
  location?: string;
  startTime: Date;
  endTime: Date;
}

/**
 * Format date for Google Calendar in local timezone
 * Format: YYYYMMDDTHHmmss (without Z suffix = local time)
 */
function formatDateForGoogle(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  // Format: YYYYMMDDTHHmmss (local time, no Z at end)
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Generates Google Calendar URL to create event (like Unstop)
 * Opens Google Calendar with pre-filled event data
 */
export function openGoogleCalendarEvent(event: CalendarEvent): void {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location || '',
    dates: `${formatDateForGoogle(event.startTime)}/${formatDateForGoogle(event.endTime)}`,
  });

  const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
  
  console.log('🔗 Opening Google Calendar:', url);
  console.log('📅 Start Time:', event.startTime.toLocaleString());
  console.log('📅 End Time:', event.endTime.toLocaleString());
  window.open(url, '_blank');
}

/**
 * Alternative: Direct create URL (simpler)
 */
export function createGoogleCalendarLink(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location || '',
    dates: `${formatDateForGoogle(event.startTime)}/${formatDateForGoogle(event.endTime)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}