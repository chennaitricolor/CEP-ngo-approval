import React from "react";
import { Table, Button, Tag } from "antd";
import Column from 'antd/lib/table/Column';
import axios from 'axios';
import * as constants from '../constants';

export default class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      organisations: [] 
    }
  }
  componentDidMount(){
    this.getOrgs();
  }

  async getOrgs(){
    let res = await axios.get('http://localhost:4000/organisation/getList')
    let { ngo } = res.data.data;
    this.setState({ organisations: ngo });
  };

  async rejectClicked(id){
    await axios.get(`http://localhost:4000/organisation/updateStatus/${id}?status=${constants.REJECTED}`)
    this.getOrgs();
  }
  async approveClicked(id){
    await axios.get(`http://localhost:4000/organisation/updateStatus/${id}?status=${constants.APPROVED}`)
    this.getOrgs();
  }

  downloadFileToDisk(filePath){
    axios({
      url: `http://localhost:4000/documents/${filePath}`,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filePath);
      document.body.appendChild(link);
      link.click();
    });  
  }

  async downloadClicked(documentName){
    var response = await axios.get(`http://localhost:4000/downloadFile/${documentName}`);
    this.downloadFileToDisk(response.data);
  }

  getStatusOfRecord(record) {
    switch (record.status) {
      case constants.APPROVED:
        return <Tag color="green"> {constants.APPROVED}</Tag>
      case constants.REJECTED:
        return <Tag color="red"> {constants.REJECTED}</Tag>
      case constants.PENDING:
        return <div>
          <Button type="default" color="red" icon="close-circle" onClick={() => this.rejectClicked(record.id)}>Reject</Button>
          <Button type="default" color="red" icon="close-circle" onClick={() => this.approveClicked(record.id)}>Approve</Button>
        </div>
      default: return <Tag color="red"> error</Tag>
    }
  }
  render() {
    return (
      <Table dataSource={this.state.organisations}>
        <Column title="Organisation" dataIndex="name" key="name"></Column>
        <Column title="Admin" dataIndex="admin_name" key="adminName"></Column>
        <Column title="Contact" dataIndex="admin_email" key="adminEmail"></Column>
        <Column
          title="Documents"
          key="doc_link"
          render={(text, record) => {
            return <div>
              <Button type="default" icon="download" onClick={() => this.downloadClicked(record.documents)}>Docs</Button>
            </div>
          }}>
        </Column>
        <Column
          title="Actions"
          key="action"
          render={(text, record) => this.getStatusOfRecord(record)}>
        </Column>
      </Table>

    )
  }
}