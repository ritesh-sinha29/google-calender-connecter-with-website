export class GoogleCalendarService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async listEvents() {
    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    return response.json();
  }

  async createEvent(event: {
    title: string;
    description?: string;
    location?: string;
    startTime: Date;
    endTime: Date;
  }) {
    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: event.title,
          description: event.description,
          location: event.location,
          start: {
            dateTime: event.startTime.toISOString(),
          },
          end: {
            dateTime: event.endTime.toISOString(),
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to create event');
    }

    return response.json();
  }
}