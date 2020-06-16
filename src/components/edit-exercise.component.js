import React,{Component} from 'react'
import axios  from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default class EditExercise extends Component {
    //this should refer to  the whole class
    constructor(props){
        super(props);
        this.myRef = React.createRef();


//bind this to refer to the whole class
        this.onChangeUserName =this.onChangeUserName.bind(this)
        this.onChangeDescription =this.onChangeDescription.bind(this)
        this.onChangeDuration =this.onChangeDuration.bind(this)
        this.onChangeDate =this.onChangeDate.bind(this)
        this.onSubmit =this.onSubmit.bind(this)


        this.state={
            username: '',
            description:'',
            duration:0,
            date:new Date(),
            users:[]
            }
    }


    //react life cycle method to add user, Tis life cycle call before anything gets ,oaded to page
    //now hard code user, later take user from mongodb
    componentDidMount(){
        //
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id).then(response =>{
            this.setState({
                username:response.data.username,
                description:response.data.description,
                duration:response.data.duration,
                date:new Date(response.data.date)

            })
        }).catch(function(error){
                console.log(error)
        })
        //all user from data base in deop down menu
       axios.get('http://localhost:5000/users/').then(response=>{
           if(response.data.length>0){
               this.setState({
                   //map returns something from array
                   users:response.data.map(user=>user.username),
               })
           }
       })
    }

//methods to take values of username from the textbox
    onChangeUserName(e){
        this.setState({
        username: e.target.value
        });
    }
     
    onChangeDescription(e){
        this.setState({
        description: e.target.value
        });
    }
    onChangeDuration(e){
        this.setState({
        duration: e.target.value
        });
        
    }
        //use lidrary for calender
        
    onChangeDate(date){
        this.setState({
        date: date
        });
    }

    //on submit of thses info on page
    onSubmit(e) {
        e.preventDefault(); // prevents default html submit behavious and follows below behaviour
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }


        //we need to connect to db and backend
        console.log(exercise)

        // connecteing to db
        axios.post("http://localhost:5000/exercises/update/"+ this.props.match.params.id, exercise).then(res=>console.log(res.data))

        window.location='/'  // takes the page back to home page after this operation
    }
    render() {

        return(
                //<div >
                //<p>You are on edit exercises comonent</p>
                //</div>
                <div>
                    <h3>Edit Exercise log</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>UserName:</label>
                            <select ref={this.myRef} required className="form-control"
                            value={this.state.username} onChange={this.onChangeUserName}> 
                                {
                                    //inside select we have diff option, we get option from userarray
                                    //array of users.map - it return something for each element in array, for each user it retuens 
                                    //option key and value (of select box)
                                    this.state.users.map(function(user){
                                        return <option
                                        key={user} value={user}>{user}
                                        </option>
                                    })
                                }
                            </select>
                        </div> 
                        

                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" required className="form-control"
                            value={this.state.description} 
                            onChange={this.onChangeDescription}></input>
                        </div>

                        <div className="form-group">
                            <label>Duration in Minutes</label>
                            <input type="text" required className="form-control"
                            value={this.state.duration} 
                            onChange={this.onChangeDuration}></input>
                        </div>

                        <div className="form-group">
                            <label>Date:</label>
                            <div>
                                <DatePicker //date picker component should be added by using a ackage in npm
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary"></input>
                        </div>
                    </form>
                </div>
        );
    }
}