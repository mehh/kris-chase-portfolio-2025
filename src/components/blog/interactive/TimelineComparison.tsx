'use client';

import { InteractiveChart, BarChartData } from './InteractiveChart';
import { cn } from '@/lib/utils';

export interface TimelineOption {
  id: string;
  label: string;
  timeline: number; // in months
  phases?: Array<{ name: string; duration: number }>;
  description?: string;
}

export interface TimelineComparisonProps {
  title?: string;
  description?: string;
  options: TimelineOption[];
  showPhases?: boolean;
  className?: string;
}

export function TimelineComparison({
  title,
  description,
  options,
  showPhases = false,
  className,
}: TimelineComparisonProps) {
  // Prepare bar chart data
  const barData: BarChartData[] = options.map((option) => ({
    option: option.label,
    months: option.timeline,
  }));

  // Find fastest option
  const fastestOption = options.reduce((min, option) =>
    option.timeline < min.timeline ? option : min
  );

  return (
    <div className={cn('w-full space-y-6', className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && <h3 className="text-2xl font-bold text-foreground">{title}</h3>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="rounded-lg border border-border bg-card p-6 space-y-6">
        {/* Timeline Comparison Chart */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Timeline Comparison</h4>
          <InteractiveChart
            type="bar"
            data={barData}
            height={300}
            axisBottom={{ legend: 'Option' }}
            axisLeft={{ legend: 'Time (months)' }}
            enableLegends={false}
          />
        </div>

        {/* Timeline Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Timeline Details</h4>
          <div className="space-y-4">
            {options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  'p-4 rounded-lg border',
                  option.id === fastestOption.id
                    ? 'bg-primary/10 border-primary/20'
                    : 'bg-muted/30 border-border'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-semibold text-foreground">{option.label}</h5>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-muted-foreground">
                      {option.timeline} month{option.timeline !== 1 ? 's' : ''}
                    </span>
                    {option.id === fastestOption.id && (
                      <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-600 dark:text-green-400">
                        Fastest
                      </span>
                    )}
                  </div>
                </div>
                {option.description && (
                  <p className="text-xs text-muted-foreground mb-3">{option.description}</p>
                )}
                {showPhases && option.phases && option.phases.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-xs font-medium text-muted-foreground mb-2">Phases:</div>
                    <div className="space-y-1">
                      {option.phases.map((phase, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="text-foreground/90">{phase.name}</span>
                          <span className="text-muted-foreground">
                            {phase.duration} month{phase.duration !== 1 ? 's' : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time Savings */}
        {options.length > 1 && (
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options
                .filter((option) => option.id !== fastestOption.id)
                .map((option) => {
                  const savings = option.timeline - fastestOption.timeline;
                  const savingsPercent = ((savings / option.timeline) * 100).toFixed(1);
                  return (
                    <div
                      key={option.id}
                      className="p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="text-sm text-muted-foreground mb-1">
                        Time saved vs. {option.label}
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {savings} month{savings !== 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        ({savingsPercent}% faster)
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

