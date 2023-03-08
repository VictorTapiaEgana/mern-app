import { useState,useEffect } from "react";
import Table from "./components/Table.jsx";
import "./App.css";

//instalar el Servidor de Node en Otra pagina
//y llamar la nueva direccion
const DIRECCION = `https://servidordenodemernstack.vercel.app/api/task`;

const Tareas = []; 
let Modificar = false;
let ModId='';

function App() {

  const [Title,setTitle] = useState('');
  const [Description,setDescription] = useState('');
  const [Array,setArray]=useState([]);

//agregar nueva/modificar tarea
  const addTask = (e) => {
    //crear la tarea nueva
    const NewTask = {
      "title": Title,      
      "description": Description,
    };  

    !Modificar ? (
    fetch(DIRECCION,{
          // mode: 'no-cors',
          method:'POST',
          body: JSON.stringify(NewTask),          
          headers:{
              'Accept' : 'application/json',
              'Content-Type':'application/json'
          }
    })
    
    .then(res =>  {
        M.toast({html:"Tarea Guardada"});        
        const domTitle = document.getElementById("title");
        domTitle.value='';
        domTitle.focus();
        document.getElementById("description").value="";
        setTitle('');
        setDescription('');        
        retrieveTasks();        
    })

    .catch(err => console.log(err)
    )

    ) : (
      //hacer PUT por Id
      fetch(`${DIRECCION}/${ModId}`,{
        // mode: 'no-cors',
        method:'PUT',
        body: JSON.stringify(NewTask),          
        headers:{
            'Accept' : 'application/json',
            'Content-Type':'application/json'
        }
      })
      .then(res =>{
        M.toast({html:"Tarea Modificada"})
        const domTitle = document.getElementById("title");
        domTitle.value='';
        domTitle.focus();
        document.getElementById("description").value="";
        document.querySelector(".btn").textContent="AGREGAR TAREA";
        setTitle('');
        setDescription('');        
        retrieveTasks();  
        Modificar=false;      

      })
      .catch(err => console.log(err))
  )

    e.preventDefault();
  }; 
//obtener Datos
  const retrieveTasks = () => {

       fetch(DIRECCION)
        .then(res => res.json())        
        .then(data => {
          setArray(data)          
        })
        .catch(err => console.log(err));          
  };  
//eliminar Datos
  const  handleEliminar = (id) =>{
   
  //   let ArrayFiltrado = Array.filter(datos => datos._id != id);
  //   setArray(ArrayFiltrado);
    
  //ELIMINAR DATOS DESDE MONGO Y LLAMAR RETRIEVE, NO USAR sEtarAy

            fetch(`${DIRECCION}/${id}`,{
            method:'DELETE',      
            headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            }
          })
          .then(res =>{
              console.log(res.json());
              M.toast({html:"Tarea Eliminada"});
              retrieveTasks();
          })            
  };      
//modificar
  const handleModificar = (id) =>{
    
    const NewData =Array.filter(item => item._id === id)
    
    document.querySelector("#title").value=NewData[0].title;
    document.querySelector("#description").value=NewData[0].description;
    document.getElementById("title").focus();
    document.querySelector(".btn").textContent="MODIFICAR";
    
    setTitle(NewData[0].title);
    setDescription(NewData[0].description)

    ModId = id;
    Modificar =true ; 
   
  };

  //se ejecuta 1 vez al cargar el componente
  useEffect(() => { 
    retrieveTasks();    
  }, [])
    
//returnnnn
  return (
    <div>
      {/* navegacion */}
      <nav className="light-blue darken-4">
        <div className="container">
          <a className="brand-logo" href="/">
            <img src="https://camo.githubusercontent.com/85cf7e1a8b85221e81ba91cbce29c917b91a7390bb3ca06aa31cfd1eadd7fe60/68747470733a2f2f7777772e337269746563686e6f6c6f676965732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031392f31312f4d45524e2d537461636b2d547261696e696e672d696e2d50756e652d65313537353032323432373234342e706e67" alt="MERN logo" height="65" />
          </a>
        </div>
      </nav>
      {/* */}
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-content">
                <form onSubmit={addTask}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Titulo Tarea"
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea
                        className="materialize-textarea"
                        id="description"
                        name="description"
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descripcion Tarea"
                      ></textarea>
                    </div>
                  </div>
                  <button className="btn light-blue darken-4">
                    Agregar Tarea
                  </button>
                </form>
              </div>
            </div>
          </div>
          </div>
          <div className="row">
          <div className="col s7">
          <table className="highlight" >
            <thead>
                <tr>
                  <th>#</th>
                  <th>Titulo</th>
                  <th>Descripcion</th>       
                  <th>Opciones</th>       
                </tr>
            </thead>
            <tbody>
            {              
           
              Array.map((item,index) =>{              
                return(
                    <Table  
                          key={item._id}
                          contador={index+1}
                          id={item._id}
                          titulo = {item.title}
                          descripcion={item.description}
                          handleModificar={handleModificar}
                          handleEliminar={handleEliminar}
                          >                          
                    </Table>                     
                )                
              })
            }  
              </tbody>          
             </table>          
          </div>            
        </div>
        
      </div>
    </div>
  );

}

export default App;