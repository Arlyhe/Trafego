import React from 'react';

interface PieChartData {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ data, size = 200 }) => {
  const radius = size / 2 - 10;
  const centerX = size / 2;
  const centerY = size / 2;
  
  let cumulativePercentage = 0;
  
  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", centerX, centerY,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };
  
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((item, index) => {
          const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
          const endAngle = (cumulativePercentage + item.percentage) * 3.6;
          const pathData = createArcPath(startAngle, endAngle);
          
          cumulativePercentage += item.percentage;
          
          return (
            <path
              key={index}
              d={pathData}
              fill={item.color}
              stroke="white"
              strokeWidth="2"
              className="hover:opacity-80 transition-opacity duration-200"
            />
          );
        })}
        
        {/* Center circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.4}
          fill="white"
          stroke="#e5e7eb"
          strokeWidth="2"
        />
        
        {/* Total text */}
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-700 text-xl font-bold transform rotate-90"
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        >
          {data.reduce((sum, item) => sum + item.value, 0)}
        </text>
      </svg>
    </div>
  );
};