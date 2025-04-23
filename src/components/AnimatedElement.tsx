import React, { useEffect, useRef, useState } from "react";
import { WithAnimationProps } from "../types";

const AnimatedElement: React.FC<WithAnimationProps> = ({
    animation = {type: 'fade-in'},
    children
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    // Set animation class based on type
    const getAnimationClass = () => {
        switch(animation.type){
            case 'fade-in': return 'animate-fade-in';
            case 'slide-up': return 'animate-slide-up';
            case 'scale-in': return 'animate-scale-in';
            case 'pulse-subtle': return 'animate-pulse-subtle';
            default: return 'animate-fade-in';
        }
    };

    // Set animation delay if provided
    const getAnimationStyle = () => {
        if (animation.delay) {
            return {
                animationDelay: `${animation.delay}ms`,
                animationDuration: animation.duration ? `${animation.duration}ms` : undefined,
            };
        }
        return {};
    };

    // Setup intersection observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if(elementRef.current){
            observer.observe(elementRef.current);
        }

        return () => {
            if(elementRef.current){
                observer.unobserve(elementRef.current);
            }
        }
    }, []);

    return (
        <div
            ref={elementRef}
            className={`${isVisible ? getAnimationClass(): 'opacity-0'}`}
            style={isVisible ? getAnimationStyle(): {}}
            >
                {children}
            </div>
    );
};

export default AnimatedElement;