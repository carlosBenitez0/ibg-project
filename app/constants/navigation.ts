// Configuración única de la navegación (navbar desktop, menú móvil, footer).
// `comingSoon` envía el enlace a la página "en desarrollo" mientras la ruta
// real no exista; al publicar una página basta con quitar el flag.

export const COMING_SOON_HREF = '/page-under-construction';

export interface NavLink {
  label: string;
  href: string;
  comingSoon?: boolean;
}

export interface NavSection {
  label: string;
  options: NavLink[];
}

/** Secciones con dropdown del navbar. */
export const navSections: NavSection[] = [
  {
    label: 'Iglesia',
    options: [
      { label: 'Sobre nosotros', href: '/iglesia/sobre-nosotros' },
      { label: 'Ubicación', href: '/iglesia/ubicacion' },
    ],
  },
  {
    label: 'Actividades',
    options: [
      { label: 'Eventos', href: '/actividades/eventos' },
      { label: 'Ministerios', href: '/actividades/ministerios' },
      { label: 'Evangelismo', href: '/actividades/evangelismo' },
    ],
  },
  {
    label: 'Medios',
    options: [
      { label: 'Transmisiones', href: '/medios/transmisiones' },
      { label: 'Blog', href: '/medios/blog', comingSoon: true },
    ],
  },
];

/** Enlaces sueltos (fuera de los dropdowns). */
export const contactLink: NavLink = {
  label: 'Contacto',
  href: '/contacto',
  comingSoon: true,
};

export const donationsLink: NavLink = {
  label: 'Donaciones',
  href: '/donaciones',
  comingSoon: true,
};

/** Href real del enlace o la página "en desarrollo" si aún no existe. */
export const resolveNavHref = (link: NavLink) =>
  link.comingSoon ? COMING_SOON_HREF : link.href;

const matchesPath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

/**
 * Sección y opción activas según la ruta actual. Las secciones sueltas usan
 * su label en minúsculas ('contacto', 'donaciones'); el inicio es 'inicio'.
 */
export const getActiveNav = (pathname: string) => {
  if (pathname === '/') return { section: 'inicio', option: '' };

  for (const section of navSections) {
    const option = section.options.find(
      (item) => !item.comingSoon && matchesPath(pathname, item.href)
    );
    if (option) return { section: section.label, option: option.label };
  }

  for (const link of [contactLink, donationsLink]) {
    if (!link.comingSoon && matchesPath(pathname, link.href)) {
      return { section: link.label.toLowerCase(), option: '' };
    }
  }

  return { section: '', option: '' };
};
