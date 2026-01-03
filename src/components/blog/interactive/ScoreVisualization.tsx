'use client';

import { InteractiveChart, BarChartData } from './InteractiveChart';
import { cn } from '@/lib/utils';

export interface ScoreData {
  id: string;
  label: string;
  score: number;
  maxScore?: number;
  description?: string;
}

export interface ScoreVisualizationProps {
  title?: string;
  description?: string;
  scores: ScoreData[];
  showComparison?: boolean;
  targetScore?: number;
  className?: string;
}

export function ScoreVisualization({
  title,
  description,
  scores,
  showComparison = false,
  targetScore,
  className,
}: ScoreVisualizationProps) {
  // Prepare bar chart data
  const barData: BarChartData[] = scores.map((score) => ({
    category: score.label,
    score: score.score,
    max: score.maxScore || 100,
  }));

  // Calculate overall average
  const averageScore =
    scores.reduce((sum, score) => sum + score.score, 0) / scores.length;

  // Determine score level
  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10 border-green-500/20' };
    if (score >= 60) return { level: 'Good', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' };
    if (score >= 40) return { level: 'Fair', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' };
    return { level: 'Poor', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10 border-red-500/20' };
  };

  const overallLevel = getScoreLevel(averageScore);

  return (
    <div className={cn('w-full space-y-6', className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && <h3 className="text-2xl font-bold text-foreground">{title}</h3>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="rounded-lg border border-border bg-card p-6 space-y-6">
        {/* Overall Score Display */}
        <div className={cn('p-6 rounded-lg border', overallLevel.bg)}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-foreground">Overall Score</h4>
            <span className={cn('text-3xl font-bold', overallLevel.color)}>
              {averageScore.toFixed(1)}/100
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Level:</span>
            <span className={cn('text-sm font-semibold', overallLevel.color)}>
              {overallLevel.level}
            </span>
          </div>
          {targetScore && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Target Score:</span>
                <span className={cn('font-semibold', averageScore >= targetScore ? overallLevel.color : 'text-muted-foreground')}>
                  {targetScore}/100
                  {averageScore >= targetScore && ' ✓'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Score Breakdown Chart */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Score Breakdown</h4>
          <InteractiveChart
            type="bar"
            data={barData}
            height={400}
            axisBottom={{ legend: 'Category' }}
            axisLeft={{ legend: 'Score' }}
            enableLegends={false}
          />
        </div>

        {/* Score Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Detailed Scores</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scores.map((score) => {
              const level = getScoreLevel(score.score);
              return (
                <div
                  key={score.id}
                  className={cn('p-4 rounded-lg border', level.bg)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{score.label}</span>
                    <span className={cn('text-sm font-bold', level.color)}>
                      {score.score}/{score.maxScore || 100}
                    </span>
                  </div>
                  {score.description && (
                    <p className="text-xs text-muted-foreground mt-1">{score.description}</p>
                  )}
                  {/* Progress bar */}
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn('h-full transition-all', {
                        'bg-green-500': score.score >= 80,
                        'bg-yellow-500': score.score >= 60 && score.score < 80,
                        'bg-orange-500': score.score >= 40 && score.score < 60,
                        'bg-red-500': score.score < 40,
                      })}
                      style={{ width: `${(score.score / (score.maxScore || 100)) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison with Target */}
        {showComparison && targetScore && (
          <div className="pt-4 border-t border-border">
            <div className="p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Gap to Target</span>
                <span className={cn('text-lg font-bold', averageScore >= targetScore ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400')}>
                  {averageScore >= targetScore ? '+' : ''}{(averageScore - targetScore).toFixed(1)} points
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {averageScore >= targetScore
                  ? 'You are meeting or exceeding the target score.'
                  : `You need ${(targetScore - averageScore).toFixed(1)} more points to reach the target.`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

