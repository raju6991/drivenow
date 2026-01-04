import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import { RootComponent } from '../components/RootLayout'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import CarsAvailable from '../pages/CarsAvailable'
import AdminLayout from '../components/admin/AdminLayout'
import ProtectedRoute from '../components/admin/ProtectedRoute'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminCars from '../pages/admin/Cars'
import AdminRentals from '../pages/admin/Rentals'
import AdminReports from '../pages/admin/Reports'
import AdminLogin from '../pages/admin/Login'
import AdminRegister from '../pages/admin/Register'

function Requirements() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">Requirements</h1>
      <p className="text-slate-600 text-justify">To rent a car, you must provide a valid Australian or international driver’s licence along with a passport or other valid ID, pay a refundable bond (typically between $300–$500), commit to a minimum two-week rental period, make weekly or fortnightly payments, and agree to follow all insurance and vehicle care rules. We rent to students, workers, delivery drivers, temporary visitors, and new arrivals to Australia. Payments must be made on time, with late fees applying if overdue, and the vehicle may be collected if payments are more than seven days late.</p>
      <p className="text-slate-600 mt-5 text-justify">Full insurance is included, however an excess applies if the driver is at fault, and any damage must be reported immediately. Uber Eats delivery is allowed, but carrying rideshare passengers (such as Uber or DiDi) is not permitted unless explicitly approved. The driver is responsible for all fines, tolls, and infringements, and reckless or unsafe driving is strictly prohibited. All servicing and routine maintenance are handled by us, but you must contact us immediately if any mechanical issues occur, as continuing to drive while ignoring warning lights may result in additional charges.</p>
    </div>
  )
}

function Terms() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms & Conditions</h1>
      <p className="text-slate-600 mt-5 text-justify">
        Payments must be made weekly or fortnightly and are required to be paid on time. Late fees will apply if payments are overdue, and the vehicle may be collected if payments remain unpaid for seven days or more.
      </p>

      <p className="text-slate-600 mt-5 text-justify">
        Full insurance is included with the rental; however, an excess will apply if the driver is at fault, and any damage must be reported immediately. Uber Eats delivery is allowed, but carrying rideshare passengers (such as Uber or DiDi) is not permitted unless explicitly approved.
      </p>

      <p className="text-slate-600 mt-5 text-justify">
        The driver is responsible for all fines, tolls, and infringements incurred during the rental period, and reckless or unsafe driving is strictly prohibited. All servicing and routine maintenance are handled by us, but you must contact us immediately if any mechanical issues arise, as driving while ignoring warning lights may result in additional charges.
      </p>

    </div>
  )
}

const rootRoute = createRootRoute({
  component: RootComponent,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const carsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cars',
  component: CarsAvailable,
})

const requirementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/requirements',
  component: Requirements,
})

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: Terms,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
})

// Admin Routes
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/login',
  component: AdminLogin,
})

const adminRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/register',
  component: AdminRegister,
})

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLayout,
})

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/',
  component: () => (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  ),
})

const adminCarsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/cars',
  component: () => (
    <ProtectedRoute>
      <AdminCars />
    </ProtectedRoute>
  ),
})

const adminRentalsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/rentals',
  component: () => (
    <ProtectedRoute>
      <AdminRentals />
    </ProtectedRoute>
  ),
})

const adminReportsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/reports',
  component: () => (
    <ProtectedRoute>
      <AdminReports />
    </ProtectedRoute>
  ),
})

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    indexRoute,
    carsRoute,
    requirementsRoute,
    termsRoute,
    aboutRoute,
    contactRoute,
    adminLoginRoute,
    adminRegisterRoute,
    adminLayoutRoute.addChildren([
      adminDashboardRoute,
      adminCarsRoute,
      adminRentalsRoute,
      adminReportsRoute,
    ])
  ]),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}