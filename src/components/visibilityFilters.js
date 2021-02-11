import React from 'react';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core'
import { connect } from 'react-redux';
import { setVisiblityFilter } from '../actions';


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
}

class VisibilityFilters extends React.Component {

    updateVisiblity = (filter) => {
        this.props.setVisiblityFilter(filter)
    }

    render() {
        return (
            <Paper style={styles.Paper}>
                <Button color={this.props.visibilityFilter === 'All' ? 'primary': 'default'} style={styles.Link} onClick={()=> this.updateVisiblity('All')}>All</Button>
                <Button color={this.props.visibilityFilter === 'Active' ? 'primary': 'default'} style={styles.Link} onClick={()=> this.updateVisiblity('Active')}>Active</Button>
                <Button color={this.props.visibilityFilter === 'Deleted' ? 'primary': 'default'} style={styles.Link} onClick={()=> this.updateVisiblity('Deleted')}>Deleted</Button>
            </Paper> 
        )
    }
}

const mapStateToProps = state => {
    return { visibilityFilter: state.visibilityFilter }
}

export default connect(mapStateToProps, { setVisiblityFilter })(VisibilityFilters);