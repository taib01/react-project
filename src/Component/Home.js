import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css" ;
import Agendas from "./Agenda";
import { Link , useNavigate } from 'react-router-dom';
import './home.css' ; 

function Home (){
    let history = useNavigate();

    const handleDelete = (id) =>  {
        var index = Agendas.map(e => {
            return e.id
        }).indexOf(id);

        Agendas.splice(index,1);
        history('/');
    }

    const handleEdit = (id, title, description, status, date, time) =>{
        localStorage.setItem('Id',id);
        localStorage.setItem('Title',title);
        localStorage.setItem('Description',description);
        localStorage.setItem('Status',status);
        localStorage.setItem('Date',date);
        localStorage.setItem('Time',time);
    }

    return (
        <Fragment>
            <div className="Container">
                <div className="w-90 m-2 text-center">
                    <h2 className="text-primary"> React App Agneda CRUD</h2>
                </div>
                <table className=" table table-striped w-90">
                    <thead className="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { Agendas && Agendas.length > 0 
                        ?
                            Agendas.map(item =>{
                                return(
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.status}</td>
                                        <td>{item.date}</td>
                                        <td>{item.time}</td>
                                        <td>
                                            <Link to={"/edit"}>
                                                <button className="btn btn-primary" onClick={() => handleEdit(item.id, item.title, item.description, item.status, item.date, item.time)}> Edit</button>
                                            </Link>
                                            &nbsp;
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}> Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        :
                            "Still Empty"

                        }
                    </tbody>
                </table>
                <Link to={"/create"}  className="w-90">
                    <button className="w-100 btn btn-primary m-2" > Create New Agenda</button>
                </Link>
            </div>
        </Fragment>
    )
}
export default Home ; 
