import React, { Component } from "react";
import StoreContext from "../contexts/storeContext";
import { loadBugs } from "../store/bugs";
import { isFunction as _isFunction } from "lodash";

class Bugs extends Component {
  static contextType = StoreContext;
  state = { bugs: [] };

  componentDidMount() {
    const store = this.context;
    this.unsubscribe = store.subscribe(() => {
      const bugsInStore = store.getState().entities.bugs.list;
      if (this.state.bugs !== bugsInStore) {
        this.setState({ bugs: bugsInStore });
      }
    });
    store.dispatch(loadBugs());
  }

  componentWillUnmount() {
    if (_isFunction(this.unsubscribe)) {
      this.unsubscribe();
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.bugs.map((bug) => (
            <li key={bug.id}>{bug.description}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Bugs;
