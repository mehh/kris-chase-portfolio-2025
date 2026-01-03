'use client';

import { useMemo, useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveRadar } from '@nivo/radar';

export type ChartType = 'line' | 'bar' | 'pie' | 'radar';

export interface ChartDataPoint {
  id: string | number;
  value: number;
  [key: string]: string | number;
}

export interface LineChartData {
  id: string;
  data: Array<{ x: string | number; y: number }>;
  color?: string;
}

export interface BarChartData {
  [key: string]: string | number;
}

export interface PieChartData {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface RadarChartData {
  [key: string]: string | number;
}

export interface InteractiveChartProps {
  type: ChartType;
  data: LineChartData[] | BarChartData[] | PieChartData[] | RadarChartData[];
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  xKey?: string;
  yKey?: string;
  colors?: string[];
  animate?: boolean;
  enableGridX?: boolean;
  enableGridY?: boolean;
  enableLegends?: boolean;
  axisBottom?: {
    legend?: string;
    legendOffset?: number;
  };
  axisLeft?: {
    legend?: string;
    legendOffset?: number;
  };
  className?: string;
}

// Responsive margins - adjust based on screen size
const getDefaultMargin = (isMobile: boolean) => ({
  top: 20,
  right: isMobile ? 10 : 80, // More space for legend on desktop
  bottom: isMobile ? 80 : 60, // More space for rotated labels
  left: isMobile ? 50 : 70, // More space for Y-axis labels
});

export function InteractiveChart({
  type,
  data,
  height = 400,
  margin,
  colors,
  animate = true,
  enableGridX = true,
  enableGridY = true,
  enableLegends = true,
  axisBottom,
  axisLeft,
  className = '',
}: InteractiveChartProps) {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      const isDarkMode =
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(isDarkMode);
    };

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDarkMode();
    checkMobile();

    // Watch for theme changes
    const themeObserver = new MutationObserver(checkDarkMode);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Watch for resize
    window.addEventListener('resize', checkMobile);

    return () => {
      themeObserver.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Use responsive margins if not provided
  const chartMargin = margin || getDefaultMargin(isMobile);

  const chartColors = useMemo(() => {
    if (colors) return colors;
    // Use theme colors that work well in dark mode
    // Primary colors: #b46633, #96442e with variations
    return [
      '#b46633', // Primary brown
      '#96442e', // Secondary brown
      '#d4a574', // Light tan
      '#8b6f47', // Medium brown
      '#c9a961', // Golden brown
      '#a67c52', // Warm brown
      '#e6c99c', // Light beige
    ];
  }, [colors]);

  const textColor = isDark ? '#ffffff' : '#000000';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const tooltipBg = isDark ? '#1f2937' : '#ffffff';
  const tooltipText = isDark ? '#ffffff' : '#000000';
  const tooltipBorder = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';

  // Custom tooltip component for all chart types
  const CustomTooltip = (props: any) => {
    const tooltipStyle: React.CSSProperties = {
      background: tooltipBg,
      color: tooltipText,
      padding: '8px 12px',
      borderRadius: '6px',
      border: `1px solid ${tooltipBorder}`,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontSize: '12px',
      fontFamily: 'inherit',
    };

    // Line chart tooltip
    if (props.point) {
      const point = props.point;
      return (
        <div style={tooltipStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: point.color,
                border: `2px solid ${tooltipBg}`,
              }}
            />
            <strong>{point.serieId || point.id}:</strong>
            <span>{point.formattedValue || point.value}</span>
          </div>
        </div>
      );
    }

    // Bar chart tooltip
    if (props.indexValue !== undefined && props.data) {
      const data = props.data;
      return (
        <div style={tooltipStyle}>
          <div style={{ marginBottom: '4px', fontWeight: 600 }}>
            {props.indexValue}
          </div>
          {Object.entries(data)
            .filter(([key, value]) => typeof value === 'number')
            .map(([key, value]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: chartColors[0],
                    border: `2px solid ${tooltipBg}`,
                  }}
                />
                <strong>{key}:</strong>
                <span>{String(value)}</span>
              </div>
            ))}
        </div>
      );
    }

    // Pie chart tooltip
    if (props.slice) {
      const slice = props.slice;
      return (
        <div style={tooltipStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: slice.color,
                border: `2px solid ${tooltipBg}`,
              }}
            />
            <strong>{slice.label || slice.id}:</strong>
            <span>{slice.formattedValue || slice.value}</span>
          </div>
        </div>
      );
    }

    // Radar chart tooltip
    if (props.index !== undefined) {
      return (
        <div style={tooltipStyle}>
          <div style={{ marginBottom: '4px', fontWeight: 600 }}>
            {props.index}
          </div>
          {Object.entries(props.data || {})
            .filter(([key, value]) => typeof value === 'number')
            .map(([key, value], idx) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: chartColors[idx % chartColors.length],
                    border: `2px solid ${tooltipBg}`,
                  }}
                />
                <strong>{key}:</strong>
                <span>{String(value)}</span>
              </div>
            ))}
        </div>
      );
    }

    // Fallback for any other tooltip format
    return (
      <div style={tooltipStyle}>
        <div>{JSON.stringify(props)}</div>
      </div>
    );
  };

  const commonProps = {
    margin: chartMargin,
    animate,
    theme: {
      text: {
        fill: textColor,
        fontSize: 12,
      },
      grid: {
        line: {
          stroke: gridColor,
          strokeWidth: 1,
        },
      },
      axis: {
        domain: {
          line: {
            stroke: gridColor,
            strokeWidth: 1,
          },
        },
        ticks: {
          line: {
            stroke: gridColor,
            strokeWidth: 1,
          },
          text: {
            fill: textColor,
            fontSize: 11,
          },
        },
        legend: {
          text: {
            fill: textColor,
            fontSize: 12,
            fontWeight: 600,
          },
        },
      },
      tooltip: {
        container: {
          background: tooltipBg,
          color: tooltipText,
          fontSize: '12px',
          borderRadius: '6px',
          padding: '8px 12px',
          border: `1px solid ${tooltipBorder}`,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        basic: {
          whiteSpace: 'pre',
          display: 'flex',
          alignItems: 'center',
        },
        chip: {
          marginRight: '7px',
        },
        table: {},
        tableCell: {
          padding: '3px 5px',
        },
      },
    },
  };

  switch (type) {
    case 'line': {
      const lineData = data as LineChartData[];
      return (
        <div className={`w-full overflow-hidden ${className}`} style={{ height, minHeight: isMobile ? 300 : height }}>
          <ResponsiveLine
            data={lineData}
            colors={chartColors}
            curve="monotoneX"
            pointSize={8}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableArea={false}
            enableGridX={enableGridX}
            enableGridY={enableGridY}
            enablePoints={true}
            enablePointLabel={false}
            useMesh={true}
            legends={
              enableLegends
                ? [
                    {
                      anchor: isMobile ? 'bottom' : 'top-right',
                      direction: isMobile ? 'row' : 'column',
                      justify: false,
                      translateX: isMobile ? 0 : 0,
                      translateY: isMobile ? 40 : 0,
                      itemsSpacing: isMobile ? 8 : 4,
                      itemDirection: 'left-to-right',
                      itemWidth: isMobile ? 70 : 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]
                : undefined
            }
            axisBottom={{
              ...axisBottom,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              ...axisLeft,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            tooltip={CustomTooltip}
            {...commonProps}
          />
        </div>
      );
    }

    case 'bar': {
      const barData = data as BarChartData[];
      return (
        <div className={`w-full overflow-hidden ${className}`} style={{ height, minHeight: isMobile ? 350 : height }}>
          <ResponsiveBar
            data={barData}
            keys={Object.keys(barData[0] || {}).filter((key) => typeof barData[0]?.[key] === 'number')}
            indexBy={Object.keys(barData[0] || {}).find((key) => typeof barData[0]?.[key] === 'string') || 'id'}
            colors={chartColors}
            enableGridX={enableGridX}
            enableGridY={enableGridY}
            padding={0.3}
            borderRadius={4}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            legends={
              enableLegends
                ? [
                    {
                      dataFrom: 'keys',
                      anchor: isMobile ? 'bottom' : 'top-right',
                      direction: isMobile ? 'row' : 'column',
                      justify: false,
                      translateX: isMobile ? 0 : 0,
                      translateY: isMobile ? 50 : 0,
                      itemsSpacing: isMobile ? 8 : 4,
                      itemWidth: isMobile ? 80 : 100,
                      itemHeight: 20,
                      itemDirection: 'left-to-right',
                      itemOpacity: 0.85,
                      symbolSize: 12,
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]
                : undefined
            }
            axisBottom={{
              ...axisBottom,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: isMobile ? -45 : -30, // Less rotation on desktop
              format: (value) => {
                // Truncate long labels
                const str = String(value);
                return isMobile && str.length > 8 ? `${str.slice(0, 6)}...` : str;
              },
            }}
            axisLeft={{
              ...axisLeft,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: (value) => {
                // Format large numbers
                if (typeof value === 'number') {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                }
                return String(value);
              },
            }}
            tooltip={CustomTooltip}
            {...commonProps}
          />
        </div>
      );
    }

    case 'pie': {
      const pieData = data as PieChartData[];
      return (
        <div className={`w-full overflow-hidden ${className}`} style={{ height, minHeight: isMobile ? 400 : height }}>
          <ResponsivePie
            data={pieData}
            colors={chartColors}
            margin={chartMargin}
            innerRadius={0.5}
            padAngle={2}
            cornerRadius={4}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            enableArcLinkLabels={true}
            arcLinkLabelsSkipAngle={isMobile ? 15 : 10} // Skip more labels on mobile
            arcLinkLabelsTextColor={textColor}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLinkLabelsOffset={isMobile ? 5 : 8} // Closer on mobile
            enableArcLabels={true}
            arcLabelsSkipAngle={isMobile ? 15 : 10} // Skip more labels on mobile
            arcLabelsTextColor={isDark ? '#ffffff' : '#000000'} // Better contrast
            arcLabelsRadiusOffset={0.6} // Position labels better
            legends={
              enableLegends
                ? [
                    {
                      anchor: 'bottom',
                      direction: isMobile ? 'column' : 'row',
                      justify: false,
                      translateX: 0,
                      translateY: isMobile ? 60 : 56,
                      itemsSpacing: isMobile ? 4 : 8,
                      itemWidth: isMobile ? 90 : 100,
                      itemHeight: 18,
                      itemTextColor: textColor,
                      itemDirection: 'left-to-right',
                      itemOpacity: 0.85,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]
                : undefined
            }
            tooltip={CustomTooltip}
            animate={animate}
          />
        </div>
      );
    }

    case 'radar': {
      const radarData = data as RadarChartData[];
      const keys = Object.keys(radarData[0] || {}).filter((key) => typeof radarData[0]?.[key] === 'number');
      const indexBy = Object.keys(radarData[0] || {}).find((key) => typeof radarData[0]?.[key] === 'string') || 'id';

      return (
        <div className={`w-full overflow-hidden ${className}`} style={{ height, minHeight: isMobile ? 350 : height }}>
          <ResponsiveRadar
            data={radarData}
            keys={keys}
            indexBy={indexBy}
            colors={chartColors}
            margin={chartMargin}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: 'color' }}
            gridLevels={5}
            gridShape="circular"
            gridLabelOffset={36}
            enableDots={true}
            dotSize={8}
            dotColor={{ from: 'color' }}
            dotBorderWidth={2}
            dotBorderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
            enableDotLabel={true}
            fillOpacity={0.25}
            animate={animate}
            motionConfig="wobbly"
            legends={
              enableLegends
                ? [
                    {
                      anchor: 'top-left',
                      direction: 'column',
                      translateX: -50,
                      translateY: -40,
                      itemWidth: 80,
                      itemHeight: 20,
                      itemTextColor: textColor,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemTextColor: textColor,
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]
                : undefined
            }
            theme={commonProps.theme}
          />
        </div>
      );
    }

    default:
      return null;
  }
}

