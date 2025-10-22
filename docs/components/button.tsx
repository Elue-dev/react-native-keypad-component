import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className = '',
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer';

    const variantStyles = {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95',
      outline:
        'border border-border text-foreground hover:bg-muted active:scale-95',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (asChild) {
      return React.cloneElement(props.children as React.ReactElement, {
        // @ts-ignore
        className: combinedClassName,
        ref,
      });
    }

    return <button ref={ref} className={combinedClassName} {...props} />;
  }
);

Button.displayName = 'Button';
