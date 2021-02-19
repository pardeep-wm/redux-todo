import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import { Paper } from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { updateTodo, markUnmarkDelete } from '../actions';
import { connect } from 'react-redux';

const styles = {
    Paper: {
      padding: 20,
      margin: "auto",
      textAlign: "center",
      width: 500
    },
    Link: {
        padding: 20
    }
  };


class TodoItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
  }

  deleteUndeleteTodo = (todo) => {
    this.props.markUnmarkDelete(todo.id.$oid)
  }

  onhandleChange = (event, todo) => {
    let tags = [];
    todo.tags.map(m => {
      return tags.push(m.tag.name)
    })
    let item = {todo_item: {name: todo.name, status: event.target.value, tags: tags}}
    this.props.updateTodo({data: item, id: todo.id.$oid});
  } 
    
  renderTags = (tags) => {
    return tags.map(tag => {
        return <Chip label={tag.tag.name} key={tag.tag.id.$oid} margin={10}/>
    })
  }

  handleEdit = (todo) => {
    this.props.onhandleEdit(todo);
  }
  renderedList = () => {
    if (this.props.todo){
      const { todo } = this.props;
      return <Paper key={todo.id.$oid} style={styles.Paper}> 
          <List >
              <ListItemText style={{'textDecoration': todo.is_deleted ? 'line-through' : ''}} primary={todo.name}/>
              {this.renderTags(todo.tags)}
              <Box component="div" display="block">
                  <Button color={todo.is_deleted ? 'secondary' : 'primary'}
                      onClick={()=> this.deleteUndeleteTodo(todo)} id="deleteButton">
                      {todo.is_deleted ? 'Deleted' : 'Active'} 
                  </Button>
                  <Select value={todo.status} id="statustag"
                      onChange={(event)=> this.onhandleChange(event, todo)}>
                      <MenuItem value='start'>Start</MenuItem>
                      <MenuItem value='finish'>Finished</MenuItem>
                      <MenuItem value='not_started'>Not Started</MenuItem>
                  </Select>
                  <Button color="primary" variant="text" onClick={() => this.handleEdit(todo)}>
                      <EditIcon />
                  </Button>
              </Box>
          </List>
          <Divider/>
      </Paper>
    } else {
      
    }
    
  }

    render () {
        return <Fragment>{this.renderedList()}</Fragment>
    }
}

const mapStateToProps = state => {
  return { todos: state.todos }
}

export default connect(mapStateToProps, { markUnmarkDelete, updateTodo })(TodoItem);