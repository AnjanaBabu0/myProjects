import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

//compomemt 1 react component with no state and life cycle methods
const Exercise = props=>(
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={()=> {
                props.deleteExercise(props.exercise._id)
            }}>delete</a>
        </td>

    </tr>
)
//component 2
export default class ExercisesList extends Component {
//comnstructor to initiatise state
    constructor(props){
        super(props);
        //delete exercise
        this.deleteExercise = this.deleteExercise.bind(this)
        //initialise state, only exercise
        this.state={exercises:[]}
        
    }
//get exercises from database
    componentDidMount() {
        axios.get('http://localhost:5000/exercises').then(response=>{
            this.setState({
                exercises:response.data
            })
        }).catch (error=>{
            console.log(error)
        }
            )
    }


//delete exercise code
deleteExercise(id) {
    //delete from db
    axios.delete('http://localhost:5000/exercises/'+id).then(res=>console.log(res.data));
    //delete exercise from user , the table that we show to user, react updates thenstate of page
    this.setState({
        //everyelemt in exercise array returns only when id of exercise array is not equals the id that we are deleteing
        exercises:this.state.exercises.filter(el => el._id !==id)
    })
}

    exercisesList() {
        //map retuens for everyelemnt currentexercise
        return this.state.exercises.map(currentExercise=>{
            //Exercise is a component
            return <Exercise exercise ={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>;
        })
    }

    render() {
        return(
                <div >
                    <h3>Logged Exercises</h3>
                    <table className="table" >
                        <thead className="thead-light">
                        <tr>
                            <th>UserName</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                           {this.exercisesList()} 
                        </tbody>
                    </table>
                </div>
        );
    }
}