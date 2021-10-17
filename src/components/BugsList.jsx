import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUnresolvedBugs, loadBugs } from '../store/bugs';

const BugsList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadBugs());
    }, []);

    const bugs = useSelector(getUnresolvedBugs);

    return (
        <div>
          <ul>
            {bugs.map((bug) => (
              <li key={bug.id}>{bug.description}</li>
            ))}
          </ul>
        </div>
      );
};

export default BugsList;