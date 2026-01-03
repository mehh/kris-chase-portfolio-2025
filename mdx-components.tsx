/**
 * MDX Components mapping for Next.js
 * This file maps HTML elements to custom React components for MDX rendering
 */

import type { MDXComponents } from 'mdx/types';
import {
  InteractiveChart,
  InteractiveSlider,
  Calculator,
  ComparisonChart,
  DataTable,
  DecisionCalculator,
  AssessmentCalculator,
  CostComparisonCalculator,
  CostComparisonChart,
  TimelineComparison,
  ScoreVisualization,
  DebtReductionVisualization,
} from '@/components/blog/MDXComponents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Map standard HTML elements to custom components if needed
    ...components,
    // Export interactive components for use in MDX
    InteractiveChart,
    InteractiveSlider,
    Calculator,
    ComparisonChart,
    DataTable,
    DecisionCalculator,
    AssessmentCalculator,
    CostComparisonCalculator,
    CostComparisonChart,
    TimelineComparison,
    ScoreVisualization,
    DebtReductionVisualization,
  };
}

