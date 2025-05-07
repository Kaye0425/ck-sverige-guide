
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

// Define time zones with their UTC offsets and city names
const timeZones = [
  { name: 'UTC', offset: 0, city: 'London' },
  { name: 'UTC+1', offset: 1, city: 'Paris' },
  { name: 'UTC+2', offset: 2, city: 'Cairo' },
  { name: 'UTC+3', offset: 3, city: 'Moscow' },
  { name: 'UTC+5:30', offset: 5.5, city: 'New Delhi' },
  { name: 'UTC+8', offset: 8, city: 'Beijing' },
  { name: 'UTC+9', offset: 9, city: 'Tokyo' },
  { name: 'UTC+10', offset: 10, city: 'Sydney' },
  { name: 'UTC-4', offset: -4, city: 'New York' },
  { name: 'UTC-5', offset: -5, city: 'Chicago' },
  { name: 'UTC-7', offset: -7, city: 'Denver' },
  { name: 'UTC-8', offset: -8, city: 'Los Angeles' },
];

const WorldTimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up on unmount
    return () => clearInterval(timer);
  }, []);

  // Get time for a specific timezone
  const getTimeInZone = (offset: number) => {
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
    const zoneTime = new Date(utc + (3600000 * offset));
    return zoneTime;
  };

  return (
    <div className="w-64 bg-white dark:bg-card shadow-lg h-full overflow-auto py-4">
      <div className="px-4 pb-3 mb-3 border-b">
        <h2 className="text-xl font-bold text-earth-forest flex items-center">
          <Clock className="mr-2" size={20} />
          World Clock
        </h2>
      </div>
      <div className="space-y-3 px-3">
        {timeZones.map((zone) => (
          <div 
            key={zone.name} 
            className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-sm">{zone.city}</p>
                <p className="text-xs text-muted-foreground">{zone.name}</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-semibold">
                  {format(getTimeInZone(zone.offset), 'HH:mm')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(getTimeInZone(zone.offset), 'EEE, MMM d')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldTimeClock;
