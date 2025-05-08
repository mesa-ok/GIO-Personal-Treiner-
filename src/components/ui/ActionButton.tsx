
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const ActionButton = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props
}: ActionButtonProps) => {
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg',
  };
  
  const variantClasses = {
    default: 'bg-gio-orange hover:bg-gio-orange-light text-white',
    outline: 'bg-transparent border border-gio-orange text-gio-orange hover:bg-gio-orange/10',
    ghost: 'bg-transparent hover:bg-gio-gray text-white',
  };
  
  return (
    <Button 
      className={cn(
        'font-medium rounded-md transition-all duration-200 focus:ring-2 focus:ring-gio-orange/50',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
