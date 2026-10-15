'use client';

import { ToastContainer } from 'react-toastify';

/** Contenedor global de notificaciones (react-toastify v11 inyecta su CSS). */
export const Toaster = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={3500}
    hideProgressBar
    newestOnTop
    theme="colored"
  />
);

export default Toaster;
