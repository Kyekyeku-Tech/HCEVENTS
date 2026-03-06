import { Navigate, Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout() {
  const { user, loading, isAdmin } = useAuth();

  /* WAIT FOR AUTH CHECK */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f2ee]">
        <p className="text-xs tracking-widest uppercase text-black/60">
          Loading…
        </p>
      </div>
    );
  }

  /* AUTH GUARD */
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-[#f5f2ee] text-[#2b2b2b]">
      {/* SIDEBAR */}
      <aside
        className="w-64 border-r border-black/10 px-6 py-10"
        role="navigation"
        aria-label="Admin navigation"
      >
        <h1 className="font-serif text-[18px] tracking-wide mb-12">
          Admin Panel
        </h1>

        <nav className="space-y-5 text-xs uppercase tracking-widest">
          <AdminLink to="/admin">Dashboard</AdminLink>
          <AdminLink to="/admin/approvals">Approvals</AdminLink>
          <AdminLink to="/admin/portfolio">Portfolio</AdminLink>
          <AdminLink to="/admin/services">Services</AdminLink>
          <AdminLink to="/admin/bookings">Bookings</AdminLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className="flex-1 px-12 py-10"
        role="main"
        tabIndex={-1}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

/* ADMIN NAV LINK */
function AdminLink({ to, children }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        [
          "block transition",
          isActive
            ? "opacity-100 font-medium"
            : "opacity-60 hover:opacity-100",
        ].join(" ")
      }
      aria-current={({ isActive }) => (isActive ? "page" : undefined)}
    >
      {children}
    </NavLink>
  );
}
