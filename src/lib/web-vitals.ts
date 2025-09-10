import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

// Send Web Vitals to Google Analytics
function sendToGoogleAnalytics(metric: {
  name: string;
  value: number;
  id: string;
}) {
  // Only send if Google Analytics is available
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', metric.name, {
      value: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value
      ),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
      custom_parameter_1: window.location.pathname,
    });
  }
}

// Initialize Web Vitals tracking
export function initWebVitals() {
  // Only run in browser
  if (typeof window === 'undefined') return;

  try {
    onCLS(sendToGoogleAnalytics);
    onINP(sendToGoogleAnalytics);
    onFCP(sendToGoogleAnalytics);
    onLCP(sendToGoogleAnalytics);
    onTTFB(sendToGoogleAnalytics);
  } catch (error) {
    console.warn('Web Vitals tracking failed:', error);
  }
}

// Export individual metrics for custom usage
export { onCLS, onFCP, onINP, onLCP, onTTFB };
