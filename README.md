# React Dashboard with Dark Mode & Animations

A modern, feature-rich web application template showcasing a beautiful dashboard interface with dark mode support, smooth animations, and responsive design. Built with React, TypeScript, and Tailwind CSS.

![React Dashboard](https://img.freepik.com/premium-vector/pixel-art-starry-sky-sunset-moon-with-clouds-stars-vector-illustrations-eps-10_148553-769.jpg?semt=ais_hybrid&w=740)

## ✨ Features

- **🌓 Dark Mode** - Seamless switching between light and dark themes with smooth transitions and persistence
- **🎭 Smooth Animations** - Beautiful scroll-triggered animations that enhance user experience
- **📱 Responsive Design** - Fully responsive on all devices from mobile to desktop
- **🔒 Authentication Flow** - Complete login, registration, and protected routes
- **🧩 Modular Components** - Well-structured and reusable components for rapid development 
- **📊 Data Tables** - Interactive tables with sorting, filtering, and pagination
- **📝 Form Components** - Various form layouts with validation and interactive elements
- **🔔 Notification System** - Toast notifications and modal dialogs
- **📦 Dashboard Layout** - Professional dashboard with sidebar, header, and content areas
- **🔍 Global Search** - Search functionality that works across dashboard components
- **📊 Statistics Cards** - Display key metrics and data visualizations
- **🎨 Theming** - Consistent design system using Tailwind CSS variables
- **🛠️ TypeScript** - Type-safe code for better development experience and fewer bugs

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-dashboard.git
   cd react-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 📂 Project Structure

```
react-dashboard/
├── public/                  # Static files
├── src/                     # Source files
│   ├── components/          # Reusable components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── forms/           # Form-related components
│   │   └── AnimatedElement.tsx # Animation wrapper component
│   ├── contexts/            # React context providers
│   │   ├── AuthContext.tsx  # Authentication context
│   │   ├── SearchContext.tsx # Global search context
│   │   └── ThemeContext.tsx # Dark mode theme context
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx    # Main dashboard page
│   │   ├── Forms.tsx        # Forms showcase page
│   │   ├── LandingPage.tsx  # Marketing landing page
│   │   ├── Login.tsx        # User login page
│   │   ├── Notifications.tsx # Notifications showcase page
│   │   └── Tables.tsx       # Data tables showcase page
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main App component
│   ├── Router.tsx           # Application routing
│   └── index.tsx            # Application entry point
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies and scripts
```

## 🔑 Key Components

### Theme System

The application features a comprehensive dark mode implementation using React Context API:

```typescript
// Use the theme context anywhere in your components
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <button onClick={toggleDarkMode}>
      Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
    </button>
  );
};
```

### Animated Elements

Wrap any component with the `AnimatedElement` to add scroll-triggered animations:

```typescript
import AnimatedElement from './components/AnimatedElement';

// In your component:
<AnimatedElement animation={{ type: 'fade-in', delay: 200 }}>
  <div>Content that will animate when visible</div>
</AnimatedElement>
```

Available animation types:
- `fade-in`: Fade in from invisible to visible
- `slide-up`: Slide up from below
- `scale-in`: Scale in from smaller to full size
- `pulse-subtle`: Subtle pulsing animation

### Dashboard Layout

The dashboard features a responsive layout with collapsible sidebar, searchable header, and content area:

```typescript
// Dashboard layout with sidebar, header and content area
<DashboardLayout>
  {/* Your page content */}
</DashboardLayout>
```

### Forms and Validation

Various form components with validation:

```typescript
// Basic form usage
<BasicContactForm onSubmit={handleFormSubmit} />

// Advanced form with validation
<AdvancedForm onSubmit={handleAdvancedSubmit} />
```

## 🎨 Customization

### Tailwind Theme

You can customize colors, animations, and other theme variables in the `tailwind.config.js` file:

```js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#121212', // Main dark background color
          surface: '#1e1e1e',    // Dark card/surface background
          primary: '#bb86fc',    // Primary accent color in dark mode
          secondary: '#03dac6',  // Secondary accent color in dark mode
          // ... add more custom colors
        },
      },
      // Customize animations, fonts, etc.
    },
  },
  // ...
}
```

### Adding New Pages

1. Create a new page component in the `src/pages` directory
2. Import and use the `AnimatedElement` component for animations
3. Add your new route in `src/Router.tsx`

Example:
```typescript
// src/pages/NewPage.tsx
import React from 'react';
import AnimatedElement from '../components/AnimatedElement';

const NewPage: React.FC = () => {
  return (
    <div>
      <AnimatedElement animation={{ type: 'fade-in' }}>
        <h1>New Page</h1>
      </AnimatedElement>
    </div>
  );
};

export default NewPage;

// Then in Router.tsx, add:
<Route path="/dashboard/new-page" element={<NewPage />} />
```

## 🧪 Testing

Run tests with:

```bash
npm test
# or
yarn test
```

## 📦 Build for Production

Create an optimized production build:

```bash
npm run build
# or
yarn build
```

The build files will be in the `build` directory, ready to be deployed.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

Made with ❤️ by [Mehdi Radfar](https://github.com/funlifew)