export function checkForChanges(id: string): boolean {
  if (typeof document === 'undefined') return true

  const element = document.querySelector(`.css${id}`)

  if (element) return false

  return true
}

export function addCss(css: string, id: string, element?: HTMLElement): void {
  if (typeof document === 'undefined') return

  const head = document.head
  const style = document.createElement('style')

  // Add stylesheet
  head.appendChild(style)
  style.appendChild(document.createTextNode(css))

  // Add class to element
  element?.classList.add(`.${id}`)
}

function camelCaseToHyphen(string: string): string {
  if (string.includes('-')) return string
  return string.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
}

export function propertyToCss(
  property: string,
  value: string | number
): string {
  return `${camelCaseToHyphen(property)}:${value};`
}
