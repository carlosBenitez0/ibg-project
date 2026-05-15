'use client';

import { useEffect, useState } from 'react';

type DailyVerse = {
  verse: string;
  reference: string;
};

const STORAGE_KEY = 'todaysTranslatedVerse';

const getNowDate = () =>
  new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

export const useDailyVerse = () => {
  const [dailyVerse, setDailyVerse] = useState<DailyVerse>({
    verse: '',
    reference: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const now = getNowDate();

    const loadFromStorage = (): boolean => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const parsed = JSON.parse(raw);
        if (parsed.now === now && parsed.data) {
          setDailyVerse({
            verse: parsed.data.verse || '',
            reference: parsed.data.reference || '',
          });
          return true;
        }
      } catch (e) {
        console.error('Error reading stored verse', e);
      }
      return false;
    };

    if (loadFromStorage()) return;

    const getTranslatedVerse = async (
      verse: string,
      reference: string
    ): Promise<DailyVerse> => {
      try {
        const response = await fetch(
          `/api/translate?verse=${encodeURIComponent(verse)}&reference=${encodeURIComponent(reference)}`
        );
        if (!response.ok) throw new Error(`Translate API ${response.status}`);
        const data = await response.json();

        // Persist the translated result with the current `now` value
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ now, data }));
        } catch (e) {
          // ignore storage errors
          console.warn('Could not write to localStorage', e);
        }

        return {
          verse: data.verse || verse,
          reference: data.reference || reference,
        };
      } catch (err) {
        console.error('Error translating verse', err);
        return { verse, reference };
      }
    };

    const fetchDailyVerse = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          'https://beta.ourmanna.com/api/v1/get?format=json&order=daily'
        );
        if (!res.ok) throw new Error(`Daily verse API ${res.status}`);
        const data = await res.json();

        const translated = await getTranslatedVerse(
          data.verse.details.text,
          data.verse.details.reference
        );

        console.log('se hizo la peticion');

        setDailyVerse({
          verse: translated.verse,
          reference: translated.reference,
        });
      } catch (err) {
        console.error('Error fetching daily verse', err);
        setError('Error al obtener el versículo del día');
      } finally {
        setLoading(false);
      }
    };

    fetchDailyVerse();
  }, []);

  return {
    verse: dailyVerse.verse,
    reference: dailyVerse.reference,
    loading,
    error,
  };
};
