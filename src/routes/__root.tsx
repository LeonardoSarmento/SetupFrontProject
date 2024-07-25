import { Logout } from '@components/Logout';
import { ModeToggle } from '@components/Mode-toggle';
import { AuthContext } from '@services/hooks/auth';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { Suspense } from 'react';
import { Toaster } from 'sonner';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthContext;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex w-full items-center justify-end gap-2 space-x-7 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Início
        </Link>{' '}
        <Link to="/home" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/users" className="[&.active]:font-bold">
          Users
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Logout />
        <ModeToggle className="justify-self-end" />
      </div>
      <hr />
      <Outlet />
      <Toaster richColors closeButton position="top-center" />
      <Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}
