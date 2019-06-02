import React, { Component } from 'react';
import { render } from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import initData from './data';
import Column from './column'

class App extends React.Component {
  state = initData;
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if(!destination){
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      }
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {
          this.state.columnOrder.map(columnID => {
            const column = this.state.columns[columnID];
            const tasks = column.taskIds.map(taskID => this.state.tasks[taskID]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })
        }
      </DragDropContext>
    )
  }
}

render(<App />, document.getElementById('root'));
