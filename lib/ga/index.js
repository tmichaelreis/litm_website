// Log pageview
export const pageview = (url) => {
  window.gtag("config", process.env.GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};

// Log specific event
export const event = ({ action, params }) => {
  if (process.browser) {
    window.gtag("event", action, params);
  }
};
