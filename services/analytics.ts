
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  // Console logging for verification
  console.debug(`[LV3-ANALYTICS] Event: ${eventName}`, params);

  // Standard GA4 event firing
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, params);
  }
};

export const trackTimeOnSection = (sectionId: string, durationInMs: number) => {
  trackEvent('section_view_time', {
    section_id: sectionId,
    duration_seconds: Math.floor(durationInMs / 1000)
  });
};
