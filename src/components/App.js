import React from 'react';
import { Layout } from "antd";
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import Dashboard from './Dashboard';

import '../styles/App.css';
import 'antd/dist/antd.css';


const { Header, Footer, Content } = Layout;

const GET_ORGANISATION_DETAILS = gql`query{
  ngo{
    name
    admin_email
    id
    status
    documents
  }
}`;

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
            <Query query={GET_ORGANISATION_DETAILS}>
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                console.log("####",data)
                return <Dashboard organisations={data.ngo}/>
              }}
            </Query>
          </div>
        </Content>
        <Footer></Footer>
      </Layout>

    )
  }
}

export default App;
