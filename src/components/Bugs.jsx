import React, { Component } from "react";
import { loadBugs, resolveBug, getUnresolvedBugs } from "../store/bugs";
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
            <li key={bug.id}>{bug.description} <button onClick={() => this.props.resolveBug(bug.id)}>Resolve</button></li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    bugs: getUnresolvedBugs(state),
});
const mapDispatchToProps = (dispatch) => ({
    loadBugs: () => dispatch(loadBugs()),
    resolveBug: (id) => dispatch(resolveBug(id))
});

//returning Components
// Container
//  Presentation(Bugs)
export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
