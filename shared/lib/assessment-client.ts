/**
 * Assessment Client — typed client for viavitae-api /v1/assessment.
 *
 * Posts assessment data from the MakeItMineWizard to viavitae-api, which
 * creates a Bitrix24 deal with UTM tracking. In CI, the api-mock service
 * in docker-compose handles this endpoint.
 *
 * @packageDocumentation
 */

export interface AssessmentPayload {
  templateSlug: string;
  tier: string;
  organisationName: string;
  contactEmail: string;
  contactPhone?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface AssessmentResponse {
  dealId: string;
  bookingUrl: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/**
 * Submit an assessment to viavitae-api.
 *
 * Returns a Cal.com booking URL on success.
 */
export async function submitAssessment(payload: AssessmentPayload): Promise<AssessmentResponse> {
  const res = await fetch(`${API_BASE}/v1/assessment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Assessment failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<AssessmentResponse>;
}
