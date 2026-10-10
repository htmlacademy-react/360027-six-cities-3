import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@/const';
import { offers } from '@/mocks/offers';
import { reviews } from '@/mocks/reviews';
import MainPage from '@/pages/main-page/main-page';
import PrivateRoute from '@/components/private-route/private-route';
import Loader from '@/components/loader/loader';

const LoginPage = lazy(() => import('@/pages/login-page/login-page'));
const FavoritesPage = lazy(
  () => import('@/pages/favorites-page/favorites-page'),
);
const OfferPage = lazy(() => import('@/pages/offer-page/offer-page'));
const NotFoundPage = lazy(
  () => import('@/pages/not-found-page/not-found-page'),
);

const router = createBrowserRouter([
  {
    path: AppRoute.Root,
    element: <MainPage offers={offers} />,
  },
  {
    path: AppRoute.Login,
    element: <LoginPage />,
  },
  {
    path: AppRoute.Favorites,
    element: (
      <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
        <FavoritesPage offers={offers} />
      </PrivateRoute>
    ),
  },
  {
    path: AppRoute.Offer,
    element: <OfferPage offers={offers} reviews={reviews} />,
  },
  {
    path: AppRoute.NotFound,
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App(): JSX.Element {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
