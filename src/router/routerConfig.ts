export enum AppRoutes {
  HOME = 'home',
  TRANSACTIONS = 'transactions',
  CATEGORIES = 'categories',
  AUTH = 'auth',
  ERROR_PAGE = 'error_page',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.TRANSACTIONS]: '/transactions',
  [AppRoutes.CATEGORIES]: '/categories',
  [AppRoutes.AUTH]: '/auth',
  [AppRoutes.ERROR_PAGE]: '*',
};
