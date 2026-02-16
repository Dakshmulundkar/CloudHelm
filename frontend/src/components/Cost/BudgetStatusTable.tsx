import React from 'react';
import type { BudgetStatus } from '../../types/cost';

interface BudgetStatusTableProps {
  budgets: BudgetStatus[];
  loading?: boolean;
}

export default function BudgetStatusTable({ budgets, loading = false }: BudgetStatusTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      UNDER: {
        color: 'bg-green-100 text-green-800',
        label: 'Under Budget',
        icon: '✓'
      },
      AT_RISK: {
        color: 'bg-yellow-100 text-yellow-800',
        label: 'At Risk',
        icon: '⚠'
      },
      OVER: {
        color: 'bg-red-100 text-red-800',
        label: 'Over Budget',
        icon: '✗'
      }
    };

    const config = configs[status as keyof typeof configs];

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const getProgressPercentage = (budget: BudgetStatus) => {
    return Math.min((budget.projected_cost / budget.monthly_budget) * 100, 100);
  };

  const getProgressColor = (status: string) => {
    const colors = {
      UNDER: 'bg-green-500',
      AT_RISK: 'bg-yellow-500',
      OVER: 'bg-red-500'
    };
    return colors[status as keyof typeof colors];
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Status</h3>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Budget Status</h3>
        <span className="text-sm text-gray-500">{budgets.length} budgets</span>
      </div>

      {budgets.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">📊 No budgets configured</p>
          <p className="text-sm">Set up budgets to track spending limits</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MTD Spend
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projected
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgets.map((budget, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {budget.team}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {budget.service || 'All services'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(budget.monthly_budget)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(budget.mtd_cost)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    {formatCurrency(budget.projected_cost)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${getProgressColor(budget.status)} transition-all`}
                          style={{ width: `${getProgressPercentage(budget)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-12 text-right">
                        {Math.round(getProgressPercentage(budget))}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {getStatusBadge(budget.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {budgets.length > 0 && (
        <div className="mt-4 text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium">Under Budget:</span> Projected spend {'<'} 90% of budget
          </p>
          <p>
            <span className="font-medium">At Risk:</span> Projected spend between 90-110% of budget
          </p>
          <p>
            <span className="font-medium">Over Budget:</span> Projected spend {'>'} 110% of budget
          </p>
        </div>
      )}
    </div>
  );
}
