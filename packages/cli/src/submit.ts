export async function submitResult(
  baseUrl: string,
  aiPrompt: string,
  answers: number[]
): Promise<string> {
  const url = `${baseUrl}/api/results`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ aiPrompt, answers }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      `Failed to submit results (${response.status}): ${(body as any).error || response.statusText}`
    );
  }

  const data = await response.json() as { status: string; resultUrl?: string };
  if (data.status !== 'success' || !data.resultUrl) {
    throw new Error('Unexpected response from server');
  }

  return data.resultUrl;
}
