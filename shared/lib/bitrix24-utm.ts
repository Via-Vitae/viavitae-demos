/**
 * Bitrix24 UTM — capture and forward UTM parameters to CRM deal source.
 *
 * When a visitor arrives with UTM parameters (?utm_source=...&utm_medium=...),
 * these are captured and forwarded to Bitrix24 when the assessment is submitted.
 *
 * @packageDocumentation
 */

export interface UTMParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

/** Extract UTM parameters from the current URL. */
export function captureUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    utmTerm: params.get("utm_term") ?? undefined,
    utmContent: params.get("utm_content") ?? undefined,
  };
}

/** Store UTM params in sessionStorage for cross-page persistence. */
export function storeUTMParams(params: UTMParams): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("vv_utm", JSON.stringify(params));
}

/** Retrieve stored UTM params from sessionStorage. */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("vv_utm") ?? "{}");
  } catch {
    return {};
  }
}
