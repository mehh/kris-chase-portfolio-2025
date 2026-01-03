'use client';

import { useState, useCallback, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface CalculatorField {
  id: string;
  label: string;
  type: 'number' | 'slider' | 'select';
  defaultValue?: number | string;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ value: string | number; label: string }>;
  formatValue?: (value: number | string) => string;
  helpText?: string;
}

export interface CalculatorResult {
  label: string;
  value: number | string;
  formatValue?: (value: number | string) => string;
  highlight?: boolean;
}

export interface CalculatorProps {
  title?: string;
  description?: string;
  fields: CalculatorField[];
  calculate: (values: Record<string, number | string>) => CalculatorResult[];
  className?: string;
  showReset?: boolean;
}

export function Calculator({
  title,
  description,
  fields,
  calculate,
  className,
  showReset = true,
}: CalculatorProps) {
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    fields.forEach((field) => {
      initial[field.id] = field.defaultValue ?? (field.type === 'number' ? 0 : '');
    });
    return initial;
  });

  const handleFieldChange = useCallback((id: string, value: number | string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleReset = useCallback(() => {
    const reset: Record<string, number | string> = {};
    fields.forEach((field) => {
      reset[field.id] = field.defaultValue ?? (field.type === 'number' ? 0 : '');
    });
    setValues(reset);
  }, [fields]);

  const results = calculate(values);

  return (
    <div className={cn('w-full space-y-6 p-6 rounded-xl border border-border bg-card', className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h3 className="text-2xl font-bold text-foreground">{title}</h3>
          )}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center justify-between">
              <span>{field.label}</span>
              {field.type === 'number' && typeof values[field.id] === 'number' && (
                <span className="text-xs text-muted-foreground font-mono">
                  {field.formatValue
                    ? field.formatValue(values[field.id])
                    : values[field.id].toString()}
                </span>
              )}
            </label>
            {field.helpText && (
              <p className="text-xs text-muted-foreground">{field.helpText}</p>
            )}
            {field.type === 'number' && (
              <input
                type="number"
                value={values[field.id] as number}
                onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value) || 0)}
                min={field.min}
                max={field.max}
                step={field.step}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
            {field.type === 'slider' && (
              <input
                type="range"
                value={values[field.id] as number}
                onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value))}
                min={field.min ?? 0}
                max={field.max ?? 100}
                step={field.step ?? 1}
                className="w-full"
              />
            )}
            {field.type === 'select' && field.options && (
              <select
                value={values[field.id] as string}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      {showReset && (
        <button
          onClick={handleReset}
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          Reset to defaults
        </button>
      )}

      {results.length > 0 && (
        <div className="pt-4 border-t border-border space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Results</h4>
          <div className="space-y-2">
            {results.map((result, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg',
                  result.highlight
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-muted/50'
                )}
              >
                <span className="text-sm font-medium text-foreground">{result.label}</span>
                <span
                  className={cn(
                    'text-sm font-mono',
                    result.highlight ? 'text-primary font-bold' : 'text-muted-foreground'
                  )}
                >
                  {result.formatValue
                    ? result.formatValue(result.value)
                    : result.value.toString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

