// Navigation link type
export interface NavLink {
    id: number;
    title: string;
    path: string;
  }
  
  // Feature card type
  export interface FeatureCard {
    id: number;
    title: string;
    description: string;
    icon: string;
  }
  
  // Theme context type
  export interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  }
  
  // Animation settings type
  export interface AnimationSettings {
    type: 'fade-in' | 'slide-up' | 'scale-in' | 'pulse-subtle';
    delay?: number;
    duration?: number;
  }
  
  // Component with animation props
  export interface WithAnimationProps {
    animation?: AnimationSettings;
    children: React.ReactNode;
  }