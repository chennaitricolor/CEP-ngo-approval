import React from "react";
import { Table, Button, Tag } from "antd";
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import Column from 'antd/lib/table/Column';
import * as constants from '../constants';

const APPROVE_OR_REJECT_ORGANISATION = gql`mutation update_ngo($status: String, $id:Int){  	
    update_ngo( 
      where:{id:{_eq:$id}},
      _set:{status:$status}
      ) {
      returning{
        id
        status
        name
      }
    }
  }`;

export default class Dashboard extends React.Component {

  getStatusOfRecord(record) {
    switch (record.status) {
      case constants.APPROVED:
        return <Tag color="green"> {constants.APPROVED}</Tag>
      case constants.REJECTED:
        return <Tag color="red"> {constants.REJECTED}</Tag>
      case constants.PENDING:
        return <div>
          <Mutation mutation={APPROVE_OR_REJECT_ORGANISATION} variables={{ status: constants.REJECTED, id: record.id }}>
            {(approveNGO) => (
              <Button type="default" color="red" icon="close-circle" onClick={approveNGO}>Reject</Button>
            )}
          </Mutation>
          <Mutation mutation={APPROVE_OR_REJECT_ORGANISATION} variables={{ status: constants.APPROVED, id: record.id }}>
            {(rejectNGO) => (
              <Button type="default" color="red" icon="close-circle" onClick={rejectNGO}>Approve</Button>
            )}
          </Mutation>
        </div>
      default: return <Tag color="red"> error</Tag>
    }
  }
  render() {
    return (
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
          render={(text, record) => this.getStatusOfRecord(record)}>
        </Column>
      </Table>

    )
  }
}