// /client/App.js
import React, { Component } from 'react';
import axios from "axios";
import FormContainer from './containers/FormContainer';
import './styles.css';
import ReactDOM from 'react-dom';
//import CanvasJS from 'canvasjs';
//import CanvasJSReact from './canvasjs/canvasjs.react';
//var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
    
  // initialize state  
  state = {
      data: [],
      forms: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
      formId: null,
      formName: null,
      formAge: null,
      formGender: null,
      formSkills: null,
      formAbout: null
      
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

  startGraph = () => {
      return ReactDOM.render(
            <App />,
            document.getElementById('root')
      );
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
      fetch("http://localhost:3001/api/getFormData")
      .then(data => data.json())
      .then(res => this.setState({ forms: res.data }))
  
  }


  // put method: uses backend API to create new query into database
  putDataToDB = message => {
      let currentIds = this.state.data.map(data => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
          ++idToBeAdded;
      }

      axios.post("http://localhost:3001/api/putData", {
          type: "data",
          id: idToBeAdded,
          message: message
      });
  };

  putFormToDB = (name, age, gender, about) => {
      let currentIds = this.state.forms.map(form => form.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
          ++idToBeAdded;
      }

      axios.post("http://localhost:3001/api/putForm", {
          type: "Form",
          id: idToBeAdded,
          name: name,
          age: age,
          gender: gender,
          skills: ["React"],
          about: about
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

  
  // delete method : uses backend api to remove existing database information
   deleteFormFromDbById = idTodelete => {
       let objIdToDelete = null;
       this.state.forms.forEach(form => {
           if (form.id == idTodelete) {
               console.log("found a match to delete");
               objIdToDelete = form._id;
           }
       });
       
       axios.delete("http://localhost:3001/api/deleteForm", {
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

    // the notation below selects the data field within this.state
    const { data } = this.state;
    const { forms } = this.state;
    return (
        <div>
          
         <div className="right">
             {data.length <= 0 ? "No DB Entries Yet" : data.map(dat => (
               <div className="data">
                 <span className="itemEntry">type: </span>{dat.type}<br />
                 <span className="itemEntry">id: </span>{dat.id}<br />
                 <span className="itemEntry">message: </span>{dat.message}</div>))}
         <br />
         <br />
             {forms.length <= 0 ? "No Form Entries Yet" : forms.map(form => (
               <div className="form">
                 <span className="itemEntry">type: </span>{form.type}<br />
                 <span className="itemEntry">id: </span> {form.id}<br />
                 <span className="itemEntry">name: </span> {form.name}<br />
                 <span className="itemEntry">gender: </span> {form.gender}<br />
                 <span className="itemEntry">about: </span> {form.about}</div>))}
          </div>

          <div className ="left">
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
            <br />
            <br />
            <div className="w3-container">
              <p> Gonna fill out the form below </p>
              <input
               type="text"
               style={{width: "200px" }}
               onChange={e => this.setState({ formName: e.target.value })}
               placeholder="Name?"
             />
             <br />
               <input
                type="text"
                style={{width: "200px" }}
                onChange={e => this.setState({ formAge: e.target.value })}
                placeholder="Age?"
              />
             <br />
               <input
                type="text"
                style={{width: "200px" }}
                onChange={e => this.setState({ formGender: e.target.value })}
                placeholder="gender?"
              />
             <br />
               <input
                type="text"
                style={{width: "200px" }}
                onChange={e => this.setState({ formAbout: e.target.value })}
                placeholder="About you?"
              />
             <button
               onClick={() =>
                   this.putFormToDB(this.state.formName, this.state.formAge, this.state.formGender, this.state.formAbout)
               }
             >
               Submit Form
             </button>
            </div>
             <div className="w3-container">
               <p> Wanna delete a form by id? </p>
               
               <input
                 type="text"
                 style={{width: "200px" }}
                 onChange={e => this.setState({ formId: e.target.value })}
                 placeholder="id?"
               />
               <button
                onClick={() =>
                    this.deleteFormFromDbById(this.state.formId)
                }
                >
                Submit Form
               </button>
        
            </div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
