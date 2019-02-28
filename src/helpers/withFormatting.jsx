
// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { withRouter } from 'react-router'
import { compose, withHandlers } from 'recompose'
import { parseNumber, formatNumber } from 'libphonenumber-js'

export default compose(
  withRouter,
  withHandlers({
    parsePhoneNumber: () => (phone) => {
      if (!phone) return ''
      const parsed = parseNumber(phone, 'US')
      return parsed && parsed.phone ? parsed.phone : phone
    },
    formatPhoneNumber: () => (phone) => {
      if (!phone) return ''
      return formatNumber(phone, 'US', 'National')
    },
    formatCurrency: () => (value, precision = 2) => {
      const preciseValue = parseFloat(value).toFixed(precision)
      if (isNaN(preciseValue)) {
        return value
      }
      const currency = preciseValue ? preciseValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''
      return `$${currency}`
    },
    formatExtLink: () => (url) => {
      const protocolCheck = /^(http(s)?:)?\/\//
      const defaultProtocal = 'http://'
      return protocolCheck.test(url) ? url : defaultProtocal.concat(url)
    },
    cleanObjectsFromDom: () => (props) => {
      const sanitizedProps = Object.keys(props).reduce((newProps, key) => {
        if (typeof props[key] !== 'object') {
          newProps[key] = props[key]
        }
        return newProps
      }, {})

      return sanitizedProps
    },
    sanitizeFileName: () => (fileName = '') => {
      const sanitizedName = fileName.replace(/[|&;$%@"<>()+#,' ']/g, '')
      return sanitizedName
    }
  })
)
