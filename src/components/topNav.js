import React from 'react';
import AddTodo from './addTodo';

class TopNav extends React.Component {
    constructor(props){
        super(props)
        this.todoRef = React.createRef();
        this.clickHnadle = this.clickHnadle.bind(this);
    }

    clickHnadle = () =>{
        debugger
    }

    render() {
        return <AddTodo ref={this.todoRef}/>
    }
}

export default TopNav;