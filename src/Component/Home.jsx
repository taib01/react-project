import React, {useState, useEffect,Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css" ;
import Agendas from "./Agenda";
import { Link , useNavigate } from 'react-router-dom';
import './home.css' ; 
import { read, utils, writeFile } from 'xlsx';

function Home (){
    let history = useNavigate();
    const [valueInputFile,setValueInputFile]= useState("");

    const handleDelete = (indexId) =>  {
        /* var index = Agendas.map(e => {
            return e.id
        }).indexOf(id); */
        Agendas.splice(indexId,1);
        history('/');
    }

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                console.log(wb);
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);                   
                    Agendas.push(...rows); 
                    setValueInputFile("");            
                    history("/");
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    const handleExport = () => {
        const headings = [[
            'title',
            'description',
            'status',
            'date',
            'time'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, Agendas, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'AgendaT2.xlsx');
    }

    const handleEdit = (id, title, description, status, date, time, index) =>{
        //localStorage.setItem('Id',id);
        localStorage.setItem('Title',title);
        localStorage.setItem('Description',description);
        localStorage.setItem('Status',status);
        localStorage.setItem('Date',date);
        localStorage.setItem('Time',time);
        localStorage.setItem('Index',index);
    }

    useEffect( () => {
    },[])

    return (
        <Fragment>
            <div className="Container py-5">
                <div className="w-90 m-2 text-center">
                    <h2 className="text-primary"> React App Agneda CRUD</h2>
                </div>
                <table className=" table table-striped w-90" >
                    <thead className="table-dark">
                        <tr> 
                            <th scope="col">title</th>
                            <th scope="col">description</th>
                            <th scope="col">status</th>
                            <th scope="col">date</th>
                            <th scope="col">time</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { Agendas && Agendas.length > 0 
                        ?
                            Agendas.map((item,index) =>{
                                return(
                                    <tr key={index+1}>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.status}</td>
                                        <td>{item.date}</td>
                                        <td>{item.time}</td>
                                        <td>
                                            <Link to={"/edit"}>
                                                <button className="btn btn-primary" onClick={() => handleEdit(item.id, item.title, item.description, item.status, item.date, item.time , index)}> Edit</button>
                                            </Link>
                                            &nbsp;
                                            <button className="btn btn-danger" onClick={() => handleDelete(index)}> Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        :
                            "Is Empty"
                        }
                    </tbody>
                </table>
                
                <Link to={"/create"}  className="w-90">
                    <button className="w-100 btn btn-primary my-2" > Create New Agenda</button>
                </Link>
                <div className="w-90 text-left" >
                    <div className="row w-100 p-0 m-0">
                        <div className="custom-file col-6 pr-2">         
                                <input type="file" name="file" value={valueInputFile} className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                <label className="custom-file-label w-100" htmlFor="inputGroupFile">Import Agenda</label>
                        </div>
                        <div className=" col-6 pr-0 pl-2 float-right text-right">
                            <button onClick={handleExport} className="btn btn-primary  m-0 float-right w-100">
                            Export Agenda <i className="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Home ; 
