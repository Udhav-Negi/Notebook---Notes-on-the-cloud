import React, { useEffect, useState, useContext } from 'react'
import {Context} from '../context/IdContext';


const Notes = (props) => {
    const [load, setLoad] = useState(false)
    const [data, setData] = useState({ name: "", desc: "", tag: "", invalid: false, complete: false });
    const [modal, setModal] = useState({ id: "", ename: "", edesc: "", etag: "" })
    const [note, setNote] = useState([])
    const context = useContext(Context)
    const {login, setLogin} = context;


    
    useEffect(() => {
        setLogin(true)
        async function getData() {
            let user = sessionStorage.getItem('user')
            let info = await fetch(`http://localhost:80/notes/getnotes/${user}`)
            info = await info.json();
            setNote(info)
            setData({name: "", desc: "", tag: "", invalid: false,complete : true})
        }
        getData()
    }, [load])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.name.length >= 5 && data.desc.length >= 5 && data.tag.length >= 3) {
            try {
                let user = sessionStorage.getItem('user')
                await fetch(`http://localhost:80/notes/addnotes/${user}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: data.name, desc: data.desc, tag: data.tag, id: user })
                })
                setData({ name: "", desc: "", tag: "", invalid: false, complete: false })
                props.showAlert('Note Added', "success")
                setLoad(!load)
                
                
            } catch (error) {
                
            }
        }
        else {
            setData({ name: "", desc: "", tag: "", invalid: true })
            props.showAlert('Please enter valid note', "danger")
        }
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name] : value})
    }


    const launchModal = async (e, elem) => {
        e.preventDefault();
        setModal({ id: elem._id, ename: elem.name, edesc: elem.desc, etag: elem.tag })
    }
    const handleModalChange = (e) => {
        e.preventDefault()
        let name = e.target.name;
        let value = e.target.value;
        setModal({...modal, [name] : value})
    }


    const submitUpdate = async (e, id, name, desc, tag) => {
        e.preventDefault()
        try {
            if(modal.ename.length >= 5 && modal.edesc.length >= 5 && modal.etag.length >= 3)
            {
                await fetch(`http://localhost:80/notes/updatenote/${modal.id}`, {
                    method: "put",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ name: modal.ename, desc: modal.edesc, tag: modal.etag })
                })
                
                props.showAlert("Update Successfull", "info")
                setModal({ id: "", ename: "", edesc: "", etag: "" })
                setLoad(!load)
                

            }
            else{
                props.showAlert("Update Unsuccessfull, Plaease provide valid data", "danger", 3000)
            }
        }
        catch (error) {

        }
    }

    const deleteNote = async (e, id) => {
        e.preventDefault()
        try {
            let resp = await fetch(`http://localhost:80/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            resp = await resp.json();
            if (resp.deleted) {
                let newNotes = note.filter((elem) => { return elem._id !== id });
                setNote(newNotes)
                props.showAlert('Note Deleted', "warning")
                
            }

        } catch (error) {
        }

    }
    return (
        <>
            <div className="container">
                <h1 className="text-center">Add Notes</h1>
                <div className="row">
                    <div className="col">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" className='form-control' value={data.name} onChange={handleChange} />
                                {data.invalid && <small className="form-invalid text-danger">Name should be atleast five chaaracters long </small>}

                            </div>
                            <div className="form-group">
                                <label htmlFor="desc">Description</label>
                                <input type="text" id="desc" name="desc" className='form-control' value={data.desc} onChange={handleChange} />
                                {data.invalid && <small className="form-invalid text-danger">Description should be atleast five chaaracters long </small>}

                            </div>
                            <div className="form-group">
                                <label htmlFor="tag">Tag</label>
                                <input type="text" id="tag" name="tag" className='form-control' value={data.tag} onChange={handleChange} />
                                {data.invalid && <small className="form-invalid text-danger">Tag should be atleast three chaaracters long </small>}
                            </div>
                            <button className={'btn btn-success my-3 '}>Add Note</button>
                        </form>
                    </div>
                </div>
            </div>


            {/* Modal starts here */}
            <div className="modal modal-dismissable fade" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className=''>Update Note</h3>
                            <button className='btn-close' data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" className='form-group'>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" name="ename" className='form-control' value={modal.ename} onChange={handleModalChange}/>
                                </div>

                                <div>
                                    <label htmlFor="desc">Description</label>
                                    <input type="text" id="desc" name="edesc" className='form-control' value={modal.edesc} onChange={handleModalChange} />
                                </div>

                                <div>
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" id="tag" name="etag" className='form-control' value={modal.etag} onChange={handleModalChange}/>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button className='btn btn-success' data-bs-dismiss="modal" onClick={(e) => {submitUpdate(e)}}>Update</button>

                            <button className='btn btn-danger' data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal ends here  */}


            <div className="container" >
                <div className="row">
                    {note.map((elem) => {
                        return (
                            <div className="col-md-4" key={elem._id.toString()}>
                                <div className="card rouded mt-md-2">
                                        <div className="card-header">
                                                <i className="fa-solid fa-trash mx-2" onClick={(e) => { deleteNote(e, elem._id) }}></i> 
                                                <i className="fa-solid fa-marker mx-2" data-bs-toggle="modal" data-bs-target=".modal" onClick={(e) => { launchModal(e, elem) }}></i>
                                        </div>
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{elem.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{elem.tag}</h6>
                                        <p className="card-text">{elem.desc}</p>
                                        <p>{elem.date}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes