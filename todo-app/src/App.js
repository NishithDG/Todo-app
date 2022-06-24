import loadingGif from './loading.gif';
import './App.css';
import axios from 'axios'
import React, { Component } from 'react'
import ListItem from './Components/ListItem';
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newTask: '',
      editing: false,
      editingIndex: null,
      notification:null,
      todos: [],
      loading:true
    }

    this.apiUrl = "https://62b3094b4f851f87f452bb7c.mockapi.io/todos"

    this.addTask = this.addTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.updateTask = this.updateTask.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    //this.getId = this.getId.bind(this)
    this.alert = this.alert.bind(this)

  }
  componentDidMount(){
    axios.get(`${this.apiUrl}`)
        .then(Response=>{
            console.log(Response);
            this.setState({
              todos:Response.data,
              loading:false
            })
        }).catch(error=>{
            console.log(error);
            
        })

  }

  handleInputChange(event) {
    this.setState({
      newTask: event.target.value
    })

  }


  // getId(){
  //   const lastTodo = this.state.todos[this.state.todos.length - 1]
  //   if (lastTodo) {
  //     return lastTodo.id + 1
  //   }

  //   return 1
  // }

  async addTask(){
     axios.post(`${this.apiUrl}`,{
      name:this.state.newTask
    }).then(response=>{
      const todos = this.state.todos

    todos.push(response.data)
    }).catch(error=>{
      console.log('error')
    })

    

    this.setState({
      newTask: ''
    })
    this.alert('Task Added Succesfully')
  }

  alert(notification){
    this.setState({
      notification 
  });
    setTimeout(()=>{
      this.setState({
        notification:null
      })
    },2000)

  }

  deleteTask(index){
    console.log(index)
    const todos = this.state.todos
    const todo = todos[index]
    axios.delete(`${this.apiUrl}/${todo.id}`)


    delete todos[index]

    this.setState({
      todos
    })
    this.alert('Task deleted Succesfully')

  }

  editTask(index){
    const todo = this.state.todos[index]

    this.setState({
      editing: true,
      newTask: todo.name,
      editingIndex: index
    })
    

  }

  async updateTask(){
    const todo = this.state.todos[this.state.editingIndex]
    
    const response = await axios.put(`${this.apiUrl}/${todo.id}`,{
      name:this.state.newTask
    })

    const todos = this.state.todos
    todos[this.state.editingIndex] = response.data
    this.setState({
      todos,
      editing: false,
      editingIndex: null,
      newTask: ''
    })
    this.alert('Task Updated Succesfully')
  }


  render() {

    return (
      <div className="App">

        <div className='container-fluid bg-info mb-3'>
       
          <h2 className="p-4">Todo App</h2>
        </div>
      

        <div className="container ">


        {
           this.state.notification && 
           <div className='alert mt-3 alert-success'>
            <p className='text-center'>{this.state.notification}</p>
           </div>
        }

          <input type="text" className="form-control my-4" placeholder="Add Your task"
            onChange={this.handleInputChange}
            value={this.state.newTask}
          />
          <br></br>
          <button className="btn-info form-control mb-3  "
            onClick={this.state.editing ? this.updateTask : this.addTask}
            disabled={this.state.newTask.length < 3}
          >
            {this.state.editing ? 'Update Task' : 'Add Task'}
          </button>
          {
            this.state.loading && <img className='mt-3 mb-3' alt='loading' style={{height:'46px',width:'46px'}} src={loadingGif}/>
          }
          <h2>Your Todo Tasks..</h2>
          {(!this.state.editing ) && <ul className="list-group mt-5">
            {
              this.state.todos.map((item, index) => {
                return <ListItem key={item.id} item={item} editTask={()=>this.editTask(index)} deleteTask={()=>this.deleteTask(index)} />
              })
            }
          </ul>
          }
        </div>
      </div>
    );
  }
}

export default App;
