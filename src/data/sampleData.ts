import { Course, User } from '../types';

export const sampleCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development with HTML, CSS, and JavaScript',
    instructor: 'instructor-1',
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to HTML',
        description: 'Learn the basics of HTML structure and elements',
        completed: true,
        score: 92,
        status: 'completed',
        dueDate: '2023-11-01',
        notes: 'Completed all exercises, need to review semantic elements',
      },
      {
        id: 'module-2',
        title: 'CSS Styling',
        description: 'Learn how to style HTML elements with CSS',
        completed: true,
        score: 88,
        status: 'completed',
        dueDate: '2023-11-08',
        notes: 'Flexbox was challenging, practice more',
      },
      {
        id: 'module-3',
        title: 'JavaScript Basics',
        description: 'Introduction to JavaScript programming',
        completed: false,
        score: 0,
        status: 'in-progress',
        dueDate: '2023-11-15',
      },
      {
        id: 'module-4',
        title: 'Building Interactive Websites',
        description: 'Combine HTML, CSS, and JavaScript to create interactive websites',
        completed: false,
        status: 'not-started',
        dueDate: '2023-11-22',
      },
    ],
  },
  {
    id: 'course-2',
    title: 'React Masterclass',
    description: 'Advanced React concepts and patterns',
    instructor: 'instructor-2',
    modules: [
      {
        id: 'module-1',
        title: 'React Fundamentals',
        description: 'Core React concepts and component architecture',
        completed: true,
        score: 95,
        status: 'completed',
        dueDate: '2023-10-15',
      },
      {
        id: 'module-2',
        title: 'State Management',
        description: 'Managing state with hooks and context',
        completed: false,
        status: 'in-progress',
        dueDate: '2023-10-22',
        notes: 'Context API is powerful but tricky',
      },
      {
        id: 'module-3',
        title: 'Advanced Hooks',
        description: 'Deep dive into React hooks',
        completed: false,
        status: 'not-started',
        dueDate: '2023-10-29',
      },
    ],
  },
];

export const sampleUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    enrolledCourses: ['course-1', 'course-2'],
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'student',
    enrolledCourses: ['course-1'],
  },
  {
    id: 'instructor-1',
    name: 'Dr. Alex Johnson',
    email: 'alex@example.com',
    role: 'instructor',
    enrolledCourses: ['course-1'],
  },
  {
    id: 'instructor-2',
    name: 'Prof. Sarah Williams',
    email: 'sarah@example.com',
    role: 'instructor',
    enrolledCourses: ['course-2'],
  },
];

export const currentUser = sampleUsers[0];