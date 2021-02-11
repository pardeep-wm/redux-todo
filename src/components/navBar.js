import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddTodo from './addTodo';


class NavBar extends React.Component {

    constructor(props){
        super(props)
        this.todoRef = React.createRef();
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <ToolBar>
                        <Typography variant="inherit" color="inherit" style={{flex: 1}}>
                            React Redux Todo App
                        </Typography>
                        <AddTodo ref={this.todoRef}/>
                    </ToolBar>
                </AppBar>
            </div>
        )
    }
}

export default NavBar;