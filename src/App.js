import React from 'react';
import { Table, Button,Layout, } from "antd";
import Column from 'antd/lib/table/Column';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './App.css';
import 'antd/dist/antd.css';


const { Header, Footer, Content } = Layout;

const GET_ORGANISATION_DETAILS = gql `query{
  ngo{
    name
    admin_email
    id
  }
}`;


function fetchorganisation() {
  const { loading, error, data } = useQuery(GET_ORGANISATION_DETAILS);
  if (loading)  return <div>Loading</div>
  if (error) return <div>error</div>
  return <div>{data}</div>
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{
        key: '1',
        name: 'MAD',
        admin_email: 'surya@mad.com',
        admin_name: 'Suryaprakash',
        id: 1
      }],
    };
    // this.generateTable = this.generateTable.bind(this); 
    // this.rejectClicked = this.rejectClicked.bind(this);
    // this.approveClicked = this.approveClicked.bind(this);
    // this.downloadClicked = this.downloadClicked.bind(this);
    // this.fetchorganisation = this.fetchorganisation.bind(this);
  }
  
  componentDidMount(){
    // this.fetchorganisation()
  }

  generateTable() {
    return <Table dataSource={this.state.dataSource}>
      <Column title="Organisation" dataIndex="name" key="name"></Column>
      <Column title="Admin" dataIndex="admin_name" key="adminName"></Column>
      <Column title="Contact" dataIndex="admin_email" key="adminEmail"></Column>
      <Column
        title="Documents"
        key="doc_link"
        render={(text, record) => {
          return <div>
            <Button type="default" icon="download" onClick={() => this.downloadClicked(record.id)}>Docs</Button>

          </div>
        }}>
      </Column>
      <Column
        title="Actions"
        key="action"
        render={(text, record) => {
          return <div>
            <Button type="default" color="red" icon="close-circle" onClick={() => this.rejectClicked(record.id)}>Reject</Button>
            <Button type="default" color="green" icon="check-circle" onClick={() => this.approveClicked(record.id)}>Approve</Button>

          </div>
        }}>
      </Column>
    </Table>

  }
  rejectClicked = (id) => {
    console.log("Reject clicked id : ",id);
  }
  approveClicked = (id) => {
    console.log("Approve clicked id : ",id);
  }
  downloadClicked = (id) => {
    console.log("Download clicked id : ",id);
  }
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
            {this.fetchorganisation()}

            {/* {this.generateTable()} */}
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
      
    )
  }
}

export default App;
