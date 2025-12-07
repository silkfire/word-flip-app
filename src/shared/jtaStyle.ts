import { Style } from 'javascript-time-ago';

const style: Style = {
  round: 'floor',
  labels: ['tiny'],
  steps: [
    {
      formatAs: 'now',
    },
    {
      formatAs: 'minute',
    },
    {
      formatAs: 'hour',
    },
    {
      formatAs: 'day',
    },
    {
      formatAs: 'month',
    },
    {
      formatAs: 'year',
    },
  ],
};

export default style;
