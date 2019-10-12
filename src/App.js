import React from 'react';
import { Table, Button,Layout, } from "antd";
import './App.css';
import 'antd/dist/antd.css';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Column from 'antd/lib/table/Column';

const { Header, Footer, Content } = Layout;

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
    this.generateTable = this.generateTable.bind(this); 
    this.rejectClicked = this.rejectClicked.bind(this);
    this.approveClicked = this.approveClicked.bind(this);
    this.downloadClicked = this.downloadClicked.bind(this);
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
  // firestoreTrial() {
  //   db.collection('apps').limit(1).get().then((snapshot) => {
  //     console.log(snapshot.app_url);
  //   })
  //   return;
  // }
  render() {
    
    var firebaseConfig = {
      apiKey: "AIzaSyA2TrPvnDvTCTkiRUFBkvCXHu1pJ4LWEog",
      authDomain: "tech-for-cities.firebaseapp.com",
      databaseURL: "https://tech-for-cities.firebaseio.com",
      projectId: "tech-for-cities",
      storageBucket: "tech-for-cities.appspot.com",
      messagingSenderId: "188239670513",
      appId: "1:188239670513:web:5fcf563a6811a0c7b30d50"
    };

    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    return (
      <Layout>
        <Header>
          <span className="header">
            <span>Namma Chennai - NGO Approver</span>
          </span>
        </Header>
        <Content className="App">
          <div class="table-pane">
            {this.generateTable()}
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
      
    )
  }
}

export default App;
