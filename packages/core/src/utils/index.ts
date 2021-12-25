import { addPrefixes } from './prefixing'

export function checkForChanges(id: string): boolean {
  if (typeof document === 'undefined') return true

  const element = document.querySelector(`.css${id}`)

  if (element) return false

  return true
}

export function addCss(
  css: string,
  id: string,
  element?: HTMLElement
): string | void {
  if (typeof document === 'undefined') return

  const styleId = 'compositionjs-styles'

  const head = document.head
  const style = document.createElement('style')

  style.setAttribute('id', styleId)

  // Add stylesheet
  head.appendChild(style)
  style.appendChild(document.createTextNode(css))

  if (element) {
    // Add class to element
    element?.classList.add(id)
  } else {
    return id
  }
}

function camelCaseToHyphen(string: string): string {
  if (string.includes('-')) return string
  return string.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
}

export function propertyToCss(
  property: string,
  value: string | number
): string {
  const newProperty = camelCaseToHyphen(property)

  let prefixes = addPrefixes(newProperty, value)
  prefixes += `${newProperty}:${value};`

  return prefixes
}
