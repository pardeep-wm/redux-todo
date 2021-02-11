import React from 'react';
import { connect } from 'react-redux';
import { newTodo, updateTodo } from '../actions'
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

class AddTodo extends React.Component {

    constructor(props){
        super(props)
        this.state = {term: '', chips: [], open: false, item: {}, btnText:'Create'}
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    

    onFormSubmit=(event)=>{
        if (this.state.item.id !== undefined){
            this.updateTodoItem();
        } else {
            event.preventDefault()
            let payload = {todo_item: {name: this.state.term, status: 'start', tags: this.state.chips}}
            this.props.newTodo(payload);
            this.setState({term: '', chips: [], open: false})
        }
    }

    updateTodoItem = () => {
        let payload = {todo_item: {name: this.state.term, tags: this.state.chips}}
        this.props.updateTodo({data: payload, id: this.state.item.id.$oid});
        this.setState({term: '', chips: [], open: false})
    }

    ohAddNewChip=chip => {
        let arr = [...this.state.chips, chip]
        this.setState({chips : arr})
    }
    handleDeleteChip=(chip, index)=> {
        let arr = [...this.state.chips]
        let newArr = arr.filter(a => a !== chip)
        this.setState({chips: newArr})
    }
    handleClickOpen = (todo={}) => {
        if (todo.id !== undefined) {
            this.setState({term: todo.name, chips: todo.tags.map(tag => tag.tag.name), item: todo, btnText: 'Update'})
        } else {
            this.setState({btnText: 'Create'})
        }
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        return (
            <div>
      <Button variant="text" mini='true' onClick={this.handleClickOpen}>
        <AddCircleOutlineIcon  style={{color: 'white'}}/>
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth={"xs"} fullWidth={true}>
        <DialogTitle id="form-dialog-title">New Task</DialogTitle>
        <DialogContent>
            <form onSubmit={this.onFormSubmit}>
                <TextField required placeholder="Add new task" value={this.state.term} onChange={(e) => this.setState({term: e.target.value})} fullWidth={true} /><br/>
                <ChipInput placeholder="tags" value={this.state.chips} onAdd={(chip)=> this.ohAddNewChip(chip)} onDelete={(chip, index) => this.handleDeleteChip(chip, index)} fullWidth={true}/><br />
                {/* <Button variant="contained" color="primary" type="submit" style={{'marginTop':'10px'}} >Create Task</Button> */}
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={this.onFormSubmit}>
            {this.state.btnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        )
    };
};

const mapStateToProps = state => {
    return { todos: state.todos }
}

export default connect(mapStateToProps, { newTodo, updateTodo }, null, {forwardRef: true})(AddTodo);