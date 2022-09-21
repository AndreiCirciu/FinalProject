import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { SetAccount } from './components/SetAccount';
import { PortalLayout } from './components/PortalLayout';
import { useNavigate } from 'react-router-dom';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;
    componentDidMount() {
        setTimeout(() => {
            this.props.navigate("/registration");
        }, 5000);
        

    }

  render () {
      return (    <>
        <PortalLayout>
              <Routes>
                  
                    <Route exact path='/' element={<Home/>} />
                    <Route path='/counter' element={<Counter/>} />
                    <Route path='/fetch-data' element={<FetchData/>} />
                    <Route path='/registration' element={<Registration/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/setAccount' element={<SetAccount/>} />
              </Routes>
          </PortalLayout>
              </>

    );
  }
}
export function APPWithRouter(props) {
    const navigate = useNavigate()
    return (<App> navigate={navigate} </App>)
}
