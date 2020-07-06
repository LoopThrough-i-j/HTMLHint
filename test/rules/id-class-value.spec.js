const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruldId = 'id-class-value'
const ruleOptionsUnderline = {}
const ruleOptionsDash = {}
const ruleOptionsHump = {}
const ruleOptionsReg = {}

ruleOptionsUnderline[ruldId] = ['warn', { mode: 'underline' }]
ruleOptionsDash[ruldId] = ['error', { mdoe: 'dash' }]
ruleOptionsHump[ruldId] = ['error', { mode: 'hump' }]
ruleOptionsReg[ruldId] = [
  'error',
  {
    regId: /^_[a-z\d]+(-[a-z\d]+)*$/,
    message: 'Id and class value must meet regexp',
  },
]

describe(`Rules: ${ruldId}`, () => {
  it('Id and class value be not lower case and split by underline should result in an error', () => {
    const code = '<div id="aaaBBB" class="ccc-ddd">'
    const messages = HTMLHint.verify(code, { rules: ruleOptionsUnderline })
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be('id-class-value')
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(5)
    expect(messages[0].type).to.be('warning')
    expect(messages[1].rule.id).to.be('id-class-value')
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(17)
    expect(messages[1].type).to.be('warning')
  })

  it('Id and class value be lower case and split by underline should not result in an error', () => {
    const code = '<div id="aaa_bbb" class="ccc_ddd">'
    const messages = HTMLHint.verify(code, { rules: ruleOptionsUnderline })
    expect(messages.length).to.be(0)
  })

  it('Id and class value be not lower case and split by dash should result in an error', () => {
    const code = '<div id="aaaBBB" class="ccc_ddd">'
    const messages = HTMLHint.verify(code, {
      rules: {
        'id-class-value': ['error', 'dash'],
      },
    })
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be('id-class-value')
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(5)
    expect(messages[1].rule.id).to.be('id-class-value')
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(17)
  })

  it('Id and class value be lower case and split by dash should not result in an error', () => {
    const code = '<div id="aaa-bbb" class="ccc-ddd">'
    const messages = HTMLHint.verify(code, { rules: ruleOptionsDash })
    expect(messages.length).to.be(0)
  })

  it('Id and class value be not meet hump style should result in an error', () => {
    const code = '<div id="aaa_bb" class="ccc-ddd">'
    const messages = HTMLHint.verify(code, { rules: ruleOptionsHump })
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be('id-class-value')
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(5)
    expect(messages[1].rule.id).to.be('id-class-value')
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(17)
  })

  it('Id and class value be meet hump style should not result in an error', () => {
    const code = '<div id="aaaBbb" class="cccDdd">'
    const messages = HTMLHint.verify(code, { rules: ruleOptionsHump })
    expect(messages.length).to.be(0)
  })

  it('Id and class value be not meet regexp should result in an error', () => {
    const code = '<div id="aa-bb" class="ccc-ddd">'
    const messages = HTMLHint.verify(code, { rules: ruleOptionsReg })
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be('id-class-value')
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(5)
    expect(messages[1].rule.id).to.be('id-class-value')
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(16)
  })

  it('Id and class value be meet regexp should not result in an error', () => {
    const code = '<div id="_aaa-bb" class="_ccc-ddd">'
    const messages = HTMLHint.verify(code, { rules: ruleOptionsReg })
    expect(messages.length).to.be(0)
  })
})
