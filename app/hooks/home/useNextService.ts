'use client';

import { useEffect, useState } from 'react';

export interface ServiceInfo {
  day: string;
  dayNumber: number;
  subtitle: string;
  description: string;
  time: string;
  isPast: boolean;
}

export const useNextService = () => {
  const [nextService, setNextService] = useState<ServiceInfo | null>(null);
  const [allServices] = useState([
    {
      dayNumber: 0,
      day: 'Domingo',
      time: '16:00',
      subtitle: 'Domingo 4:00PM',
      description: 'Culto Principal',
    },
    {
      dayNumber: 2,
      day: 'Martes',
      time: '16:00',
      subtitle: 'Martes 4:00PM',
      description: 'Culto de Oración',
    },
    {
      dayNumber: 3,
      day: 'Miércoles',
      time: '17:00',
      subtitle: 'Miércoles 5:00PM',
      description: 'Culto de Célula de Hogar',
    },
    {
      dayNumber: 4,
      day: 'Jueves',
      time: '16:00',
      subtitle: 'Jueves 4:00PM',
      description: 'Culto de Estudio Bíblico',
    },
    {
      dayNumber: 6,
      day: 'Sábado',
      time: '16:00',
      subtitle: 'Sábado 4:00PM',
      description: 'Culto de General',
    },
    {
      dayNumber: 6,
      day: 'Sábado',
      time: '18:00',
      subtitle: 'Sábado 6:00PM',
      description: 'Culto de Jóvenes',
    },
  ]);

  useEffect(() => {
    const updateNextService = () => {
      const now = new Date(); // Get current date and time, example: 2024-06-15T14:30:00
      const currentDayNumber = now.getDay(); // 0 = Sunday, 6 = Saturday
      const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes for easy comparison

      let nextServiceFound: ServiceInfo | null = null;

      // First, look for services TODAY after the current time
      const todayServices = allServices.filter(
        (service) => service.dayNumber === currentDayNumber
      );
      const futureServiceToday = todayServices.find((service) => {
        const [hours, minutes] = service.time.split(':').map(Number);
        const serviceTimeInMinutes = hours * 60 + minutes;
        return serviceTimeInMinutes > currentTime;
      });

      if (futureServiceToday) {
        nextServiceFound = {
          ...futureServiceToday,
          isPast: false,
        };
      } else {
        // If no services today, look for the next service in coming days
        for (let i = 1; i <= 7; i++) {
          const nextDate = new Date(now);
          nextDate.setDate(nextDate.getDate() + i);
          const nextDayNumber = nextDate.getDay();

          const serviceForNextDay = allServices.find(
            (service) => service.dayNumber === nextDayNumber
          );
          if (serviceForNextDay) {
            nextServiceFound = {
              ...serviceForNextDay,
              isPast: false,
            };
            break;
          }
        }
      }

      // If still not found (shouldn't happen given our service schedule), find the earliest service in the week
      if (!nextServiceFound) {
        nextServiceFound = {
          ...allServices[0],
          isPast: false,
        };
      }

      setNextService(nextServiceFound);
    };

    updateNextService();

    // Update every minute to keep the "next service" accurate
    const interval = setInterval(updateNextService, 60000);
    return () => clearInterval(interval);
  }, [allServices]);

  return { nextService };
};
