'use client';

import { InteractiveChart, BarChartData, LineChartData } from './InteractiveChart';
import { cn } from '@/lib/utils';

export interface CostComparisonData {
  option: string;
  upfront: number;
  monthly: number;
  annual: number;
  total3Months?: number;
  total6Months?: number;
  total12Months?: number;
}

export interface CostComparisonChartProps {
  title?: string;
  description?: string;
  data: CostComparisonData[];
  timeframe?: '3months' | '6months' | '12months' | 'all';
  showBreakdown?: boolean;
  className?: string;
}

export function CostComparisonChart({
  title,
  description,
  data,
  timeframe = '12months',
  showBreakdown = true,
  className,
}: CostComparisonChartProps) {
  // Prepare bar chart data based on timeframe
  const getBarChartData = (): BarChartData[] => {
    if (timeframe === 'all') {
      return data.map((item) => ({
        option: item.option,
        upfront: item.upfront,
        '3 months': item.total3Months || item.upfront + item.monthly * 3,
        '6 months': item.total6Months || item.upfront + item.monthly * 6,
        '12 months': item.total12Months || item.upfront + item.monthly * 12,
      }));
    }

    const timeframeMap = {
      '3months': 'total3Months',
      '6months': 'total6Months',
      '12months': 'total12Months',
    } as const;

    const key = timeframeMap[timeframe];
    return data.map((item) => ({
      option: item.option,
      cost: item[key] || item.upfront + item.monthly * (timeframe === '3months' ? 3 : timeframe === '6months' ? 6 : 12),
    }));
  };

  // Prepare line chart data for cost over time
  const getLineChartData = (): LineChartData[] => {
    return data.map((item) => ({
      id: item.option,
      data: Array.from({ length: 12 }, (_, i) => ({
        x: `M${i + 1}`,
        y: item.upfront + item.monthly * (i + 1),
      })),
    }));
  };

  const barData = getBarChartData();
  const lineData = getLineChartData();

  return (
    <div className={cn('w-full space-y-6', className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && <h3 className="text-2xl font-bold text-foreground">{title}</h3>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="rounded-lg border border-border bg-card p-6 space-y-6">
        {/* Cost Over Time Line Chart */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Cost Over Time</h4>
          <InteractiveChart
            type="line"
            data={lineData}
            height={400}
            axisBottom={{ legend: 'Month' }}
            axisLeft={{ legend: 'Total Cost ($)' }}
          />
        </div>

        {/* Comparison Bar Chart */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            {timeframe === 'all' ? 'Cost Comparison (All Timeframes)' : 'Cost Comparison'}
          </h4>
          <InteractiveChart
            type="bar"
            data={barData}
            height={400}
            axisBottom={{ legend: 'Option' }}
            axisLeft={{ legend: 'Cost ($)' }}
          />
        </div>

        {/* Breakdown Table */}
        {showBreakdown && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Detailed Breakdown</h4>
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
                      Annual
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        {item.option}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-foreground">
                        ${item.upfront.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-foreground">
                        ${item.monthly.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-foreground">
                        ${item.annual.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

