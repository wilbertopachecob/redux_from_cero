import React, { Component } from "react";
import { loadBugs } from "../store/bugs";
import { connect } from "react-redux";

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.bugs.map((bug) => (
            <li key={bug.id}>{bug.description}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({bugs: state.entities.bugs.list});
const mapDispatchToProps = (dispatch) => ({loadBugs: () => dispatch(loadBugs())});

//returning Components
// Container
//  Presentation(Bugs)
export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
