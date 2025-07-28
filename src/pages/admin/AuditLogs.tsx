import React, { useEffect, useState } from "react";
// Card is not a real component, use a styled div instead
import { LogIn, Search, Filter } from "lucide-react";
import adminAPI from "@services/adminAPI";

interface AuditLog {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  ip: string;
}

const actionOptions = [
  { value: "ALL", label: "All Actions" },
  { value: "LOGIN", label: "Login" },
  { value: "LOGOUT", label: "Logout" },
  { value: "CREATE", label: "Create" },
  { value: "UPDATE", label: "Update" },
  { value: "DELETE", label: "Delete" },
  { value: "ADMIN", label: "Admin Action" },
];

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("ALL");

  useEffect(() => {
    fetchLogs();
  }, [action, search]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      // Replace with real API call
      const data = await adminAPI.getAuditLogs({ action, search });
      setLogs(data);
    } catch (e) {
      setLogs([]);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <LogIn className="w-6 h-6 text-blue-600" /> Audit Logs
      </h1>
      <div className="mb-4 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded shadow">
        <div className="flex gap-2 w-full md:w-auto">
          <span className="relative w-64">
            <span className="absolute left-2 top-2.5 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by user or details..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-64 pl-8 pr-2 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </span>
          <span className="relative w-48">
            <span className="absolute left-2 top-2.5 text-gray-400">
              <Filter className="w-4 h-4" />
            </span>
            <select
              value={action}
              onChange={e => setAction(e.target.value)}
              className="w-48 pl-8 pr-2 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {actionOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </span>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mt-2">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <span className="w-6 h-6 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin inline-block"></span>
          </div>
        ) : (
          <table className="w-full border rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Timestamp</th>
                <th className="p-2">User</th>
                <th className="p-2">Action</th>
                <th className="p-2">Details</th>
                <th className="p-2">IP</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-8">
                    No logs found.
                  </td>
                </tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="p-2">{log.user}</td>
                    <td className="p-2">{log.action}</td>
                    <td className="p-2 max-w-xs truncate" title={log.details}>{log.details}</td>
                    <td className="p-2">{log.ip}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default AuditLogs;
