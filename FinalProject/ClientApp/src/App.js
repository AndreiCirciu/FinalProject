import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Sign } from './components/Sign';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { SetAccount } from './components/SetAccount';
import { PortalLayout } from './components/PortalLayout';
import { AdminDashboard } from './components/AdminDashboard';
import { AddMedicine } from './components/AddMedicine';
import { useNavigate } from 'react-router-dom';
import { UpdateMedicine } from './components/UpdateMedicine';
import { DeleteMedicine } from './components/DeleteMedicine';
import { ViewUsers } from './components/ViewUsers';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;
    

  render () {
      return (
          <>       
              <Routes>
                  <Route path='/registration' element={<Registration />} />
                  <Route path='/login' element={<Login />} />             
                  <Route exact path='/' element={<Sign />} />
                  <Route path='/counter' element={<Counter />} />
                  <Route path='/fetch-data' element={<FetchData />} />
                  <Route path='/setAccount' element={<SetAccount />} />
                  <Route path='/adminDashboard' element={<AdminDashboard />} />
                  <Route path='/addMedicine' element={<AddMedicine />} />
                  <Route path='/updateMedicine' element={<UpdateMedicine />} />
                  <Route path='/deleteMedicine' element={<DeleteMedicine />} />
                  <Route path='/viewUsers' element={<ViewUsers />} />

              </Routes>
               
      </>


    );
  }
}
export function APPWithRouter(props) {
    const navigate = useNavigate()
    return (<App> navigate={navigate} </App>)
}
