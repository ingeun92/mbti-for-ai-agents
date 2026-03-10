export interface SubmitMetadata {
  rawAnswers?: number[];
  modelProvider?: string;
  modelName?: string;
  modelVersion?: string;
  agentName?: string;
  temperature?: number;
}

export async function submitResult(
  baseUrl: string,
  aiPrompt: string,
  answers: number[],
  metadata?: SubmitMetadata
): Promise<string> {
  const url = `${baseUrl}/api/results`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      aiPrompt,
      answers,
      rawAnswers: metadata?.rawAnswers ?? answers,
      ...(metadata?.modelProvider && { modelProvider: metadata.modelProvider }),
      ...(metadata?.modelName && { modelName: metadata.modelName }),
      ...(metadata?.modelVersion && { modelVersion: metadata.modelVersion }),
      ...(metadata?.agentName && { agentName: metadata.agentName }),
      ...(metadata?.temperature != null && { temperature: metadata.temperature }),
    }),
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
