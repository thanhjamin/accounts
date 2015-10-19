var Record = React.createClass({
  getInitialState: function() {
    return { edit: false };
  },
  handleToggle: function(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  },
  handleEdit: function(e) {
    e.preventDefault();
    var data = { title: React.findDOMNode(this.refs.title).value,
                 data: React.findDOMNode(this.refs.date).value,
                 amount: React.findDOMNode(this.refs.amount).value }
    $.ajax({
      method: 'PUT',
      url: '/records/' + this.props.record.id,
      dataType: 'JSON',
      data: { record: data },
      success: function(data) {
        this.setState({ edit: false });
        this.props.handleEditRecord(this.props.record, data);
      }.bind(this)
    });
  },
  handleDelete: function(e) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: '/records/' + this.props.record.id,
      dataType: 'JSON',
      success: function() {
        this.props.handleDeleteRecord(this.props.record)
      }.bind(this)
    });
  },
  recordRow: function() {
    return(
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <a className='btn btn-default' onClick={this.handleToggle}>Edit</a>
          <a className='btn btn-danger' onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    );
  },
  recordForm: function() {
    return(
      <tr>
        <td>
          <input className='form-control' type='text' defaultValue={this.props.record.date} ref='date'></input>
        </td>
        <td>
          <input className='form-control' type='text' defaultValue={this.props.record.title} ref='title'></input>
        </td>
        <td>
          <input className='form-control' type='number' defaultValue={this.props.record.amount} ref='amount'></input>
        </td>
        <td>
          <a className='btn btn-default' onClick={this.handleEdit}>Update</a>
          <a className='btn btn-danger' onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    );
  },
  render: function() {
    if(this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }
});