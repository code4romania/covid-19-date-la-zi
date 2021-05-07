export const getSelectedState = (labels) => {
  return labels.reduce((o, key) => ({ ...o, [key]: true }), {})
}

export const getZoomStartPercentage = (dates) => {
  const datesCount = dates?.length
  const daysToShow = 14
  return datesCount ? ((datesCount - daysToShow) * 100) / datesCount : 0
}

export const getLegendIcon = (selected) => {
  return selected
    ? 'path://M10.6667 0H1.33333C0.593333 0 0 0.6 0 1.33333V10.6667C0 11.4 0.593333 12 1.33333 12H10.6667C11.4067 12 12 11.4 12 10.6667V1.33333C12 0.6 11.4067 0 10.6667 0ZM4.66667 9.33333L1.33333 6L2.27333 5.06L4.66667 7.44667L9.72667 2.38667L10.6667 3.33333L4.66667 9.33333Z'
    : 'path://M10.6667 1.33333V10.6667H1.33333V1.33333H10.6667ZM10.6667 0H1.33333C0.6 0 0 0.6 0 1.33333V10.6667C0 11.4 0.6 12 1.33333 12H10.6667C11.4 12 12 11.4 12 10.6667V1.33333C12 0.6 11.4 0 10.6667 0Z'
}

export const getLegendLabels = (labels, selected) => {
  return labels.map((label) => ({
    name: label,
    icon: getLegendIcon(selected[label]),
  }))
}
