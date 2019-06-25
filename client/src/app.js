// /client/App.js
import React, { Component } from 'react';
import LandingPage from './landingPage.js';
import axios from "axios";
import FormContainer from './containers/FormContainer';
import './styles.css';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';



var graph = require('./graph.js');

//import CanvasJS from 'canvasjs';
//import CanvasJSReact from './canvasjs/canvasjs.react';
//var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
    

  state = {
      data: [],
      forms: [],
      formStyles: [],

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
      formSalary: null,
      formSkills: null,
      formAbout: null,
      
      user: null,

      createNewStyle: false,
      newFormMetrics: 0
  };

  // when component mounts, first thing it does is fetch all existing data in db.  
  // then, we incorporate a polling logic so that it's easy to see if 
  // db has changed and implement those changes into UI
  componentDidMount() {
      axios.post("http://localhost:3001/api/login", 
          { user: this.state.user.email });
      this.getDataFromDb();
 /*     if (!this.state.intervalIsSet) {
          let interval = setInterval(this.getDataFromDb, 1000);
          this.setState({ intervalIsSet: interval });
 */
      
  }

  // never let a process live forever
    // always kill a process everytime we are done using it
  componentWillUnmount() {
      let a = 2;
      /*axios.post("http://localhost:3001/api/logout",
          { user: this.state.user.email });*/
     /* if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
     */ 
      
  }

  constructor(props) {
      super(props);
      this.state.user = props.user;
      this.state.formStyles = props.user.formStyles;
      this.state.forms = props.user.forms;

      //this.putFormToDB("New Type4", "jerry", 30, "male", 3000, "about me");
  
      console.log(this.state.formStyles)
  }


  // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or Delete.
    // for our back end, we use the object id assigned by MongoDb to modify
    // data base entries

  // first get method : uses backend API to getch data from database
  getDataFromDb = () => {
      
      fetch("http://localhost:3001/api/getUser")
      .then(data => data.json())
      .then(res => {
          res.data.forEach ( user => {
              if (user._id === this.state.user._id) {
                  this.setState({ user: user })
                  this.setState({ forms: user.forms })
                  this.setState({ formStyles: user.formStyles })
              }
          })
      })
      
      /*fetch("http://localhost:3001/api/getFormData")
      .then(data => data.json())
      .then(res =>
          {
          var arr = [];
          res.data.forEach( form => 
            {
            if (this.state.user._id === form.ownerid) {
                arr.push(form);
            } 
            }
            )
          //graph.showGraph(arr);
          this.setState({ forms: arr })
          }
      )*/
      
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

  putFormToDB = (type, name, age, gender, salary, about) => {
      let currentIds = this.state.forms.map(form => form.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
          ++idToBeAdded;
      }

      let newType = true;
      if (this.state.formStyles.includes(type)) {
          newType = false;
      }

      axios.post("http://localhost:3001/api/putForm", {
          ownerid: this.state.user._id,
          newType: newType,
          type: type,
          id: idToBeAdded,
          name: name,
          age: age,
          gender: gender,
          salary: salary,
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

  deleteAllFormsFromDB = () => {
      this.state.forms.forEach(form => {
          axios.delete("http://localhost:3001/api/deleteForm", {
              data: {
                  id: form._id
              }
          });
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

  metricSheets = () => {
      let sheets = [];
      for ( var i = 0; i < this.state.newFormMetrics; i++) {
          sheets.push(
              <div className='metricSheet'>
                  <br />
                  <input type="text" id = {i} style={{ width: "70%", padding: "5px", textAlign: "center" }} placeholder="Name of metric?"/>
                  <br />
                  <select name="metric" id = {i + 10} >
                    <option type ="number" value="number">number</option>
                    <option type="string" value="string">string</option>
                  </select>
              
              </div>);
      }
      return sheets;
  };

  createStyle = () => {
      return (
          
          <button onClick = {() => 
              ReactDOM.render(<App user={this.state.user} />, document.getElementById('root'))
          }>Cancel</button>
      )
  };

  submitNewStyle = () => {
      
      let metrics = [];

      for (var i = 0; i < this.state.newFormMetrics; i++) {
          metrics.push([document.getElementById(i).value, document.getElementById(i + 10).value])     
      }  // need to build a db type for style

      axios.post("http://localhost:3001/api/putNewStyle", 
          {
              name: this.state.newFormTitle,
              data: metrics
          }
      )

  }
  // here is the UI
  // visualize the capabilities
 
  render() {

    // the notation below selects the data field within this.state
    const { forms } = this.state;
    const { formStyles } = this.state;

    while (this.state.loading === true) {
        ;
    }
    return (
        <div className="screen">
            <div className="right">
             
            </div>
            <div className ="left">
                <button onClick={() => {
                 axios.post("http://localhost:3001/api/logout",
                     { user: this.state.user.email })
                     ReactDOM.render(<LandingPage />, document.getElementById('root'))}
                }> Logout </button>

                <div className="styles" id="styles">
                    <h1>Your Event Types</h1>
                    {
                    !this.state.createNewStyle ? (  
                        formStyles.length <= 0 ? (  
                            "Create new form style to begin" 
                        ) : (
                            formStyles.map( style => (
                                <div className="metricSheet">{style}</div>
                            ))
                        )    
                    ) : (
                        <div className="newForm">
                            Name?
                            <br/>
                            <input type="text" onChange={(e) => 
                                this.setState({ newFormTitle: e.target.value })}>
                            </input>
                            <br />
                            How many metrics? 
                            <br />
                            <input type="number" style={{ }} onChange={(e) =>
                                this.setState({ newFormMetrics: e.target.value })}>
                            </input>
                            <br />
                             {
                                 this.metricSheets()
                             }
                           
                            <br />
                            <br />
                            { this.state.newFormMetrics > 0 ? <button onClick={() => this.submitNewStyle()}>Submit</button> : "" }

                            <button onClick = {() =>
                                this.setState({ createNewStyle: false, newFormMetrics: 0 })}>
                                Cancel
                            </button>
                        </div>
                    )
                    }
                    <br />
                    {!this.state.createNewStyle ?
                       
                        <button onClick = {() =>
                             this.setState({ createNewStyle: true })
                         }>Create New Style</button>
                     : ""
                    }
                    <br />
                </div>
            </div>
        </div>
    );
  }
}


/*
 *
 * <div>

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
                 <span className="itemEntry">salary: </span> {form.salary}<br />
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
                onChange={e => this.setState({ formSalary: e.target.value })}
                placeholder="salary?"
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
                   this.putFormToDB(this.state.formName, this.state.formAge, this.state.formGender, this.state.formSalary, this.state.formId, this.state.formAbout)
               }
             >
               Submit Form
             </button>
            </div>
             <div className="w3-container">
               <p> delete all forms </p>
               <button
                onClick={() =>
                        this.deleteAllFormsFromDB()}
               > DELETE ALL
               </button>


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
            <p id="para"> Some Text Here </p>
            <br />
            <button onClick={() => {
                axios.post("http://localhost:3001/api/logout",
                    { user: this.state.user.email });
                ReactDOM.render(<LandingPage />, document.getElementById('root'))
            }}> Return to Landing Page</button>

            </div>
            </div>
          </div>
        </div>
 *
 *
 *
 *
 *
*/



export default App;
