import React from 'react';
import TodosView from './TodosView';
import TodosForm from './TodosForm';
import { bindActionCreators } from 'redux';
import * as TodoActions from './../../actions/TodoActions';
import { connect } from 'react-redux';

@connect(state => ({todos: state.todos}))

export default class Todo extends React.Component {
  render() {
    const { todos, dispatch } = this.props;

    return (
      <div id="todo-list">
        <TodosView todos={ todos } {...bindActionCreators(TodoActions, dispatch)} />
        <TodosForm {...bindActionCreators(TodoActions, dispatch)}/>
      </div>
    );
  }
}