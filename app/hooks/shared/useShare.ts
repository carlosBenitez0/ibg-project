'use client';

import { useCallback } from 'react';
import { toast } from 'react-toastify';

interface ShareData {
  title: string;
  text?: string;
  /** Por defecto, la URL actual */
  url?: string;
}

/**
 * Comparte con la API nativa del dispositivo; si no está disponible,
 * copia el enlace al portapapeles y avisa con un toast.
 */
export const useShare = () => {
  return useCallback(async ({ title, text, url }: ShareData) => {
    const shareUrl = url ?? window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {
        // El usuario canceló el diálogo: no es un error
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Enlace copiado al portapapeles');
    } catch {
      toast.error('No se pudo copiar el enlace');
    }
  }, []);
};
