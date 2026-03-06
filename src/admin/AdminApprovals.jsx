import { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Loader from "../components/ui/Loader";
import { motion } from "framer-motion";

export default function AdminApprovals() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [actionLoading, setActionLoading] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      // Fetch pending approvals
      const pendingQuery = query(
        collection(db, "users"),
        where("role", "==", "pending")
      );
      const pendingSnapshot = await getDocs(pendingQuery);
      setPending(
        pendingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      // Fetch approved admins
      const approvedQuery = query(
        collection(db, "users"),
        where("approved", "==", true)
      );
      const approvedSnapshot = await getDocs(approvedQuery);
      setApproved(
        approvedSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (err) {
      console.error("Error fetching admins:", err);
      setMessage("Error loading admin requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId, userName, userEmail) => {
    if (!window.confirm(`Approve admin access for ${userName} (${userEmail})?`)) {
      return;
    }

    setActionLoading(userId);
    try {
      await updateDoc(doc(db, "users", userId), {
        role: "admin",
        approved: true,
        updatedAt: new Date(),
      });

      setMessage(`✓ ${userName} has been approved as admin`);
      setPending(pending.filter((p) => p.id !== userId));
      fetchAdmins();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error approving admin:", err);
      setMessage("Error approving admin");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (userId, userName) => {
    if (!window.confirm(`Reject admin request for ${userName}?`)) {
      return;
    }

    setActionLoading(userId);
    try {
      await updateDoc(doc(db, "users", userId), {
        role: "rejected",
        updatedAt: new Date(),
      });

      setMessage(`✗ ${userName}'s request has been rejected`);
      setPending(pending.filter((p) => p.id !== userId));

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error rejecting admin:", err);
      setMessage("Error rejecting admin");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <Loader label="Loading admin requests" />;
  }

  return (
    <section className="max-w-5xl mx-auto px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-[28px] mb-2 font-light">
          Admin Approvals
        </h1>
        <p className="text-sm text-black/60">
          Manage admin account requests and approvals
        </p>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-black/5 border border-black/10 text-sm"
        >
          {message}
        </motion.div>
      )}

      {/* TABS */}
      <div className="flex gap-4 mb-8 border-b border-black/10">
        <button
          onClick={() => setActiveTab("pending")}
          className={`py-3 px-4 text-sm uppercase tracking-widest transition-colors ${
            activeTab === "pending"
              ? "border-b-2 border-black text-black"
              : "text-black/60 hover:text-black"
          }`}
        >
          Pending ({pending.length})
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`py-3 px-4 text-sm uppercase tracking-widest transition-colors ${
            activeTab === "approved"
              ? "border-b-2 border-black text-black"
              : "text-black/60 hover:text-black"
          }`}
        >
          Approved ({approved.length})
        </button>
      </div>

      {/* PENDING TAB */}
      {activeTab === "pending" && (
        <div className="space-y-4">
          {pending.length === 0 ? (
            <p className="text-sm text-black/60 py-8">No pending requests</p>
          ) : (
            pending.map((admin) => (
              <motion.div
                key={admin.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-black/10 p-6 flex flex-col md:flex-row md:justify-between md:items-start gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-serif text-[16px] mb-1">
                    {admin.name}
                  </h3>
                  <p className="text-sm text-black/60 mb-3">{admin.email}</p>
                  <p className="text-xs text-black/50">
                    Registered:{" "}
                    {admin.createdAt
                      ? new Date(admin.createdAt.toDate()).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      handleApprove(admin.id, admin.name, admin.email)
                    }
                    disabled={actionLoading === admin.id}
                    className="px-6 py-2 bg-black text-white text-xs uppercase tracking-widest hover:bg-black/80 transition disabled:opacity-50"
                  >
                    {actionLoading === admin.id ? "..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleReject(admin.id, admin.name)}
                    disabled={actionLoading === admin.id}
                    className="px-6 py-2 border border-black text-xs uppercase tracking-widest hover:bg-black/5 transition disabled:opacity-50"
                  >
                    {actionLoading === admin.id ? "..." : "Reject"}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* APPROVED TAB */}
      {activeTab === "approved" && (
        <div className="space-y-4">
          {approved.length === 0 ? (
            <p className="text-sm text-black/60 py-8">No approved admins yet</p>
          ) : (
            approved.map((admin) => (
              <motion.div
                key={admin.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-black/10 p-6 flex flex-col md:flex-row md:justify-between md:items-start"
              >
                <div>
                  <h3 className="font-serif text-[16px] mb-1">
                    {admin.name}
                  </h3>
                  <p className="text-sm text-black/60 mb-3">{admin.email}</p>
                  <p className="text-xs text-black/50">
                    Approved:{" "}
                    {admin.updatedAt
                      ? new Date(admin.updatedAt.toDate()).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div className="text-xs text-green-700 font-medium mt-4 md:mt-0">
                  ✓ Active Admin
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
