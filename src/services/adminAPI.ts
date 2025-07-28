// --- Admin signup ---
export async function adminSignup(data: { email: string; password: string; name: string }) {
  const res = await fetch('/api/admin/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to sign up');
  return await res.json();
}
// --- Admin login ---
export async function adminLogin(credentials: { email: string; password: string }) {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('Failed to login');
  return await res.json();
}
// --- Existing admin functions above ---

// --- Add stubs for missing admin API functions used in admin pages ---
export async function getAuditLogs(params: { action: string; search: string }) {
  const q = [];
  if (params.action && params.action !== 'ALL') q.push(`action=${encodeURIComponent(params.action)}`);
  if (params.search) q.push(`search=${encodeURIComponent(params.search)}`);
  const query = q.length ? `?${q.join('&')}` : '';
  const res = await fetch(`/api/admin/audit-logs${query}`);
  if (!res.ok) throw new Error('Failed to fetch audit logs');
  return await res.json();
}

export async function getBadges() {
  // TODO: Replace with real API call
  return [
    { id: 1, name: "Wildlife Hero", description: "Saved 10 animals", icon: "/public/app-icon-512.svg" },
  ];
}

export async function createBadge(badge: any) { return badge; }
export async function updateBadge(id: number, badge: any) { return badge; }
export async function deleteBadge(id: number) { return true; }

export async function getDatabaseTables() {
  // TODO: Replace with real API call
  return [
    { name: "users", rows: 100, lastUpdated: new Date().toISOString() },
    { name: "badges", rows: 20, lastUpdated: new Date().toISOString() },
  ];
}

export async function getQuizzes() {
  // TODO: Replace with real API call
  return [
    { id: 1, title: "Wildlife Basics", questions: 5, createdAt: new Date().toISOString() },
  ];
}
export async function createQuiz(quiz: any) { return quiz; }
export async function updateQuiz(id: number, quiz: any) { return quiz; }
export async function deleteQuiz(id: number) { return true; }

export async function getSecuritySettings() {
  // TODO: Replace with real API call
  return { twoFactorEnabled: true, passwordPolicy: "Min 8 chars", lastAudit: new Date().toISOString() };
}
export async function updateSecuritySettings(settings: any) { return settings; }


// --- Real backend implementation for admin user CRUD ---
export async function getUsers(params: { search: string }) {
  const q = params?.search ? `?search=${encodeURIComponent(params.search)}` : '';
  const res = await fetch(`/api/admin/users${q}`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return await res.json();
}
export async function createUser(user: any) {
  const res = await fetch('/api/admin/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return await res.json();
}
export async function updateUser(id: number, user: any) {
  const res = await fetch(`/api/admin/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return await res.json();
}
export async function deleteUser(id: number) {
  const res = await fetch(`/api/admin/users/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete user');
  return true;
}

// --- Default export for compatibility with import adminAPI from '@services/adminAPI' ---
export default {
  adminSignup,
  adminLogin,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAuditLogs,
  getBadges,
  createBadge,
  updateBadge,
  deleteBadge,
  getDatabaseTables,
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getSecuritySettings,
  updateSecuritySettings,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
// Replace BASE_URL with your real backend API endpoint
const BASE_URL = '/api/admins';

export async function getAdmins() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch admins');
  return res.json();
}

export async function createAdmin(admin: any) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(admin),
  });
  if (!res.ok) throw new Error('Failed to create admin');
  return res.json();
}

export async function updateAdmin(id: number, admin: any) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(admin),
  });
  if (!res.ok) throw new Error('Failed to update admin');
  return res.json();
}

export async function deleteAdmin(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete admin');
  return true;
}
