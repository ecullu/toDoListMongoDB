import React from 'react'
import {TaskModel} from './models.js'

const Header = React.createClass({

	//create new task model and push it into collection
	_addTask: function(e){
		e.preventDefault()
		var newTask = new TaskModel({
			task: e.target.taskName.value,
			description: e.target.taskDesc.value,
			status: "undone"
		})
		newTask.save()
		this.props.addNewTask(newTask)
		console.log('adding new task>>>')
		e.target.taskName.value = ''
		e.target.taskDesc.value = ''
	},

	render: function(){
		return(
			<div id="header">
				<div id="app-title">Don't miss a thing</div> 
				<div id="add-new-task">
					<form onSubmit={this._addTask}>
						<input name="taskName" placeholder="Task name"/>
						<textarea name="taskDesc" placeholder="Task description"/>
						<button>Add</button>
					</form>
				</div>
				<div id="nav-bar">
					<a href="#tasks/all"><div>All</div></a>
					<a href="#tasks/done"><div>Done</div></a>
					<a href="#tasks/undone"><div>Undone</div></a>
				</div>
			</div>
		)
	}
})

export default Header