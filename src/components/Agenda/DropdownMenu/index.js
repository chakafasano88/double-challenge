// @flow

import React from 'react'

import style from './style'

/**
 * Agenda dropdown menu component
 */

type tProps = {
  options: Array,
  onClick: Function,
  value: string
}

export default ({ options, onClick, value }: tProps) => (
  <div>
    <label className={style.dropdown}>
      <div className={style.ddButton}>
        <span>Filter</span>
      </div>
      <input type="checkbox" className={style.ddInput} />
      <ul className={style.ddMenu}>
        <li onClick={e => onClick('all')}>All</li>
        {options.map((option, i) => (
          <li onClick={e => onClick(option)} value={option.id} key={i}>{option.name}</li>
        ))}
      </ul>
    </label>
  </div>
)
