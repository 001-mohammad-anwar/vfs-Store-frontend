import React, { useEffect } from 'react';
import { IoClose, IoWarningOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const ErrorOne = ({ 
  message = "Something went wrong", 
  onClose, 
  duration = 5000,
  position = 'top-right',
  type = 'error'
}) => {
  // Auto-close after duration if onClose is provided
  useEffect(() => {
    if (onClose && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  // Color schemes based on type
  const colorSchemes = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      icon: 'text-red-500'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      icon: 'text-yellow-500'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      icon: 'text-blue-500'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: 'text-green-500'
    }
  };

  const colors = colorSchemes[type] || colorSchemes.error;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`fixed ${positionClasses[position]} z-50 shadow-lg rounded-lg border ${colors.border} ${colors.bg} max-w-xs w-full sm:max-w-sm`}
      >
        <div className="p-4 flex items-start">
          <div className={`flex-shrink-0 pt-0.5 ${colors.icon}`}>
            <IoWarningOutline className="w-5 h-5" />
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-medium ${colors.text}`}>
              {message}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className={`ml-4 flex-shrink-0 rounded-md inline-flex ${colors.text} hover:${colors.bg} focus:outline-none`}
            >
              <span className="sr-only">Close</span>
              <IoClose className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Progress bar for auto-close */}
        {duration && onClose && (
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
            className={`h-1 ${colors.icon} rounded-b-lg`}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorOne;