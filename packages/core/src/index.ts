import {
  addCss,
  checkForChanges,
  propertyToCss,
} from './utils'

type CSSObject = {
  [key: string]: string | number | CSSObject
}

/**
 * Main function that creates CSS with a class,
 * adds the class to element and styles to document
 *
 * @param styles Object of CSS properties
 * @param element HTML element to apply the properties to
 *
*/
export function css(styles: CSSObject, element?: HTMLElement): void {
  const id = classId(styles)

  if (!checkForChanges(id)) return

  addCss(objectToCss(styles, '.' + id), id, element)
}

/**
 * Loop that takes CSS object and converts it to a string
 *
 * @param object Object of CSS properties
 * @param identifier Starting identifier to wrap the properties in
 *
*/
export function objectToCss(object: CSSObject, identifier: string): string {
  let baseStyles = `${identifier}{`
  let otherStyles = ''

  for (const property in object) {
    const value = object[property]
    const startsWith = property.substring(0,1)

    if (typeof value === 'string' || typeof value === 'number') {
      // Base style
      baseStyles += propertyToCss(property, value)
    } else if (startsWith.match(/^[a-zA-Z0-9.]$/)) {
      otherStyles += objectToCss(value, `${identifier} ${property}`)
    } else {
      otherStyles += objectToCss(value, `${identifier}${property}`)
    }
  }

  baseStyles += '}'

  return baseStyles + otherStyles
}

/**
 * Creates a unique hashed class name based on the CSS styles
 *
 * @param styles Object of CSS properties
 *
*/
export function classId(styles: CSSObject): string {
  const input = typeof styles === 'string' ? styles : JSON.stringify(styles)

  let hash = 0
  const len = input.length
  for (let i = 0; i < len; i++) {
    hash  = ((hash << 5) - hash) + input.charCodeAt(i)
    hash |= 0 // to 32bit integer
  }
  return `css${hash}`
}
