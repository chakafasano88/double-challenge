// @flow

/**
 * Run a function every X milliseconds.
 * Return a disposer function to cancel the interval.
 */

const runEvery = (ms: number, fnc: Function): Function => (
  clearInterval.bind(null, setInterval(fnc, ms))
)

export default runEvery
