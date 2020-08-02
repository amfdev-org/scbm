import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component'
import Spinner from 'react-bootstrap/Spinner'
import moment from 'moment'

class ReceivedMessagesTable extends Component {


    handleChange = (event) => {
      
          this.props.handleReceivedMessagesSelectedRowsChange(event.selectedRows);
    }
    
    
    render() {
        
        const showReceivedMessagesTable = this.props.showReceivedMessagesTable ? {display: 'block'} : {display: 'none'};
        const showReceivedMessagesLoadingIcon = this.props.showReceivedMessagesLoadingIcon ? {display: 'block'} : {display: 'none'};
        
        const columns =  [
            { name: 'Who With', selector: 'sender', sortable: true, wrap: true },
            { name: 'Date', selector: 'scMessageTime', sortable: true, wrap: true, format: row => moment(row.scMessageTime).format('LLL')},
            { name: 'Last Message', selector: 'message', sortable: true, wrap: true }
            ];
               
        return (
         
        <div id="received-messages-table-container">
        
        <Spinner style={showReceivedMessagesLoadingIcon} animation="border" role="status">
        <span className="sr-only">Loading...</span>
        </Spinner>
          
          <Form className="messagesDataTable">
              <DataTable style={showReceivedMessagesTable}
                columns={columns}
                data={this.props.receivedMessageData}
                defaultSortField="scMessageTime"
                defaultSortAsc={false}
                selectableRows
                onSelectedRowsChange={this.handleChange}
                highlightOnHover
                clearSelectedRows={this.props.toggledClearRows}
                pagination
                paginationPerPage={10}
              />
                       
          </Form>
          </div>
        )
    }

}

export default ReceivedMessagesTable;