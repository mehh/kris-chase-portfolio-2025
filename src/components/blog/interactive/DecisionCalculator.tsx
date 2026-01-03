'use client';

import { useState, useCallback } from 'react';
import { Calculator, CalculatorField, CalculatorResult } from './Calculator';
import { InteractiveChart, BarChartData } from './InteractiveChart';
import { cn } from '@/lib/utils';

export interface DecisionOption {
  id: string;
  label: string;
  score: number;
  reasoning: string;
  color?: string;
}

export interface DecisionCalculatorProps {
  title: string;
  description?: string;
  fields: CalculatorField[];
  calculate: (values: Record<string, number | string>) => {
    recommendation: string;
    confidence: number;
    options: DecisionOption[];
    reasoning: string;
  };
  className?: string;
}

export function DecisionCalculator({
  title,
  description,
  fields,
  calculate,
  className,
}: DecisionCalculatorProps) {
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    fields.forEach((field) => {
      initial[field.id] = field.defaultValue ?? (field.type === 'number' ? 0 : '');
    });
    return initial;
  });

  const result = calculate(values);

  // Convert options to chart data
  const chartData: BarChartData[] = result.options.map((option) => ({
    option: option.label,
    score: option.score,
  }));

  return (
    <div className={cn('w-full space-y-6', className)}>
      <Calculator
        title={title}
        description={description}
        fields={fields.map((field) => ({
          ...field,
          defaultValue: values[field.id] ?? field.defaultValue,
        }))}
        calculate={(vals) => {
          setValues(vals);
          const calcResult = calculate(vals);
          return [
            {
              label: 'Recommended Option',
              value: calcResult.recommendation,
              highlight: true,
            },
            {
              label: 'Confidence Level',
              value: `${calcResult.confidence}%`,
              formatValue: (val: number | string) => val.toString(),
            },
            ...calcResult.options.map((opt) => ({
              label: opt.label,
              value: `${opt.score}%`,
              formatValue: (val: number | string) => val.toString(),
            })),
          ];
        }}
        className="mb-6"
      />

      {/* Decision Visualization */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-2">
            Recommendation: {result.recommendation}
          </h4>
          <p className="text-sm text-muted-foreground mb-4">{result.reasoning}</p>
        </div>

        {/* Score Comparison Chart */}
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-foreground">Option Comparison</h5>
          <InteractiveChart
            type="bar"
            data={chartData}
            height={300}
            axisBottom={{ legend: 'Option' }}
            axisLeft={{ legend: 'Score' }}
            enableLegends={false}
          />
        </div>

        {/* Detailed Reasoning */}
        <div className="mt-6 pt-6 border-t border-border space-y-3">
          <h5 className="text-sm font-medium text-foreground">Option Analysis</h5>
          {result.options.map((option) => (
            <div
              key={option.id}
              className={cn(
                'p-3 rounded-lg border',
                option.id === result.recommendation.toLowerCase().replace(/\s+/g, '-')
                  ? 'bg-primary/10 border-primary/20'
                  : 'bg-muted/30 border-border'
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{option.label}</span>
                <span className="text-sm font-mono text-muted-foreground">{option.score}%</span>
              </div>
              <p className="text-xs text-muted-foreground">{option.reasoning}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

