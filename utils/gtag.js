export const GA_TRACKING_ID = 'G-4FJRF0S0MW'

const inIframe = () => {
  try {
    return window.self !== window.top
  } catch (e) {
    return true
  }
}

export const canIncludeScript =
  typeof window !== 'undefined' &&
  window.location.hostname === 'covid19.datelazi.ro' &&
  !inIframe()

export const pageview = (url) => {
  if (!canIncludeScript) {
    return
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
