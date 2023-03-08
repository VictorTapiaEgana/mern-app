import imgEdit from "../assets/edit.png";
import imgDelete from "../assets/delete.png";
import "../components/Table.css"

function Table ( { titulo, descripcion,id,contador,handleEliminar,handleModificar }){       

    return(     
       
          <tr key={id}>
            <td>{contador}</td>
            <td>{titulo}</td>
            <td>{descripcion}</td>   
            
            <td>
                <img id={id} 
                     className="iconos" 
                     onClick={()=> handleModificar(id)} 
                     src={imgEdit} 
                     alt="Editar Tarea" 
                />
                
                <img id={id} 
                     className ="iconos"
                     onClick={()=> handleEliminar(id)} 
                     src={imgDelete} 
                     alt="Eliminar Tarea"
                />
               
            </td>   
          
          </tr>         
       
           
    )
   
}

export default Table;