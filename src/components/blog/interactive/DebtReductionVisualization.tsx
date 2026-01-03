'use client';

import { useState } from 'react';
import { InteractiveSlider } from './InteractiveSlider';
import { InteractiveChart } from './InteractiveChart';

export interface DebtReductionVisualizationProps {
  initialAllocation?: number;
  initialDebtScore?: number;
  className?: string;
}

export function DebtReductionVisualization({
  initialAllocation = 30,
  initialDebtScore = 65,
  className = '',
}: DebtReductionVisualizationProps) {
  const [allocation, setAllocation] = useState(initialAllocation);

  // Calculate debt reduction based on allocation percentage
  // Higher allocation = faster reduction
  const calculateDebtReduction = (allocationPercent: number, months: number) => {
    const reductionRate = allocationPercent / 100; // 0.3 for 30%
    const monthlyReduction = (initialDebtScore * reductionRate) / 12; // Monthly reduction based on allocation
    
    const data = [];
    let currentDebt = initialDebtScore;
    
    for (let i = 0; i <= months; i += 3) {
      if (i === 0) {
        data.push({ x: 'Month 1', y: Math.round(currentDebt) });
      } else {
        // Apply reduction over the period
        const reduction = monthlyReduction * 3;
        currentDebt = Math.max(0, currentDebt - reduction);
        data.push({ 
          x: `Month ${i}`, 
          y: Math.round(currentDebt) 
        });
      }
    }
    
    return data;
  };

  const chartData = [
    {
      id: 'Debt Reduction Timeline',
      data: calculateDebtReduction(allocation, 12),
    },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <InteractiveSlider
          label="Time Allocation for Debt Reduction (%)"
          min={0}
          max={100}
          step={5}
          value={allocation}
          onValueChange={(val) => setAllocation(Array.isArray(val) ? val[0] : val)}
          formatValue={(val) => String(val) + '%'}
        />
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          Based on your allocation, here's the estimated impact:
        </p>
        <InteractiveChart
          type="line"
          data={chartData}
          height={300}
          axisBottom={{ legend: 'Time' }}
          axisLeft={{ legend: 'Debt Score' }}
        />
      </div>
    </div>
  );
}

