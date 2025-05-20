const API_URL = "https://mywallet-0lxd.onrender.com";

function handleError(res: Response) {
  return res.text().then(text => {
    try {
      throw JSON.parse(text);
    } catch {
      throw new Error(text);
    }
  });
}

export async function signUp({ name, email, password }: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_URL}/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) return handleError(res);
  return res.json();
}

export async function signIn({ email, password }: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) return handleError(res);
  return res.json(); // deve retornar { token }
}

export async function getTransactions(token: string, page = 1) {
  const res = await fetch(`${API_URL}/transactions?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) return handleError(res);
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
  if (!res.ok) return handleError(res);
  return res.json();
} 