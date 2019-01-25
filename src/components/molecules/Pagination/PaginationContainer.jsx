
import { compose, withStateHandlers, withPropsOnChange, withState } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import Pagination from './Pagination'

const nullConditionalFn = ({ next, prev, numPages }) => !(prev || next) || numPages === 1

export default compose(
  withStateHandlers(({ maxItems = 6, last }) => ({
    padded: Math.floor(maxItems / 2),
    numPages: last ? parseInt(last['page'], 10) : null,
    maxItems
  }), {
    setNumPages: (props) => (payload) => ({ numPages: payload })
  }),
  withState('startPage', 'setStartPage', ({ pageNumber, padded }) => (pageNumber - padded > 1) ? (pageNumber - padded) : 1),
  withState('endPage', 'setEndPage', ({ startPage, maxItems, numPages, pageNumber }) => (startPage + maxItems - 1) >= numPages ? (numPages || pageNumber) : startPage + maxItems - 1),
  withPropsOnChange(['last'], ({ setNumPages, last }) => {
    last
      ? setNumPages(parseInt(last['page'], 10))
      : setNumPages(null)
  }),
  withPropsOnChange(['pageNumber'], ({ pageNumber, numPages, padded, setStartPage, setEndPage, startPage, endPage, maxItems }) => {
    if (numPages - pageNumber < padded - 1) {
      let newStart = endPage - maxItems + 1
      newStart > 1 && setStartPage(newStart)
    }
  }),
  withMaybe(nullConditionalFn)
)(Pagination)
