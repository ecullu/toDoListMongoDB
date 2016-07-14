import React from 'react'
import Header from './header.js'
import $ from 'jquery'


const HomeView = React.createClass({
	getInitialState: function(){
		return {
			taskColl: this.props.taskColl
		}
	},

	componentWillMount: function(){
		var self = this
		this.state.taskColl.on('sync update', function(){
			self.setState({
				taskColl: self.state.taskColl
			})
		})
	},

	_addNewTask: function(task){
		this.state.taskColl.add(task)
	},

	render: function(){
		return (
				<div id="home-view">
					<Header addNewTask = {this._addNewTask}/>
					<ListWrapper taskList = {this.state.taskColl} viewType={this.props.viewType}/>
				</div>
			)
	}

})

const ListWrapper = React.createClass({

	render: function(){
		var handleView = this.props.taskList.models
		if(this.props.viewType !== 'all'){
			handleView = this.props.taskList.where({status: this.props.viewType})
		}

		return (
				<div  id="list-wrapper">
					<div id="task-title-bar">
						<h5>Task</h5>
						<h5>Description</h5>
						<h5>Status</h5>
						<h5>Mark as done</h5>
					</div>
					<div className="tasks">
					{handleView.map(function(singleTask){
						return <Task task={singleTask} key={singleTask.cid}/>
					})}
					</div>
				</div>
			)
	}
})

const Task = React.createClass({

	getInitialState: function(){
		if(this.props.task.attributes.status === "done"){
			var cbState = true
		}
		else {
			var cbState = false
		}
		return {
			checkboxState: cbState
		}
	},

	_deleteTask: function(){
		console.log(this)
		this.props.task.destroy()
		$.ajax({
			type: 'delete',
			url: '/api/tasks/' + this.props.task.attributes._id,
			// data: JSON.stringify({_id: this.props.task.attributes._id}),
			dataType: 'json'
		}).then(function(res){console.log(res)})
},

	_changeStatus: function (){
		console.log('this in change status >>> ', this)
		var taskStatus = this.props.task.attributes.status
		console.log('taskstatus', this.props.task.attributes)
		if(taskStatus === "undone"){
			this.props.task.attributes.status = "done"
			this.state.checkboxState = true
			this.setState({
				checkboxState: this.state.checkboxState
			})
		}
		else{
			this.props.task.attributes.status = "undone"
			this.state.checkboxState = false
			this.setState({
				checkboxState: this.state.checkboxState
			})
		}
},

	render: function(){
		var task = this.props.task
		return (
				<div className="task-box">
					<div className="task-name">{task.get('task')}</div>
					<div className="task-name">{task.get('description')}</div>
					<div className="task-status">{task.get('status')}</div>
					<div className="task-update">
						<input className="status-box" type="checkbox" onClick={this._changeStatus} checked={this.state.checkboxState}/>
						<button className="delete-button" onClick={this._deleteTask}> Delete </button>
					</div>
				</div>
			)
	}
})

export default HomeView