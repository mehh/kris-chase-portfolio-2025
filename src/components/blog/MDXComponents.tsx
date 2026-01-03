/**
 * MDX Components - Export all interactive components for use in MDX blog posts
 * 
 * Usage in MDX:
 * ```mdx
 * import { InteractiveChart, InteractiveSlider } from '@/components/blog/MDXComponents';
 * ```
 */

export { InteractiveChart } from './interactive/InteractiveChart';
export type { InteractiveChartProps, ChartType, LineChartData, BarChartData, PieChartData } from './interactive/InteractiveChart';

export { InteractiveSlider } from './interactive/InteractiveSlider';
export type { InteractiveSliderProps } from './interactive/InteractiveSlider';

export { Calculator } from './interactive/Calculator';
export type { CalculatorProps, CalculatorField, CalculatorResult } from './interactive/Calculator';

export { ComparisonChart } from './interactive/ComparisonChart';
export type { ComparisonChartProps, ComparisonOption } from './interactive/ComparisonChart';

export { DataTable } from './interactive/DataTable';
export type { DataTableProps, DataTableColumn } from './interactive/DataTable';

export { DecisionCalculator } from './interactive/DecisionCalculator';
export type { DecisionCalculatorProps, DecisionOption } from './interactive/DecisionCalculator';

export { AssessmentCalculator } from './interactive/AssessmentCalculator';
export type { AssessmentCalculatorProps, AssessmentCategory } from './interactive/AssessmentCalculator';

export { CostComparisonCalculator } from './interactive/CostComparisonCalculator';
export type { CostComparisonCalculatorProps, CostOption } from './interactive/CostComparisonCalculator';

export { CostComparisonChart } from './interactive/CostComparisonChart';
export type { CostComparisonChartProps, CostComparisonData } from './interactive/CostComparisonChart';

export { TimelineComparison } from './interactive/TimelineComparison';
export type { TimelineComparisonProps, TimelineOption } from './interactive/TimelineComparison';

export { ScoreVisualization } from './interactive/ScoreVisualization';
export type { ScoreVisualizationProps, ScoreData } from './interactive/ScoreVisualization';

export { DebtReductionVisualization } from './interactive/DebtReductionVisualization';
export type { DebtReductionVisualizationProps } from './interactive/DebtReductionVisualization';

