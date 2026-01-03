'use client';

import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface InteractiveSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | number[];
  value?: number | number[];
  onChange?: (value: number | number[]) => void;
  onValueChange?: (value: number | number[]) => void;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
  disabled?: boolean;
}

export function InteractiveSlider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  value: controlledValue,
  onChange,
  onValueChange,
  label,
  showValue = true,
  formatValue = (val) => val.toString(),
  className,
  disabled = false,
}: InteractiveSliderProps) {
  const [internalValue, setInternalValue] = useState<number | number[]>(
    defaultValue ?? controlledValue ?? min
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue: number[]) => {
    const singleValue = newValue.length === 1 ? newValue[0] : newValue;
    
    if (!isControlled) {
      setInternalValue(singleValue);
    }
    
    if (onValueChange) {
      onValueChange(singleValue);
    }
    
    if (onChange) {
      onChange(singleValue);
    }
  };

  const displayValue = Array.isArray(currentValue) ? currentValue[0] : currentValue;
  const sliderValue = Array.isArray(currentValue) ? currentValue : [currentValue];

  return (
    <div className={cn('w-full space-y-3', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-sm font-medium text-foreground">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              {formatValue(displayValue)}
            </span>
          )}
        </div>
      )}
      <Slider.Root
        className="relative flex items-center w-full h-5 touch-none select-none"
        value={sliderValue}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      >
        <Slider.Track className="relative h-2 w-full grow rounded-full bg-muted">
          <Slider.Range className="absolute h-full rounded-full bg-primary" />
        </Slider.Track>
        <Slider.Thumb
          className="block h-5 w-5 rounded-full bg-primary border-2 border-background shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors"
          aria-label={label || 'Slider'}
        />
      </Slider.Root>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}

