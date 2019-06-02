import React, { Component } from 'react';
import { render } from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import initData from './data';
import Column from './column'

class App extends React.Component {
  state = initData;

  onDragStart = () => {
    document.body.style.color = 'blue';
    document.body.style.transition = 'background-color 0.2s ease';
  }

  onDragUpdate = update => {
    const { destination } = update;

    const opacity = destination
      ? destination.index / Object.keys(this.state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(20, 120, 200, ${opacity})`;
  };

  onDragEnd = result => {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

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
      <DragDropContext 
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
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
