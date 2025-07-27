export async function callAI(input: string) {
  const res = await fetch("/api/hello", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch AI response");
  }
  
  return res.json();
} 