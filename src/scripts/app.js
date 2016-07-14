import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import HomeView from './homeView'
import {TaskCollection} from './models.js'

const app = function() {


	var ToDoRouter = Backbone.Router.extend({
		routes: {
			"tasks/:viewType": "_showTasks",
			"*default": "_routeToAll",
		},

		_routeToAll: function(){
			location.hash = 'tasks/all'
		},

		_showTasks: function(viewType){
			var taskCollection = new TaskCollection()
			taskCollection.fetch()
			ReactDOM.render(<HomeView taskColl={taskCollection} viewType={viewType}/>,document.querySelector('.container'))
		},

		initialize: function(){
			Backbone.history.start()
		}
	})

	var router = new ToDoRouter()

}

app()