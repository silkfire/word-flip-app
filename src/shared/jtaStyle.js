import defaultStyle from 'javascript-time-ago/commonjs/style/miniMinuteNow'

const { default: { steps } } = defaultStyle
const JTADefaultStyle = {
  round: 'floor',
  labels: ['tiny'],
  steps,
}

export default JTADefaultStyle
