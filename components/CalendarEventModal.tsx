"use client";

import { useState, useRef, useEffect } from 'react';
import { openGoogleCalendarEvent } from '@/lib/calendar-utils';

interface CalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
}

export function CalendarEventModal({
  isOpen,
  onClose,
  selectedDate,
}: CalendarEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: selectedDate || new Date(),
    endTime: new Date((selectedDate?.getTime() || Date.now()) + 60 * 60 * 1000),
    location: '',
  });

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [tempStartTime, setTempStartTime] = useState(formData.startTime);
  const [tempEndTime, setTempEndTime] = useState(formData.endTime);
  
  const startTimeInputRef = useRef<HTMLInputElement>(null);
  const endTimeInputRef = useRef<HTMLInputElement>(null);

  // Auto-open native picker when picker is shown
  useEffect(() => {
    if (showStartTimePicker && startTimeInputRef.current) {
      setTimeout(() => {
        startTimeInputRef.current?.focus();
        startTimeInputRef.current?.showPicker?.();
      }, 50);
    }
  }, [showStartTimePicker]);

  useEffect(() => {
    if (showEndTimePicker && endTimeInputRef.current) {
      setTimeout(() => {
        endTimeInputRef.current?.focus();
        endTimeInputRef.current?.showPicker?.();
      }, 50);
    }
  }, [showEndTimePicker]);

  const formatDateTimeLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const parseDateTimeLocal = (dateTimeString: string): Date => {
    // Parse the datetime-local string without timezone conversion
    const [datePart, timePart] = dateTimeString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(day);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    
    return date;
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📝 Creating event:', formData);

    openGoogleCalendarEvent({
      title: formData.title,
      description: formData.description,
      location: formData.location,
      startTime: formData.startTime,
      endTime: formData.endTime,
    });

    onClose();
    
    setFormData({
      title: '',
      description: '',
      startTime: new Date(),
      endTime: new Date(Date.now() + 60 * 60 * 1000),
      location: '',
    });
    setShowStartTimePicker(false);
    setShowEndTimePicker(false);
  };

  const handleStartTimeClick = () => {
    setTempStartTime(formData.startTime);
    setShowStartTimePicker(true);
  };

  const handleEndTimeClick = () => {
    setTempEndTime(formData.endTime);
    setShowEndTimePicker(true);
  };

  const saveStartTime = () => {
    setFormData({ ...formData, startTime: tempStartTime });
    setShowStartTimePicker(false);
  };

  const saveEndTime = () => {
    setFormData({ ...formData, endTime: tempEndTime });
    setShowEndTimePicker(false);
  };

  const cancelStartTime = () => {
    setTempStartTime(formData.startTime);
    setShowStartTimePicker(false);
  };

  const cancelEndTime = () => {
    setTempEndTime(formData.endTime);
    setShowEndTimePicker(false);
  };

  const clearStartTime = () => {
    const now = new Date();
    setTempStartTime(now);
  };

  const setStartTimeToday = () => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    setTempStartTime(today);
  };

  const clearEndTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    setTempEndTime(now);
  };

  const setEndTimeToday = () => {
    const today = new Date();
    today.setHours(13, 0, 0, 0);
    setTempEndTime(today);
  };

  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--modal-overlay)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: 'var(--card-bg)',
    color: 'var(--foreground)',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: `0 20px 25px -5px var(--shadow)`,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    border: `1px solid var(--input-border)`,
    backgroundColor: 'var(--input-bg)',
    color: 'var(--foreground)',
    borderRadius: '6px',
    fontSize: '14px',
  };

  const displayTimeStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const pickerActionButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    flex: 1,
  };

  const pickerContainerStyle: React.CSSProperties = {
    padding: '15px',
    backgroundColor: 'var(--card-bg)',
    border: `2px solid var(--button-primary)`,
    borderRadius: '8px',
    marginTop: '8px',
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Create Event</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Event Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={inputStyle}
              placeholder="e.g., Team Meeting"
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              style={{
                ...inputStyle,
                resize: 'vertical',
              }}
              placeholder="Event details..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            {/* Start Time */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Start Time *
              </label>
              {!showStartTimePicker ? (
                <div onClick={handleStartTimeClick} style={displayTimeStyle}>
                  <span style={{ fontSize: '13px' }}>
                    {formData.startTime.toLocaleString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  <span>📅</span>
                </div>
              ) : (
                <div style={pickerContainerStyle}>
                  <input
                    ref={startTimeInputRef}
                    type="datetime-local"
                    value={formatDateTimeLocal(tempStartTime)}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue) {
                        const newDate = parseDateTimeLocal(inputValue);
                        if (!isNaN(newDate.getTime())) {
                          setTempStartTime(newDate);
                        }
                      }
                    }}
                    onBlur={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue) {
                        const newDate = parseDateTimeLocal(inputValue);
                        if (!isNaN(newDate.getTime())) {
                          setTempStartTime(newDate);
                        }
                      }
                    }}
                    style={{
                      ...inputStyle,
                      marginBottom: '10px',
                      cursor: 'pointer',
                    }}
                  />
                  
                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearStartTime();
                      }}
                      style={{
                        ...pickerActionButtonStyle,
                        backgroundColor: 'transparent',
                        color: 'var(--button-primary)',
                        border: `1px solid var(--button-primary)`,
                      }}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setStartTimeToday();
                      }}
                      style={{
                        ...pickerActionButtonStyle,
                        backgroundColor: 'transparent',
                        color: 'var(--button-primary)',
                        border: `1px solid var(--button-primary)`,
                      }}
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        saveStartTime();
                      }}
                      style={{
                        ...pickerActionButtonStyle,
                        backgroundColor: 'var(--button-success)',
                        color: 'white',
                      }}
                    >
                      💾 Save
                    </button>
                  </div>
                  
                  {/* Cancel button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelStartTime();
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: 'var(--button-secondary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                    }}
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>

            {/* End Time */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                End Time *
              </label>
              {!showEndTimePicker ? (
                <div onClick={handleEndTimeClick} style={displayTimeStyle}>
                  <span style={{ fontSize: '13px' }}>
                    {formData.endTime.toLocaleString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  <span>📅</span>
                </div>
              ) : (
                <div style={pickerContainerStyle}>
                  <input
                    ref={endTimeInputRef}
                    type="datetime-local"
                    value={formatDateTimeLocal(tempEndTime)}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue) {
                        const newDate = parseDateTimeLocal(inputValue);
                        if (!isNaN(newDate.getTime())) {
                          setTempEndTime(newDate);
                        }
                      }
                    }}
                    onBlur={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue) {
                        const newDate = parseDateTimeLocal(inputValue);
                        if (!isNaN(newDate.getTime())) {
                          setTempEndTime(newDate);
                        }
                      }
                    }}
                    style={{
                      ...inputStyle,
                      marginBottom: '10px',
                      cursor: 'pointer',
                    }}
                  />
                  
                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearEndTime();
                      }}
                      style={{
                        ...pickerActionButtonStyle,
                        backgroundColor: 'transparent',
                        color: 'var(--button-primary)',
                        border: `1px solid var(--button-primary)`,
                      }}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEndTimeToday();
                      }}
                      style={{
                        ...pickerActionButtonStyle,
                        backgroundColor: 'transparent',
                        color: 'var(--button-primary)',
                        border: `1px solid var(--button-primary)`,
                      }}
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        saveEndTime();
                      }}
                      style={{
                        ...pickerActionButtonStyle,
                        backgroundColor: 'var(--button-success)',
                        color: 'white',
                      }}
                    >
                      💾 Save
                    </button>
                  </div>
                  
                  {/* Cancel button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelEndTime();
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: 'var(--button-secondary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                    }}
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={inputStyle}
              placeholder="e.g., Google Meet, Room 101"
            />
          </div>

          <div style={{
            padding: '12px',
            backgroundColor: 'var(--info-bg)',
            color: 'var(--info-text)',
            border: `1px solid var(--info-border)`,
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '14px',
          }}>
            ℹ️ This will open Google Calendar where you can save the event
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--button-secondary)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--button-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}