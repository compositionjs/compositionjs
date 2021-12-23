/**
 * @jest-environment jsdom
 */

import { objectToCss, classId } from '../.'

describe('Prefixing', () => {
  it('should prefix a property', () => {
    const styles = {
      flex: 1,
    }

    const id = '.' + classId(styles)

    const generated = objectToCss(styles, id)

    expect(generated)
      .toEqual(
        '.css2017314884{-webkit-box-flex:1;-ms-flex:1;-webkit-flex:1;flex:1;}'
      )
  })

  it('should prefix a value', () => {
    const styles = {
      display: 'grid',
    }

    const id = '.' + classId(styles)

    const generated = objectToCss(styles, id)

    expect(generated)
      .toEqual(
        '.css130965552{display:-ms-grid;display:grid;}'
      )
  })

  it('should replace a value', () => {
    const styles = {
      display: 'flex',
    }

    const id = '.' + classId(styles)

    const generated = objectToCss(styles, id)

    expect(generated)
      .toEqual(
        // eslint-disable-next-line max-len
        '.css96695331{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;}'
      )
  })
})
