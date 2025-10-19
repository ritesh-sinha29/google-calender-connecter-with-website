export interface CalendarEvent {
  title: string;
  description: string;
  location?: string;
  startTime: Date;
  endTime: Date;
}

/**
 * Generates Google Calendar URL to create event (like Unstop)
 * Opens Google Calendar with pre-filled event data
 */
export function openGoogleCalendarEvent(event: CalendarEvent): void {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location || '',
    dates: `${formatDate(event.startTime)}/${formatDate(event.endTime)}`,
  });

  const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
  
  console.log('🔗 Opening Google Calendar:', url);
  window.open(url, '_blank');
}

/**
 * Alternative: Direct create URL (simpler)
 */
export function createGoogleCalendarLink(event: CalendarEvent): string {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location || '',
    dates: `${formatDate(event.startTime)}/${formatDate(event.endTime)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}