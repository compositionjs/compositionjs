/**
 * @jest-environment jsdom
 */

import { css, objectToCss, classId } from '.'

describe('CSS', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="element"></div>'
  })

  it('should create basic styles', () => {
    const styles = {
      backgroundColor: 'white',
      color: 'red',
      padding: '5px',
    }

    const id = '.' + classId(styles)

    const generated = objectToCss(styles, id)

    expect(generated)
      .toEqual('.css1276968294{background-color:white;color:red;padding:5px;}')
  })

  it('should create attribute styles', () => {
    const styles = {
      color: 'red',
      ':hover': {
        color: 'green',
      }
    }

    const id = '.' + classId(styles)

    const generated = objectToCss(styles, id)

    expect(generated)
      .toEqual('.css1137005372{color:red;}.css1137005372:hover{color:green;}')
  })

  it('should create nested styles', () => {
    const styles = {
      color: 'red',
      'ul': {
        listStyle: 'none',
        'li': {
          padding: '0',
        }
      }
    }

    const id = '.' + classId(styles)

    const generated = objectToCss(styles, id)

    expect(generated)
      .toEqual(
        // eslint-disable-next-line max-len
        '.css1164953048{color:red;}.css1164953048 ul{list-style:none;}.css1164953048 ul li{padding:0;}'
      )
  })

  it('should create a complex mixture of styles', () => {
    const styles = {
      color: 'red',
      ':hover': {
        color: 'blue',
        a: {
          color: 'orange',
          display: 'flex',
        }
      },
      'ul': {
        listStyle: 'none',
        '> li': {
          padding: '0',
        },
        'li': {
          padding: '5px',
          a: {
            textDecoration: 'underline',
            '[target="_blank"]': {
              textDecoration: 'none',
            }
          }
        }
      }
    }

    const id = '.' + classId(styles)

    const generated = objectToCss(styles, id)

    expect(generated)
      .toEqual(
        // eslint-disable-next-line max-len
        '.css1708629705{color:red;}.css1708629705:hover{color:blue;}.css1708629705:hover a{color:orange;display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;}.css1708629705 ul{list-style:none;}.css1708629705 ul> li{padding:0;}.css1708629705 ul li{padding:5px;}.css1708629705 ul li a{text-decoration:underline;}.css1708629705 ul li a[target="_blank"]{text-decoration:none;}'
      )
  })

  it('should create styles for hyphenated and camelcase', () => {
    const styles = {
      backgroundColor: 'red',
      'background-color': 'blue',
    }

    const id = '.' + classId(styles)

    const generated = objectToCss(styles, id)

    expect(generated)
      .toEqual(
        '.css1615912088{background-color:red;background-color:blue;}'
      )
  })

  it('should add class to the element', () => {
    const styles = {
      color: 'red',
    }

    css(styles, document.getElementById('element'))

    expect(
      document.getElementById('element').classList.contains('css-1981024994')
    ).toBeTruthy()
  })

  it('should have a style tag with the given styles', () => {
    const styles = {
      color: 'red',
    }

    css(styles, document.getElementById('element'))

    expect(
      document.getElementById('compositionjs-styles')?.innerHTML
    ).toEqual('.css-1981024994{color:red;}')
  })
})
