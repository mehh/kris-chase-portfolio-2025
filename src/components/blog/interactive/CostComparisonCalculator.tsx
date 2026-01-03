'use client';

import { useState, useCallback, useMemo } from 'react';
import { InteractiveChart, LineChartData } from './InteractiveChart';
import { InteractiveSlider } from './InteractiveSlider';
import { cn } from '@/lib/utils';

export interface CostOption {
  id: string;
  label: string;
  upfrontCost: number;
  monthlyCost: number;
  annualCost: number;
  description?: string;
}

export interface CostComparisonCalculatorProps {
  title: string;
  description?: string;
  options: CostOption[];
  timeframe?: number; // months
  showTimeframeSlider?: boolean;
  className?: string;
}

export function CostComparisonCalculator({
  title,
  description,
  options,
  timeframe: initialTimeframe = 12,
  showTimeframeSlider = true,
  className,
}: CostComparisonCalculatorProps) {
  const [timeframe, setTimeframe] = useState(initialTimeframe);

  // Calculate total costs for each option
  const costData = useMemo(() => {
    return options.map((option) => {
      const totalCost = option.upfrontCost + option.monthlyCost * timeframe;
      const annualizedCost = option.upfrontCost + option.monthlyCost * 12;
      return {
        ...option,
        totalCost,
        annualizedCost,
      };
    });
  }, [options, timeframe]);

  // Generate line chart data showing costs over time
  const lineChartData: LineChartData[] = options.map((option) => ({
    id: option.label,
    data: Array.from({ length: Math.min(timeframe, 24) }, (_, i) => ({
      x: `Month ${i + 1}`,
      y: option.upfrontCost + option.monthlyCost * (i + 1),
    })),
  }));

  // Find the cheapest option
  const cheapestOption = costData.reduce((min, option) =>
    option.totalCost < min.totalCost ? option : min
  );

  return (
    <div className={cn('w-full space-y-6', className)}>
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>

        {/* Timeframe Slider */}
        {showTimeframeSlider && (
          <div className="py-4">
            <InteractiveSlider
              label="Timeframe (months)"
              min={1}
              max={36}
              step={1}
              value={timeframe}
              onValueChange={(val) => setTimeframe(Array.isArray(val) ? val[0] : val)}
              formatValue={(val) => `${val} month${val !== 1 ? 's' : ''}`}
            />
          </div>
        )}

        {/* Cost Comparison Chart */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Cost Over Time</h4>
          <InteractiveChart
            type="line"
            data={lineChartData}
            height={400}
            axisBottom={{ legend: 'Time' }}
            axisLeft={{ legend: 'Total Cost ($)' }}
          />
        </div>

        {/* Cost Summary Table */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Cost Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Option
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                    Upfront
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                    Monthly
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                    Total ({timeframe}mo)
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                    Annual
                  </th>
                </tr>
              </thead>
              <tbody>
                {costData.map((option) => (
                  <tr
                    key={option.id}
                    className={cn(
                      'border-b border-border hover:bg-muted/30 transition-colors',
                      option.id === cheapestOption.id && 'bg-primary/5'
                    )}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-sm font-medium text-foreground">{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-foreground">
                      ${option.upfrontCost.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-foreground">
                      ${option.monthlyCost.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                      ${option.totalCost.toLocaleString()}
                      {option.id === cheapestOption.id && (
                        <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                          (Best)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-foreground">
                      ${option.annualizedCost.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Savings Calculation */}
        {costData.length > 1 && (
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {costData
                .filter((option) => option.id !== cheapestOption.id)
                .map((option) => {
                  const savings = option.totalCost - cheapestOption.totalCost;
                  const savingsPercent = ((savings / option.totalCost) * 100).toFixed(1);
                  return (
                    <div
                      key={option.id}
                      className="p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="text-sm text-muted-foreground mb-1">
                        Savings vs. {option.label}
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${savings.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        ({savingsPercent}% less expensive)
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

