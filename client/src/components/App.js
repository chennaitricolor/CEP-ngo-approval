import React from 'react';
import { Layout } from "antd";
import Dashboard from './Dashboard';

import '../styles/App.css';
import 'antd/dist/antd.css';


const { Header, Footer, Content } = Layout;


class App extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <span className="header">
            <span>Namma Chennai - NGO Approver</span>
          </span>
        </Header>
        <Content className="App">
          <div className="table-pane">
            <Dashboard/>
          </div>
        </Content>
        <Footer></Footer>
      </Layout>

    )
  }
}

export default App;
