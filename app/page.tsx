"use client";

import { useState } from "react";
import { CalendarEventModal } from "@/components/CalendarEventModal";
import { openGoogleCalendarEvent } from "@/lib/calendar-utils";

export default function CalendarPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ 
      padding: "50px", 
      fontFamily: "sans-serif", 
      maxWidth: "1200px", 
      margin: "0 auto",
      background: "var(--background)",
      color: "var(--foreground)",
      minHeight: "100vh",
    }}>
      {/* Header */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "30px" 
      }}>
        <div>
          <h1>📅 Clario Calendar</h1>
          <p style={{ color: "var(--foreground)", opacity: 0.7 }}>
            Manage your learning schedule and events
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--button-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          + Create Event
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        border: `1px solid var(--card-border)`,
        borderRadius: '8px',
        padding: '40px',
        backgroundColor: 'var(--card-bg)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>📅</div>
        <h2 style={{ marginBottom: '10px' }}>Quick Event Creation</h2>
        <p style={{ color: 'var(--foreground)', opacity: 0.7, marginBottom: '30px' }}>
          Create events that open directly in Google Calendar
        </p>
        
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: '15px 30px',
            backgroundColor: 'var(--button-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: '500',
          }}
        >
          🚀 Here You Go
        </button>
      </div>

      {/* Quick Add Buttons */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: 'var(--card-bg)',
        border: `1px solid var(--card-border)`,
        borderRadius: '8px',
      }}>
        <h3>⚡ Quick Add</h3>
        <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '15px' }}>
          Common events for Clario users:
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              const tomorrow2PM = new Date();
              tomorrow2PM.setDate(tomorrow2PM.getDate() + 1);
              tomorrow2PM.setHours(14, 0, 0, 0);
              
              openGoogleCalendarEvent({
                title: '1:1 Mentorship Session',
                description: 'Career guidance and roadmap discussion',
                location: 'Google Meet',
                startTime: tomorrow2PM,
                endTime: new Date(tomorrow2PM.getTime() + 60 * 60 * 1000),
              });
            }}
            style={{
              padding: '10px 16px',
              backgroundColor: 'var(--button-success)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            🎓 Mentorship Session
          </button>
          
          <button
            onClick={() => {
              const nextWeek = new Date();
              nextWeek.setDate(nextWeek.getDate() + 7);
              nextWeek.setHours(10, 0, 0, 0);
              
              openGoogleCalendarEvent({
                title: 'Complete Course Module',
                description: 'Study and complete assigned course module',
                location: 'Online',
                startTime: nextWeek,
                endTime: new Date(nextWeek.getTime() + 2 * 60 * 60 * 1000),
              });
            }}
            style={{
              padding: '10px 16px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            📚 Study Session
          </button>
          
          <button
            onClick={() => {
              const nextMonth = new Date();
              nextMonth.setMonth(nextMonth.getMonth() + 1);
              nextMonth.setHours(23, 59, 0, 0);
              
              openGoogleCalendarEvent({
                title: 'Job Application Deadline',
                description: 'Submit application for target company',
                location: 'Online',
                startTime: nextMonth,
                endTime: nextMonth,
              });
            }}
            style={{
              padding: '10px 16px',
              backgroundColor: 'var(--button-danger)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            💼 Application Deadline
          </button>
        </div>
      </div>

      {/* Calendar Event Modal */}
      <CalendarEventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}