import { createBrowserRouter } from "react-router-dom";

// Layouts
import { PublicLayout } from "./layouts/PublicLayout";
import { AppLayout } from "./layouts/AppLayout";
import { ErrorLayout } from "./layouts/ErrorLayout";

// Guards
import { ProtectedRoute } from "./guards/ProtectedRoute";
import { RoleGuard } from "./guards/RoleGuard";

// App-level pages
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import NotFoundPage from "./pages/NotFoundPage";

// Feature pages
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

import BrowseGigsPage from "@/features/gigs/pages/BrowseGigsPage";
import GigDetailPage from "@/features/gigs/pages/GigDetailPage";
import CreateGigPage from "@/features/gigs/pages/CreateGigPage";
import EditGigPage from "@/features/gigs/pages/EditGigPage";
import MyGigsPage from "@/features/gigs/pages/MyGigsPage";

import MyProposalsPage from "@/features/proposals/pages/MyProposalsPage";
import ProposalDetailPage from "@/features/proposals/pages/ProposalDetailPage";

import ContractsListPage from "@/features/contracts/pages/ContractsListPage";
import ContractDetailPage from "@/features/contracts/pages/ContractDetailPage";

import InvoicesListPage from "@/features/invoices/pages/InvoicesListPage";
import InvoiceDetailPage from "@/features/invoices/pages/InvoiceDetailPage";

import ProfilePage from "@/features/profile/pages/ProfilePage";
import ProfileEditPage from "@/features/profile/pages/ProfileEditPage";

import { UserRole } from "@/shared/constants/roles";

/**
 * Router shape:
 *
 *   PublicLayout
 *     ├── /            LandingPage
 *     ├── /login       LoginPage
 *     └── /register    RegisterPage
 *
 *   ProtectedRoute → AppLayout    (auth required)
 *     ├── /dashboard
 *     ├── /gigs                   (both roles can browse)
 *     ├── /gigs/:id
 *     ├── /contracts              (both roles)
 *     ├── /contracts/:id
 *     ├── /invoices               (both roles)
 *     ├── /invoices/:id
 *     ├── /profile
 *     ├── /profile/edit
 *     ├── /proposals/:id          (both roles can view a single proposal they're party to)
 *     │
 *     ├── RoleGuard(Client)
 *     │     ├── /gigs/new
 *     │     ├── /gigs/:id/edit
 *     │     └── /my-gigs
 *     │
 *     └── RoleGuard(Freelancer)
 *           └── /proposals        (the freelancer's own outgoing proposals)
 *
 *   ErrorLayout
 *     ├── /403
 *     └── *    (catch-all → 404)
 *
 * Note: nested guards stack. /gigs/new is auth-required AND
 * client-only — both guards run, in order.
 */
export const router = createBrowserRouter([
  // Public routes
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },

  // Authenticated routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          // Routes accessible to both Client and Freelancer
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/gigs", element: <BrowseGigsPage /> },
          { path: "/gigs/:id", element: <GigDetailPage /> },
          { path: "/proposals/:id", element: <ProposalDetailPage /> },
          { path: "/contracts", element: <ContractsListPage /> },
          { path: "/contracts/:id", element: <ContractDetailPage /> },
          { path: "/invoices", element: <InvoicesListPage /> },
          { path: "/invoices/:id", element: <InvoiceDetailPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/profile/edit", element: <ProfileEditPage /> },

          // Client-only routes
          {
            element: <RoleGuard allowed={[UserRole.Client]} />,
            children: [
              { path: "/gigs/new", element: <CreateGigPage /> },
              { path: "/gigs/:id/edit", element: <EditGigPage /> },
              { path: "/my-gigs", element: <MyGigsPage /> },
            ],
          },

          // Freelancer-only routes
          {
            element: <RoleGuard allowed={[UserRole.Freelancer]} />,
            children: [{ path: "/proposals", element: <MyProposalsPage /> }],
          },
        ],
      },
    ],
  },

  // Error routes
  {
    element: <ErrorLayout />,
    children: [
      { path: "/403", element: <ForbiddenPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);