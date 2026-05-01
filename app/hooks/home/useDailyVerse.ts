'use client';
import { useEffect, useState } from 'react';

export const useDailyVerse = () => {
  const [dailyVerse, setDailyVerse] = useState<{
    verse: string;
    reference: string;
  }>({
    verse: '',
    reference: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDailyVerse = async () => {
      try {
        setLoading(true);
        setError(null);

        const dailyVerseData = await fetch(
          'https://beta.ourmanna.com/api/v1/get?format=json&order=daily',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await dailyVerseData.json();

        const getTranslatedVerse = async (
          verse: string,
          reference: string
        ): Promise<{ verse: string; reference: string }> => {
          try {
            const response = await fetch(
              `/api/translate?verse=${encodeURIComponent(verse)}&reference=${encodeURIComponent(reference)}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );

            const data = await response.json();
            return {
              verse: data.verse,
              reference: data.reference,
            };
          } catch (error) {
            console.error(`Error translating verse: ${error}`);
            return {
              verse,
              reference,
            };
          }
        };

        const traducedData = await getTranslatedVerse(
          data.verse.details.text,
          data.verse.details.reference
        );

        setDailyVerse({
          verse: traducedData.verse,
          reference: traducedData.reference,
        });
      } catch (error) {
        console.error(`Error fetching daily verse: ${error}`);
        setError('Error al obtener el versículo del día');
      } finally {
        setLoading(false);
      }
    };

    getDailyVerse();
  }, []);

  return {
    verse: dailyVerse.verse,
    reference: dailyVerse.reference,
    loading,
    error,
  };
};
