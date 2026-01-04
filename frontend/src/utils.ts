export function createPageUrl(page: string): string {
  const pageRoutes: Record<string, string> = {
    'Home': '/',
    'CarsAvailable': '/cars',
    'Requirements': '/requirements',
    'Terms': '/terms',
    'About': '/about',
    'Contact': '/contact',
  }
  
  return pageRoutes[page] || '/'
}