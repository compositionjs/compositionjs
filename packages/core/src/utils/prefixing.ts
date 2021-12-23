export function addPrefixes(property: string, value: string | number): string {
  let styles = ''
  for (const key in properties) {
    const splitKey = key.split(':')

    if (splitKey.length === 1 && key === property) {
      // Matches a property only
      for (let i = 0; i < properties[key].prefixes.length; i++) {
        const changeType = properties[key].changeType
        const prefix = properties[key].prefixes[i]

        styles += doPrefixing(prefix, property, value, changeType)
      }
    } else if (key === `${property}:${value}`) {
      // Matches both property and value
      for (let i = 0; i < properties[key].prefixes.length; i++) {
        const changeType = properties[key].changeType
        const prefix = properties[key].prefixes[i]

        styles += doPrefixing(prefix, property, value, changeType)
      }
    }
  }
  return styles
}

function doPrefixing(
  prefix: string,
  property: string,
  value: string | number,
  type?: PrefixChangeType,
): string {
  if (type === 'value') {
    return prefixValue(prefix, property, value)
  } else if (type === 'replaceValue') {
    return replaceValue(prefix, property)
  }
  return prefixProperty(prefix, property, value)
}

function prefixProperty(
  prefix: string,
  property: string,
  value: string | number,
): string {
  return `-${prefix}-${property}:${value};`
}

function prefixValue(
  prefix: string,
  property: string,
  value: string | number,
): string {
  return `${property}:-${prefix}-${value};`
}

function replaceValue(prefix: string, property: string): string {
  return `${property}:-${prefix};`
}

type PrefixChangeType = 'property' | 'value' | 'replaceValue'

type PrefixProperties = {
  [key: string]: {
    changeType?: PrefixChangeType
    prefixes: string[]
    includes?: boolean
  }
}

const properties: PrefixProperties = {
  animation: {
    prefixes: ['webkit'],
  },
  appearance: {
    prefixes: ['webkit', 'moz'],
  },
  'background-clip:text': {
    prefixes: ['webkit'],
  },
  'box-reflect': {
    prefixes: ['webkit'],
  },
  'column-count': {
    prefixes: ['webkit', 'moz'],
  },
  'column-gap': {
    prefixes: ['webkit', 'moz'],
  },
  'column-rule': {
    prefixes: ['webkit', 'moz'],
  },
  'display:flex': {
    changeType: 'replaceValue',
    prefixes: ['webkit-box', 'ms-flexbox', 'webkit-flex'],
  },
  'display:grid': {
    changeType: 'value',
    prefixes: ['ms'],
  },
  flex: {
    prefixes: ['webkit-box', 'ms', 'webkit'],
  },
  'flow-from': {
    prefixes: ['webkit', 'ms'],
  },
  'flow-into': {
    prefixes: ['webkit', 'ms'],
  },
  'font-feature-settings': {
    prefixes: ['webkit', 'moz'],
  },
  hyphens: {
    prefixes: ['webkit', 'moz', 'ms'],
  },
  'mask-image': {
    prefixes: ['webkit'],
  },
  'object-fit': {
    prefixes: ['o'],
  },
  transform: {
    prefixes: ['webkit', 'ms'],
  },
  'word-break': {
    prefixes: ['ms'],
  },
}
