import React from "react";
import { Table, Button } from "antd";
import Column from 'antd/lib/table/Column';

export default class Dashboard extends React.Component{
rejectClicked = (id) => {
    console.log("Reject clicked id : ", id);
  }
  approveClicked = (id) => {
    console.log("Approve clicked id : ", id);
  }
  downloadClicked = (id) => {
    console.log("Download clicked id : ", id);
  }
  
render(){
return(
    <Table dataSource={this.props.organisations}>
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

      )
  }
}