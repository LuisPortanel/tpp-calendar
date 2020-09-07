// @flow
import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CalendarTable from '../components/CalendarTable'

const Home = () => <h2>Select a country on the nav menu</h2>
const FourOFour = () => <h1>404</h1>

const Routes = () => {
  const location = useLocation()

  return (<>
    <Helmet>
      <title>TPP Calendar{ location.pathname ? ` - ${location.pathname}` : '' }</title>
    </Helmet>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/:countryCode" component={CalendarTable} />
      <Route component={FourOFour} />
    </Switch>

  </>)
}

export default Routes
