# EduTrack - Progress Tracking System

EduTrack is a responsive web application designed to help students and instructors track educational progress across multiple courses. It provides intuitive tools for monitoring module completion, performance metrics, upcoming deadlines, and more.

## Features

### For Students
- **Progress Tracking**: Monitor completion percentage and module status at a glance
- **Module Checklist**: Mark modules as completed and add personal notes
- **Performance Metrics**: View average scores and performance trends
- **Reminder System**: Get alerts about upcoming deadlines
- **Export Options**: Export progress reports in various formats

### For Instructors
- **Student Dashboard**: Monitor progress of all enrolled students
- **Performance Overview**: View aggregated performance data
- **Detailed Student Analysis**: Drill down into individual student progress

### Responsive Design
- **Multi-device Support**: Optimized for phones, tablets, and desktops
- **Adaptive Layout**: Interface elements reorganize for optimal viewing experience
- **Touch-friendly**: Designed for both mouse and touch interaction

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript for robust code
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Modern frontend build tool
- **Lucide Icons**: Simple, clean SVG icons

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or later)
- npm (v8.0.0 or later)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/edutrack.git
cd edutrack
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Project Structure

```
src/
├── components/           # React components
│   ├── CourseSelector/   # Course selection component
│   ├── ExportOptions/    # Export functionality
│   ├── ModuleChecklist/  # Module listing and status tracking
│   ├── PerformanceMetrics/ # Performance visualization
│   ├── ProgressIndicator/  # Progress bar and stats
│   ├── ProgressTracker/    # Main container component
│   └── ReminderSystem/     # Deadline reminders
├── data/                 # Sample data for demonstration
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
    ├── progressUtils.ts  # Progress calculation helpers
    └── responsiveUtils.ts # Responsive design utilities
```

## Usage

### Tracking Progress

1. Select a course from the dropdown
2. Check off completed modules
3. Add notes to modules as needed
4. View your progress statistics

### Filtering and Sorting Modules

1. Click on "Show Filters" to display filtering options
2. Search for modules by name
3. Filter by completion status
4. Sort by title, due date, or status

### Managing Reminders

1. Navigate to the Reminders panel
2. Click "Settings" to configure reminder preferences
3. Set the number of days for advance notices
4. Enable/disable email or browser notifications

### Exporting Reports

1. Go to the Export panel
2. Choose your preferred export format (JSON, PDF)
3. Download the generated report

## Responsive Features

EduTrack is designed to work seamlessly across different screen sizes:

- **Mobile (< 640px)**: Single column layout, optimized touch targets
- **Tablet (640px - 1024px)**: Two-column layout for improved readability
- **Desktop (> 1024px)**: Full three-column layout for maximum information density

### Adding New Features

The modular component structure makes it easy to extend EduTrack with new features:

1. Create a new component in the appropriate directory
2. Define necessary types in `types/index.ts`
3. Add utility functions if needed
4. Integrate the component in `ProgressTracker.tsx`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
