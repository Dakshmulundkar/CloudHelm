import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  ZAxis
} from 'recharts';
import type { CostSummaryResponse, CostAnomaly } from '../../types/cost';

interface CostTimeSeriesChartProps {
  costData: CostSummaryResponse | null;
  anomalies: CostAnomaly[];
  loading?: boolean;
}

export default function CostTimeSeriesChart({
  costData,
  anomalies,
  loading = false
}: CostTimeSeriesChartProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!costData || costData.series.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Trends</h3>
        <div className="h-80 flex items-center justify-center text-gray-500">
          No cost data available. Upload cost files to see trends.
        </div>
      </div>
    );
  }

  // Prepare data for chart
  const allDates = new Set<string>();
  costData.series.forEach(series => {
    series.points.forEach(point => allDates.add(point.date));
  });

  const sortedDates = Array.from(allDates).sort();

  const chartData = sortedDates.map(date => {
    const dataPoint: any = { date };
    
    costData.series.forEach(series => {
      const point = series.points.find(p => p.date === date);
      dataPoint[series.key] = point ? point.total_cost : 0;
    });

    return dataPoint;
  });

  // Prepare anomaly markers
  const anomalyData = anomalies.map(anomaly => {
    const dateIndex = sortedDates.indexOf(anomaly.ts_date);
    return {
      date: anomaly.ts_date,
      x: dateIndex,
      y: anomaly.actual_cost,
      severity: anomaly.severity
    };
  });

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Cost Trends</h3>
        <div className="text-sm text-gray-500">
          Grouped by {costData.group_by}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            tickFormatter={formatCurrency}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={formatDate}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px'
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          {costData.series.map((series, index) => (
            <Line
              key={series.key}
              type="monotone"
              dataKey={series.key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {anomalies.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            {anomalies.length} anomalies detected in this period
          </span>
        </div>
      )}
    </div>
  );
}
