import { Redis } from '@upstash/redis';

let redis = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// Fonction helper pour obtenir les dates
function getDates() {
  const today = new Date();
  const dates = [];
  
  // Aujourd'hui
  dates.push(today.toISOString().split('T')[0]);
  
  // 7 derniers jours
  for (let i = 1; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  // 30 derniers jours (pour le mois)
  for (let i = 7; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
}

// Fonction helper pour obtenir les dates du mois
function getCurrentMonthDates() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const dates = [];
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split('T')[0]);
  }
  
  return dates;
}

// Fonction helper pour obtenir les dates de l'année
function getCurrentYearDates() {
  const today = new Date();
  const year = today.getFullYear();
  const dates = [];
  
  const firstDay = new Date(year, 0, 1);
  
  for (let d = new Date(firstDay); d <= today; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split('T')[0]);
  }
  
  return dates;
}

export async function GET() {
  if (!redis) {
    return Response.json({
      today: 0,
      week: 0,
      month: 0,
      currentMonth: 0,
      year: 0
    });
  }

  try {
    const dates = getDates();
    const monthDates = getCurrentMonthDates();
    const yearDates = getCurrentYearDates();
    
    // Récupérer les visites pour chaque jour
    const keys = dates.map(date => `visits:${date}`);
    const monthKeys = monthDates.map(date => `visits:${date}`);
    const yearKeys = yearDates.map(date => `visits:${date}`);
    
    const values = await redis.mget(...keys);
    const monthValues = await redis.mget(...monthKeys);
    const yearValues = await redis.mget(...yearKeys);
    
    // Calculer les totaux
    const today = parseInt(values[0]) || 0;
    const week = values.slice(0, 7).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    const month = values.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    const currentMonth = monthValues.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    const year = yearValues.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    
    return Response.json({
      today,
      week,
      month,
      currentMonth,
      year
    });
  } catch (error) {
    console.error('Stats error:', error);
    return Response.json({
      today: 0,
      week: 0,
      month: 0,
      currentMonth: 0,
      year: 0
    });
  }
}
