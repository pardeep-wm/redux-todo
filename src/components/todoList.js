import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input';
import NavBar from './navBar';
import { fetchTodo, filterTodo, loadTodos } from '../actions';
import TodoItem from './todoItem';
import VisibilityFilters from './visibilityFilters';


const styles = {
    Paper: {
      padding: 20,
      margin: "auto",
      textAlign: "center",
      width: 500
    },
  };

class TodoList extends React.Component {

    constructor(props){
        super(props)
        this.navRef = React.createRef();
    }
    
    componentDidMount(){
        this.props.loadTodos()
    }

    handleInput= (chip) => {
        let arr = this.props.filteredTags
        this.props.filterTodo([...arr, chip])
    }

    handleDeleteChip= (chip, index) => {
        let arr = this.props.filteredTags.filter(f => f !== chip)
        this.props.filterTodo(arr)
    }

    handleEdit =(todo) => {
        this.navRef.current.todoRef.current.handleClickOpen(todo)
    }

    renderedList = () => {
        return this.props.todos.map((todo) => {
            return <TodoItem  todo={todo.todo_item} key={todo.todo_item.id.$oid} 
                    onhandleEdit={this.handleEdit}/>
        })
    }
    render() {
        return (
            <div className="">
                <NavBar ref={this.navRef}/>
                <Fragment>
                    <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Paper style={styles.Paper} >
                            <p>You have {this.props.todos.length} items in list</p>
                            <ChipInput  value={this.props.filteredTags} onAdd={(chip)=>this.handleInput(chip)} 
                                onDelete={(chip, index) => this.handleDeleteChip(chip, index)} placeholder="Filter By Tags"/>
                        </Paper>
                        <VisibilityFilters />
                    </Grid>
                    <Grid item xs={12} style={styles.Paper} pt={10}>
                        {this.renderedList()}
                    </Grid>
                </Grid>
                </Fragment>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { todos: state.todos, filteredTags: state.filterTags }
}

export default connect(mapStateToProps, { fetchTodo, filterTodo, loadTodos })( TodoList);