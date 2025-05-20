const API_URL = "https://mywallet-0lxd.onrender.com";

export async function signUp({ name, email, password }: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_URL}/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function signIn({ email, password }: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw await res.json();
  return res.json(); // deve retornar { token }
}

export async function getTransactions(token: string, page = 1) {
  const res = await fetch(`${API_URL}/transactions?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function createTransaction({ value, description, type, token }: { value: number; description: string; type: "deposit" | "withdraw"; token: string }) {
  const res = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ value, description, type })
  });
  if (!res.ok) throw await res.json();
  return res.json();
} 