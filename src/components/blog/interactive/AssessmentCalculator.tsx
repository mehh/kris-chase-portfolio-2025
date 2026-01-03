'use client';

import { useState, useCallback } from 'react';
import { Calculator, CalculatorField, CalculatorResult } from './Calculator';
import { InteractiveChart, BarChartData, PieChartData } from './InteractiveChart';
import { cn } from '@/lib/utils';

export interface AssessmentCategory {
  id: string;
  label: string;
  score: number;
  weight?: number;
  description?: string;
}

export interface AssessmentCalculatorProps {
  title: string;
  description?: string;
  fields: CalculatorField[];
  calculate: (values: Record<string, number | string>) => {
    overallScore: number;
    level: 'Low' | 'Medium' | 'High' | 'Critical';
    categories: AssessmentCategory[];
    recommendations: string[];
  };
  className?: string;
  showBreakdown?: boolean;
}

export function AssessmentCalculator({
  title,
  description,
  fields,
  calculate,
  className,
  showBreakdown = true,
}: AssessmentCalculatorProps) {
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    fields.forEach((field) => {
      initial[field.id] = field.defaultValue ?? (field.type === 'number' ? 0 : '');
    });
    return initial;
  });

  const result = calculate(values);

  // Convert categories to chart data
  const barChartData: BarChartData[] = result.categories.map((cat) => ({
    category: cat.label,
    score: cat.score,
  }));

  const pieChartData: PieChartData[] = result.categories.map((cat) => ({
    id: cat.id,
    label: cat.label,
    value: cat.score,
  }));

  // Determine level color
  const levelColors = {
    Low: 'text-green-600 dark:text-green-400',
    Medium: 'text-yellow-600 dark:text-yellow-400',
    High: 'text-orange-600 dark:text-orange-400',
    Critical: 'text-red-600 dark:text-red-400',
  };

  const levelBgColors = {
    Low: 'bg-green-500/10 border-green-500/20',
    Medium: 'bg-yellow-500/10 border-yellow-500/20',
    High: 'bg-orange-500/10 border-orange-500/20',
    Critical: 'bg-red-500/10 border-red-500/20',
  };

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
              label: 'Overall Score',
              value: calcResult.overallScore,
              formatValue: (val) => `${val}/100`,
              highlight: true,
            },
            {
              label: 'Level',
              value: calcResult.level,
              highlight: calcResult.level === 'Critical' || calcResult.level === 'High',
            },
          ];
        }}
        className="mb-6"
      />

      {/* Score Visualization */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-6">
        {/* Overall Score Display */}
        <div className={cn('p-6 rounded-lg border', levelBgColors[result.level])}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-foreground">Overall Assessment</h4>
            <span className={cn('text-2xl font-bold', levelColors[result.level])}>
              {result.overallScore}/100
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Level:</span>
            <span className={cn('text-sm font-semibold', levelColors[result.level])}>
              {result.level}
            </span>
          </div>
        </div>

        {/* Category Breakdown */}
        {showBreakdown && result.categories.length > 0 && (
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-foreground">Category Breakdown</h5>
            <InteractiveChart
              type="bar"
              data={barChartData}
              height={300}
              axisBottom={{ legend: 'Category' }}
              axisLeft={{ legend: 'Score' }}
              enableLegends={false}
            />

            {/* Category Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {result.categories.map((category) => (
                <div
                  key={category.id}
                  className="p-3 rounded-lg border border-border bg-muted/30"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{category.label}</span>
                    <span className="text-sm font-mono text-muted-foreground">
                      {category.score}/100
                    </span>
                  </div>
                  {category.description && (
                    <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {result.recommendations.length > 0 && (
          <div className="pt-6 border-t border-border space-y-3">
            <h5 className="text-sm font-medium text-foreground">Recommendations</h5>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-foreground/90">
                  <span className="text-primary mt-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

