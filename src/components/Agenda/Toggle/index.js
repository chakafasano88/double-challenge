// @flow

import React from 'react'

import style from './style'

/**
 * Agenda toggle component
 */

type tProps = {
  options: Array,
}

export default ({ onChange, checked }: tProps) => (
  <div>
    <label className={style.switch}>
      <input checked={checked} type="checkbox" onChange={onChange} />
      <span className={style.slider}></span>
    </label>
  </div>
)
