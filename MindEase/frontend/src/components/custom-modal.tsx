import { useEffect } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function CustomModal({ isOpen, onClose, children, className = '' }: CustomModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[9998] transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(32, 55, 141, 0.8) 0%, rgba(26, 60, 138, 0.7) 50%, rgba(30, 63, 145, 0.6) 100%)',
          backdropFilter: 'blur(8px)'
        }}
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div 
          className={`relative w-full max-w-md border-0 shadow-2xl rounded-3xl backdrop-blur-xl transform transition-all duration-300 ${className}`}
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            borderColor: 'rgba(133, 130, 157, 0.3)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 80px rgba(30, 63, 145, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}