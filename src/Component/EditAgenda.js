import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css" ; 
import Agendas from "./Agenda";
import { useNavigate } from 'react-router-dom';
import "./AddAgenda.css";

function EditAgenda () {
    
    const [id, setId] = useState(0) ; 
    const [title, setTitle] = useState("") ; 
    const [description, setDescription] = useState("") ; 
    const [status, setStatus] = useState("") ; 
    const [date, setDate] = useState("") ; 
    const [time, setTime] = useState("") ; 
    const [error,setError]= useState(false);
    const [errorTime,setErrorTime]= useState(false);

    let history = useNavigate(); 

    const handleSubmit = (e)=>{
        e.preventDefault();

        //test at all field and validite of date
        if ( title.length==0  ||  status.length==0 ||  date==null ||  time.length==null || date < getDate()) {
            setError(true);
            return ;     
        }

        //test at validité of time about if we have another work in the same time 
        for (let i = 0 ; i < Agendas.length ; i++){
            if (date == Agendas[i].date && time == Agendas[i].time && i != id-1){
                setErrorTime(true);
                return ;
            }
        }
        
        Agendas[id-1] = {
        id : id ,
        title : title ,
        description : description  ,
        status : status ,
        date : date ,
        time : time 
        }  

        history("/");
    }

    const cancel = () => {
        history("/");
    }

    useEffect( () => {
        setId(localStorage.getItem('Id'))
        setTitle(localStorage.getItem('Title'))
        setDescription(localStorage.getItem('Description'))
        setStatus(localStorage.getItem('Status'))
        setDate(localStorage.getItem('Date'))
        setTime(localStorage.getItem('Time'))
    },[])

    const getDate =()=>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = String(today.getFullYear());
        let dateString ;
        //dateString = dd + '-' + mm + '-' + yyyy;
        dateString =  yyyy + '-' + mm + '-' + dd   ;
        return dateString;
    }

    return ( 
        <div className="Container my-5">
            <form className="w-80 card p-5 ">
            <div className="form-group text-center">
                    <h2>Edit {title} </h2>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={title} className="form-control" id="title"   onChange={e => setTitle(e.target.value)}/>
                    <small id="emailHelp" className="form-text text-muted">Try to type signified title.</small>
                    {title.length<=0 && error == true?
                        <label> <small className="text-danger"> Title field is required</small> </label>
                        :<span></span>
                    }
                </div>
                <div className="form-group text-left">
                     <label htmlFor="description">Description</label>
                     <textarea className="form-control" id="description" rows="3" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="status">Status</label>
                    <select className="form-control" value={status} id="status" onChange={e => setStatus(e.target.value)}>
                        <option value="Necessary">Necessary</option>
                        <option value="Necessary and urgent">Necessary and urgent</option>
                        <option value="Unnecessary and urgent">Unnecessary and urgent</option>
                        <option value="Unnecessary and not urgent">Unnecessary and not urgent</option>
                    </select>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="date">Date</label>
                    <input type="date" min={getDate()} value={date} className="form-control" id="date"   onChange={e => setDate(e.target.value)}/>
                    {(date==null || date<getDate() ) && error == true?
                        <label> <small className="text-danger"> Date field is required and cannot be less than current date</small> </label>
                    :   <span></span>
                    }
                </div>
                <div className="form-group text-left">
                    <label htmlFor="time">time</label>
                    <input type="time" value={time} className="form-control" id="time"   onChange={e => setTime(e.target.value)}/>
                    {time==null&& error == true?
                        <label> <small className="text-danger"> Time field is required  </small> </label>
                        :<span></span>
                    }
                    { errorTime == true?
                        <label> <small className="text-danger"> You have another work in this day in the same time  </small> </label>
                        :<span></span>
                    }
                </div>
                <div className="form-group text-left ">
                    <button type="submit" className="w-50 pr-2 btn btn-primary" onClick={(e)=> handleSubmit(e) }>Update</button>
                    <button className=" w-50 pl-2 btn btn-danger" onClick={() => cancel()}> Cancel</button>
                </div>
                
            </form>
        </div>
    )
}
export default EditAgenda ;