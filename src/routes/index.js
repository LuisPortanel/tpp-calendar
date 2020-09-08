// @flow
import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Calendar from '../components/Calendar'
import { countryNameByCode } from '../utils'

const Home = () => <h2>Select a country on the nav menu</h2>
const FourOFour = () => <h1>404</h1>

const Routes = () => {
  const location = useLocation()

  return (<>
    <Helmet>
      <title>TPP Calendar{ location.pathname ? ` - ${countryNameByCode(location.pathname.substring(1))}` : '' }</title>
    </Helmet>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/:countryCode(us|ca|ar)" component={Calendar} />
      <Route component={FourOFour} />
    </Switch>

  </>)
}

export default Routes
