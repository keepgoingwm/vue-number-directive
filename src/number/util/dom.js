import { error, warn } from './log'

const InputTagList = ['INPUT', 'TEXTAREA']
const AllowedInputType = ['number', 'text', 'tel', 'hidden']
const AllowedTagList = [
  'b',
  'caption',
  'cite',
  'code',
  'const',
  'dd',
  'del',
  'div',
  'dfn',
  'dt',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ins',
  'kdb',
  'label',
  'li',
  'option',
  'output',
  'p',
  'q',
  's',
  'sample',
  'span',
  'strong',
  'td',
  'th',
  'u'
]
const ElementUIClassList = ['el-input__inner']

function isInputLike(el) {
  return InputTagList.includes(el.tagName) || el.contentEditable
}

function getChildInputs(el) {
  let res = [],
    child

  if (isInputLike(el)) {
    res.push(el)
  }

  if (el.children) {
    res = res.concat(
      Array.prototype.reduce.call(
        el.children,
        (arr, child) => {
          return arr.concat(getChildInputs(child))
        },
        []
      )
    )
  }

  return res
}

function handleElementUI(inputDom, vnode) {
  if (
    ElementUIClassList.some(c =>
      Array.prototype.includes.call(inputDom.classList, c)
    )
  ) {
    if (vnode.data.model && vnode.data.model.value !== undefined) {
      inputDom.value = vnode.data.model.value
    }
  }
}

export const getInputDom = (el, vnode) => {
  let inputDom = getChildInputs(el)
  if (!inputDom.length) {
    error('no input like element found')
  } else if (inputDom.length > 1) {
    warn('more than one input like element found, use first')
  }
  inputDom = inputDom[0]
  handleElementUI(el, inputDom, vnode)

  if (inputDom.tagName === 'INPUT') {
    if (
      inputDom.getAttribute('type') &&
      !AllowedInputType.includes(inputDom.getAttribute('type'))
    ) {
      error('wrong INPUT element type')
    }
  } else if (inputDom.tagName === 'TEXTAREA') {

  } else if (!inputDom.contentEditable) {
    if (AllowedTagList.includes(inputDom.tagName.toLowerCase)) {
      // warn('once use to format number')
    } else {
      error('wrong element type, or should be contenteditable')
    }
  }

  return inputDom
}

export const unshiftEventHandler = (el, eventType, handler) => {
  el.addEventListener(eventType, handler)
  // let handlerArr = getEventListeners(el)[eventType]
  // console.log(handlerArr)

  // if (handlerArr) {
  //   handlerArr.unshift(handler)
  // } else {
  //   el.addEventListener(eventType, handler)
  // }
}

export const getDomValue = el => {
  return InputTagList.includes(el.tagName) ? el.value : el.innerText
}

export const setDomValue = (el, value) => {
  InputTagList.includes(el.tagName)
    ? (el.value = value)
    : (el.innerText = value)
}
