export const GA_TRACKING_ID = "UA-160603540-2";

export const pageview = (url) => {
  if (
    typeof window === "undefined" ||
    window.location.hostname !== "datelazi.ro"
  ) {
    return;
  }

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
