"use client";

import { motion } from "framer-motion";
import { forwardRef, type ComponentPropsWithRef } from "react";

// Rotate animation - rotates element 90 degrees over 2 seconds
export const withRotate = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof motion.div>>(
  (props, ref) => {
    return (
      <motion.div
        ref={ref}
        {...props}
        animate={{ rotate: 90 }}
        transition={{ duration: 2 }}
      />
    );
  }
);
withRotate.displayName = "withRotate";

// Hover animation - scales element to 1.05 on hover
export const withHover = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof motion.div>>(
  (props, ref) => {
    return (
      <motion.div
        ref={ref}
        {...props}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
    );
  }
);
withHover.displayName = "withHover";

// Image hover animation - slight zoom effect for images
export const AnimatedImageContainer = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof motion.div>>(
  (props, ref) => {
    return (
      <motion.div
        ref={ref}
        {...props}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    );
  }
);
AnimatedImageContainer.displayName = "AnimatedImageContainer";

// Fade in animation for page loads
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Stagger children animation
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Parallax effect for hero images
export const parallaxVariants = {
  initial: { scale: 1.1 },
  animate: {
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

// Slide in from left
export const slideInLeftVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Slide in from right
export const slideInRightVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
