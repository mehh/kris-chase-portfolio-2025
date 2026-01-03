'use client';

import { useState } from 'react';
import { InteractiveChart, ChartType, LineChartData, BarChartData } from './InteractiveChart';
import { cn } from '@/lib/utils';

export interface ComparisonOption {
  id: string;
  label: string;
  data: LineChartData[] | BarChartData[];
}

export interface ComparisonChartProps {
  title?: string;
  description?: string;
  options: ComparisonOption[];
  defaultSelected?: string;
  chartType: ChartType;
  height?: number;
  className?: string;
}

export function ComparisonChart({
  title,
  description,
  options,
  defaultSelected,
  chartType,
  height = 400,
  className,
}: ComparisonChartProps) {
  const [selectedId, setSelectedId] = useState<string>(
    defaultSelected || options[0]?.id || ''
  );

  const selectedOption = options.find((opt) => opt.id === selectedId) || options[0];

  if (!selectedOption) {
    return null;
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && <h3 className="text-2xl font-bold text-foreground">{title}</h3>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      {options.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedId(option.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedId === option.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      <div className="rounded-lg border border-border bg-card p-4">
        <InteractiveChart
          type={chartType}
          data={selectedOption.data}
          height={height}
        />
      </div>
    </div>
  );
}

