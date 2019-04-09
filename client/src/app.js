// /client/App.js
import React, { Component } from 'react';
import axios from "axios";
import FormContainer from './containers/FormContainer';

class App extends Component {
  
    
  // initialize state  
  state = {
      data: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null
  };

  // when component mounts, first thing it does is fetch all existing data in db.  
  // then, we incorporate a polling logic so that it's easy to see if 
  // db has changed and implement those changes into UI
  componentDidMount() {
      this.getDataFromDb();
      if (!this.state.intervalIsSet) {
          let interval = setInterval(this.getDataFromDb, 1000);
          this.setState({ intervalIsSet: interval });
      }
  }

  // never let a process live forever
    // always kill a process everytime we are done using it
  componentWillUnmount() {
      if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
      }
  }


  // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or Delete.
    // for our back end, we use the object id assigned by MongoDb to modify
    // data base entries

  // first get method : uses backend API to getch data from database
  getDataFromDb = () => {
      fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }))
  }


  // put method: uses backend API to create new query into database
  putDataToDB = message => {
      let currentIds = this.state.data.map(data => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
          ++idToBeAdded;
      }

      axios.post("http://localhost:3001/api/putData", {
          id: idToBeAdded,
          message: message
      });
  };

  // delete method : uses backend api to remove existing database information
  deleteFromDB = idTodelete => {
      let objIdToDelete = null;
      this.state.data.forEach(dat => {
          if (dat.id == idTodelete) {
              console.log("found a match to delete");
              objIdToDelete = dat._id;
          }
      });
      console.log("in console");
      axios.delete("http://localhost:3001/api/deleteData", {
          data: {
              id: objIdToDelete
          }
      });
  };

  // update method : uses backend api to overwrite existing data base information
  updateDb = (idToUpdate, updateToApply) => {
      let objIdToUpdate = null;
      this.state.data.forEach(dat => {
          if (dat.id == idToUpdate) {
              console.log("found a match to update");
              objIdToUpdate = dat._id;
          }
      });
      axios.post("http://localhost:3001/api/updateData", {
          id: objIdToUpdate,
          update: { message: updateToApply }
      });
  };

  // here is the UI
  // visualize the capabilities
 
  render() {
    const { data } = this.state;
    return (
        <div>
          <ul>
            {data.length <= 0 ? "No DB Entries Yet" : data.map(dat => (
             // TODO: add a conditional for check for form data
                <li style={{ padding: "10px" }} key={data.message}>
                  <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                  <span style={{ color: "gray" }}> data: </span>
                  {dat.message}
                </li>
            ))}
          </ul>
          <div style={{ padding: "10px" }}>
            <input
              type="text"
              onChange={e => this.setState({ message: e.target.value })}
              placeholder="Add something to database here"
              style={{ width: "200px" }}
            />
            <button onClick = {() => this.putDataToDB(this.state.message)}>
              ADD
            </button>
          </div>
          <div style = {{ padding: "10px" }}>
            <input
              type="text"
              style={{ width: "200px" }}
              onChange={e => this.setState({ idToDelete: e.target.value })}
              placeholder="put id of item to delete here"
            />
            <button onClick ={() => this.deleteFromDB(this.state.idToDelete)}>
              DELETE
            </button>
          </div>
          <div style={{ padding: "10px" }}>
            <input
              type="number"
              style={{width: "200px" }}
              onChange={e => this.setState({ idToUpdate: e.target.value })}
              placeholder="id to update"
            />
            <br />
            <input
              type="text"
              style={{width: "200px" }}
              onChange={e => this.setState({ updateToApply: e.target.value })}
              placeholder="put new value of the item here"
            />
            <button
              onClick={() =>
                  this.updateDb(this.state.idToUpdate, this.state.updateToApply)
              }
            >
              UPDATE
            </button>
          </div>
          <div className="container">
            <h3>Form </h3>
            <FormContainer />
          </div>
        </div>
    );
  }
}

export default App;
