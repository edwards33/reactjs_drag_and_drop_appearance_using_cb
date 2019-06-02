import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';

const MARGIN_PADDING = 10;
const BORDER = 1;
const RADIUS = 2;

const Container = styled.div`
  margin: ${MARGIN_PADDING}px;
  border: ${BORDER}px solid lightgrey;
  border-radius: ${RADIUS}px;
`;
const Title = styled.h3`
  padding: ${MARGIN_PADDING}px;
`;
const TaskList = styled.div`
  padding: ${MARGIN_PADDING}px;
`;

export default class Column extends React.Component {
  render(){
    return(
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {provided =>(
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    ); 
  }
}