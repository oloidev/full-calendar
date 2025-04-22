# Calendar Application

Give it a star if you like this project! ⭐

A feature-rich calendar application built with React, TypeScript, and ShadCN UI components. This project provides a
customizable and interactive calendar experience with multiple views, event management, and a modern UI.

# Ckeck out this blog post on Medium:

https://medium.com/@yaceeer/building-a-full-featured-calendar-application-with-react-e249b3084b23

## Demo

![Screenshot 2025-04-02 at 21.54.59.png](screenshots/Screenshot%202025-04-02%20at%2021.54.59.png)
![Screenshot 2025-04-02 at 21.53.21.png](screenshots/Screenshot%202025-04-02%20at%2021.53.21.png)
![Screenshot 2025-04-02 at 21.54.32.png](screenshots/Screenshot%202025-04-02%20at%2021.54.32.png)
![Screenshot 2025-04-02 at 21.53.38.png](screenshots/Screenshot%202025-04-02%20at%2021.53.38.png)

## Features

### 1. Year View

- **Description**: Displays a full year with mini-calendars for each month.
- **Implementation**:
    - Component: `CalendarYearView`
    - Uses `date-fns` for date calculations and `framer-motion` for animations.
    - Each month shows days with event indicators (dots); clicking a day with events opens a dialog with event details.
    - Days without events are non-clickable.

### 2. Agenda List

- **Description**: Toggleable agenda mode to display events in a list format.
- **Implementation**:
    - Integrated in `CalendarHeader` with a toggle button (`<LayoutList />` or `<CalendarRange />`).
    - Context: `useCalendar` provides `isAgendaMode` and `toggleAgendaMode`.
    - When enabled, it modifies the week/day view to show events as a list (implementation pending in week/day views).

### 3. 24/12 Hour Time Format

- **Description**: Switch between 24-hour and 12-hour (AM/PM) time display.
- **Implementation**:
    - Context: `useCalendar` provides `use24HourFormat` and `toggleTimeFormat`.
    - Components:
        - `CalendarHeader`: Toggle button (`12` or `24` with `<Clock />`).
        - `CalendarWeekView`: Hours column uses `format(..., use24HourFormat ? "HH:00" : "h a")`.
        - `CalendarDayView`: Hours column and "Happening now" section use `use24HourFormat ? "HH:mm" : "hh:mm a"`.
    - Fully responsive to user preference across all views.

### 4. Drag and Drop (DnD)

- **Description**: Drag events to reschedule them within the week/day views.
- **Implementation**:
    - Component: `DroppableArea` wraps time slots in `CalendarWeekView` and `CalendarDayView`.
    - Uses a DnD library (assumed to be `@dnd-kit/core` or similar) for drag functionality.
    - Time slots (every 30 minutes) accept drops and trigger `AddEditEventDialog` for new events.

### 5. Dark Mode

- **Description**: Toggle between light and dark themes.
- **Implementation**:
    - Component: `ModeToggle` (ShadCN component) in `CalendarHeader`.
    - Uses Tailwind CSS dark mode classes (`dark:` prefix) throughout components.
    - Fully compatible with all ShadCN components and custom styles.

### 6. Fully ShadCN Component-Based

- **Description**: UI built entirely with ShadCN components for consistency and ease of styling.
- **Implementation**:
    - Components used: `Button`, `Toggle`, `Dialog`, `ScrollArea`, `DayPicker`, `Select`, `Input`, `Textarea`, etc.
    - Custom components (e.g., `EventBullet`, `CalendarTimeline`) styled with Tailwind CSS to match ShadCN aesthetics.

### 7. Filter by Colors

- **Description**: Filter events by their assigned colors.
- **Implementation**:
    - Component: `FilterEvents` in `CalendarHeader`.
    - Uses `useCalendar` context (`selectedColors`, `filterEventsBySelectedColors`).
    - Dropdown menu with color options; clicking a color toggles its inclusion without closing the menu (`onSelect` with
      `e.preventDefault()`).

### 8. Show Details

- **Description**: View detailed event information in a dialog.
- **Implementation**:
    - Component: `EventListDialog`.
    - Triggered from `CalendarYearView` (days with events), shows event title, time, and color-coded bullet.
    - Supports "dot" and "colored" variants for event representation.

### 9. Create/Update/Delete Events

- **Description**: Full CRUD operations for events.
- **Implementation**:
    - Component: `AddEditEventDialog`.
        - **Create**: Opens with empty form; submits to `addEvent` from `useCalendar`.
        - **Update**: Opens with pre-filled event data; submits to `editEvent`.
        - **Delete**: (Assumed to be implemented elsewhere, e.g., within the dialog or event list; requires
          `deleteEvent` in context).
    - Form validation with `zod` via `eventSchema.ts`.
    - Integrated in week/day views via `DroppableArea` and in header via "Add Event" button.

### 10. Responsive Design

- **Description**: Fully responsive layout for all views.
- **Implementation**:
    - Uses Tailwind CSS for responsive design.
    - Media queries and utility classes ensure proper display on various screen sizes.
    - Components adapt to different viewports (e.g., `CalendarYearView` stacks months on smaller screens).

### 11. Animations

- **Description**: Smooth transitions and animations for UI interactions.
- **Implementation**:
    - Uses `framer-motion` for animations.
    - Components like `CalendarYearView`, `CalendarWeekView`, and `AddEditEventDialog` utilize motion variants for
      entrance/exit animations.
    - Animations enhance user experience without overwhelming the interface.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yassir-jeraidi/full-calendar
   cd calendar-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm run dev
   ```

## Usage

- **Switch Views**: Use the header buttons (Day, Week, Month, Year) to change views.
- **Toggle Time Format**: Click the "12/24" button in the header.
- **Filter Events**: Use the filter dropdown to show/hide events by color.
- **Add Event**: Click "Add Event" in the header or a time slot in week/day views.
- **Edit Event**: Click an existing event to open the edit dialog.
- **View Details**: In year view, click a day with events to see details.
- **Dark Mode**: Toggle via the mode switch in the header.


## Dependencies

- **React**: Core library
- **TypeScript**: Type safety
- **ShadCN UI**: UI components
- **date-fns**: Date manipulation
- **framer-motion**: Animations
- **zod**: Schema validation
- **react-hook-form**: Form handling

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/new-feature`).
3. Commit changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.
