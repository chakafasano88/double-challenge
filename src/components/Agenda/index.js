// @flow

import React, { Component } from 'react'
import { DateTime } from 'luxon'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'

import greeting from 'lib/greeting'

import type Account from 'src/models/Account'

import List from './List'
import EventCell from './EventCell'
import DropdownMenu from './DropdownMenu'

import style from './style'

/**
 * Agenda component
 * Displays greeting (depending on time of day)
 * and list of calendar events
 */

type tProps = {
  account: Account
}

@inject('account')
@observer
class Agenda extends Component<tProps> {

  state = {
    calendars: []
  };

  componentWillMount() {
    const { calendars } = this.props.account;
    this.setState({ calendars: [...calendars] })
  }
  /**
   * Return events from all calendars, sorted by date-time.
   * Returned objects contain both Event and corresponding Calendar
   */
  @computed
  get events (): Array<{ calendar: Calendar, event: Event }> {
    const events = this.props.account.calendars
      .map((calendar) => (
        calendar.events.map((event) => (
          { calendar, event }
        ))
      ))
      .flat()

    // Sort events by date-time, ascending
    events.sort((a, b) => (a.event.date.diff(b.event.date).valueOf()))

    return events
  }

  _filterCalenders = (option) => {
    const { calendars, groupByDeparment } = this.state;
    this.setState({ groupByDeparment: false })

    if(option === 'all') {
      this.props.account.calendars.replace(calendars);
    } else {
      this.props.account.calendars.replace(calendars.filter((e) => e.id === option.id));
    }
  }

  render () {
    const { calendars } = this.state;

    return (
      <div className={style.outer}>
        <div className={style.container}>

          <div className={style.header}>
            <span className={style.title}>
              {greeting(DateTime.local().hour)}
            </span>
            <DropdownMenu
              options={this.state.calendars}
              onClick={this._filterCalenders}
            ></DropdownMenu>
          </div>

          <List>
            {this.events.map(({ calendar, event }) => (
              <EventCell key={event.id} calendar={calendar} event={event} />
            ))}
          </List>

        </div>
      </div>
    )
  }
}

export default Agenda
