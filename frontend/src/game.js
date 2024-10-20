import React, { useState, useEffect } from 'react';
import { Coins, TrendingUp, Wallet, PiggyBank, CreditCard, HomeIcon, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FinancialLifeSimulator = () => {
  const [stats, setStats] = useState({
    cash: 5000,
    savings: 0,
    credit: 800,
    investments: 0,
    happiness: 50,
    month: 1,
    salary: 4000,
    expenses: 2000,
  });

  const [history, setHistory] = useState([]);
  const [showEvent, setShowEvent] = useState(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  const lifeEvents = [
    {
      id: 'emergency',
      title: 'Unexpected Car Repair',
      description: 'Your car needs repairs. Cost: $800',
      options: [
        {
          text: 'Pay with savings',
          effect: (stats) => ({
            ...stats,
            savings: stats.savings - 800,
            happiness: stats.happiness + 5,
          }),
          advice: "Having an emergency fund helps avoid debt for unexpected expenses.",
          condition: (stats) => stats.savings >= 800
        },
        {
          text: 'Use credit card',
          effect: (stats) => ({
            ...stats,
            credit: stats.credit - 20,
            happiness: stats.happiness - 5,
          }),
          advice: "Using credit for emergencies can hurt your credit score and add interest costs."
        }
      ]
    },
    {
      id: 'investment',
      title: 'Investment Opportunity',
      description: 'A diversified index fund investment opportunity.',
      options: [
        {
          text: 'Invest $1000',
          effect: (stats) => ({
            ...stats,
            cash: stats.cash - 1000,
            investments: stats.investments + 1000,
            happiness: stats.happiness + 10,
          }),
          advice: "Regular investing in diversified funds is a key wealth-building strategy.",
          condition: (stats) => stats.cash >= 1000
        },
        {
          text: 'Skip investment',
          effect: (stats) => ({
            ...stats,
            happiness: stats.happiness - 5,
          }),
          advice: "Missing investment opportunities can slow your long-term wealth growth."
        }
      ]
    },
    {
      id: 'savings',
      title: 'High-Yield Savings Account',
      description: 'Opportunity to open a high-yield savings account.',
      options: [
        {
          text: 'Transfer $2000 to savings',
          effect: (stats) => ({
            ...stats,
            cash: stats.cash - 2000,
            savings: stats.savings + 2000,
            happiness: stats.happiness + 8,
          }),
          advice: "High-yield savings accounts help your emergency fund grow with better interest rates.",
          condition: (stats) => stats.cash >= 2000
        },
        {
          text: 'Keep money in checking',
          effect: (stats) => stats,
          advice: "Keeping too much in checking means missing out on interest earnings."
        }
      ]
    }
  ];

  const gameAchievements = [
    {
      id: 'saver',
      title: 'Super Saver',
      condition: (stats) => stats.savings >= 10000,
      icon: <PiggyBank />,
      description: 'Saved $10,000!'
    },
    {
      id: 'investor',
      title: 'Smart Investor',
      condition: (stats) => stats.investments >= 5000,
      icon: <TrendingUp />,
      description: 'Invested $5,000!'
    },
    {
      id: 'creditMaster',
      title: 'Credit Master',
      condition: (stats) => stats.credit >= 850,
      icon: <CreditCard />,
      description: 'Achieved excellent credit!'
    }
  ];

  useEffect(() => {
    // Monthly update
    const interval = setInterval(() => {
      if (!showEvent) {
        setStats(prev => {
          const monthlyIncome = prev.salary;
          const monthlyExpenses = prev.expenses;
          const investmentReturns = prev.investments * 0.006; // 7.2% annual return
          const savingsInterest = prev.savings * 0.003; // 3.6% annual interest

          const newStats = {
            ...prev,
            month: prev.month + 1,
            cash: prev.cash + monthlyIncome - monthlyExpenses,
            investments: prev.investments + investmentReturns,
            savings: prev.savings + savingsInterest,
          };

          // Check for new achievements
          gameAchievements.forEach(achievement => {
            if (achievement.condition(newStats)) {
              setUnlockedAchievements(prev => 
                prev.includes(achievement.id) ? prev : [...prev, achievement.id]
              );
            }
          });

          return newStats;
        });

        // Random life events
        if (Math.random() < 0.3) {
          const randomEvent = lifeEvents[Math.floor(Math.random() * lifeEvents.length)];
          setShowEvent(randomEvent);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [showEvent]);

  const handleEventOption = (option) => {
    if (option.condition && !option.condition(stats)) {
      return;
    }

    setStats(option.effect(stats));
    setHistory(prev => [...prev, {
      month: stats.month,
      event: showEvent.title,
      action: option.text,
      advice: option.advice
    }]);
    setShowEvent(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-emerald-50 rounded-lg shadow-xl">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Financial Life Simulator</h1>
        <p className="text-emerald-600">Month: {stats.month}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Wallet className="text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Cash</p>
                <p className="font-bold">{formatCurrency(stats.cash)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <PiggyBank className="text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Savings</p>
                <p className="font-bold">{formatCurrency(stats.savings)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Investments</p>
                <p className="font-bold">{formatCurrency(stats.investments)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CreditCard className="text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Credit Score</p>
                <p className="font-bold">{stats.credit}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showEvent && (
        <Card className="mb-6 bg-emerald-100 border-emerald-200">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-2">{showEvent.title}</h3>
            <p className="mb-4">{showEvent.description}</p>
            <div className="grid grid-cols-1 gap-2">
              {showEvent.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleEventOption(option)}
                  disabled={option.condition && !option.condition(stats)}
                  className={`p-3 rounded-lg text-left ${
                    option.condition && !option.condition(stats)
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-emerald-200 hover:bg-emerald-300'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white">
          <CardContent className="pt-4">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Award className="text-emerald-600" />
              Achievements
            </h3>
            <div className="space-y-2">
              {gameAchievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`p-2 rounded-lg ${
                    unlockedAchievements.includes(achievement.id)
                      ? 'bg-emerald-100'
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {achievement.icon}
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="pt-4">
            <h3 className="font-bold mb-2">Financial History & Advice</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {history.map((event, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Month {event.month}:</span> {event.event}
                  </p>
                  <p className="text-sm text-emerald-600">{event.advice}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialLifeSimulator;