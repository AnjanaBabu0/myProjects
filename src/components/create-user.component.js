import React,{Component} from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    constructor(props){
        super(props)

        //bind this to refer to the whole class
        this.onChangeUserName =this.onChangeUserName.bind(this)
        this.onSubmit =this.onSubmit.bind(this)


        this.state={
            username: '',
            }
    }

    //methods to take values of username from the textbox
    onChangeUserName(e){
        this.setState({
        username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); // prevents default html submit behavious and follows below behaviour
        const user = {
            username: this.state.username,
        }
        //we need to connect to db and backend

        console.log(user)

        //to send the req to server, use axios, axios should be installed using npm ....user in 2nd argemnt is req body
        axios.post("http://localhost:5000/users/add", user).then(res=>console.log(res.data))

        // after entering the usr, show the page again to add multiple user and make the user black in new page
        this.setState({
            username:''
        })
    }

    render() {
        return(
                <div >
                    <h3>Create new User</h3>
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" required className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUserName}>
                        </input>
                    </div >
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"></input>
                    </div>
                    </form>
                </div>
        );
    }
}