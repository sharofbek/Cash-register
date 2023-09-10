import React, {useEffect, useState} from 'react';
import { Button, Modal, Form, Input} from 'antd';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import {DeleteOutlined ,EditOutlined} from "@ant-design/icons";




const TableJs = () => {

    const [kassa , setKassa] = useState([])

    const [value ,setValue] = useState('')
    const [editName,setEditName] = useState('')


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const showModal = () => {
        setIsModalOpen(isModalOpen => !isModalOpen);
    };
    const showModal2 = () => {
        setEditModal(editModal => !editModal);
    };

    const handleCancel = () => {
        setIsModalOpen(false)
        setEditModal(false)
    }
    useEffect(()=> {
        getKassa()
    },[])

    const getKassa = () => {
        axios({
            url:'http://localhost:5000/users',
            method:'get'
        }).then(res => setKassa(res.data))
    }

    const onSubmit = () => {

        if(value ===''){
            alert("To'ldiring")
        }
        else{
            axios.post("http://localhost:5000/users" , {name:value})
                .then(res => {
                    getKassa()
                    setIsModalOpen(false)
                    setValue("")
                })
        }

    }

    const DeleteKassa = (id) => {
        axios({
            url:`http://localhost:5000/users/${id}`,
            method:'delete',
        }).then(res => {
            getKassa()
        })
    }

    const editKassa = (id) => {
        axios.get(`http://localhost:5000/users/${id}`)
            .then(res => {
                    let name = res.data.name
                    setEditName(name)
                    showModal2()
            })
    }

    const handleSubmit = (id) => {
        axios.put(`http://localhost:5000/users/${id}` , {name:editName})
            .then(res => {
                getKassa()
                setEditModal(false)
            })
    }



    return (
        <div>

            <Modal title="Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <form name="basic"  autoComplete="off" className='text-end' >
                        <input placeholder='Name' value={value} className='form-control my-3' type='text' onChange={(e)=>setValue(e.target.value)} />

                        <Button onClick={e =>onSubmit(e.preventDefault())} type="primary" htmlType="submit">Saqlash</Button>
                </form>
            </Modal>

                <div className="col-md-6 offset-3 my-3 p-5 border rounded">
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-sm-between align-items-center">
                            <h1>Kassa</h1>
                            <div className="row"><Button type="primary" onClick={showModal}>+Add</Button>
                        </div>
                    </div>

                    <table className="table table-hover table-striped table-responsive">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nomi</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            kassa.map((item, index) => <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td className='d-flex gap-3'>
                                    <Button onClick={()=>DeleteKassa(item.id)} danger className='d-flex justify-content-center align-items-center'>
                                        <DeleteOutlined/>
                                    </Button>
                                    <Button onClick={()=>editKassa(item.id)} type={'primary'} className='d-flex justify-content-center align-items-center'>
                                        <EditOutlined/>
                                    </Button>
                                </td>
                                <Modal title="Modal" open={editModal}  onCancel={handleCancel} footer={null}>
                                    <form className='text-end' >
                                        <input className='form-control my-3' value={editName} onChange={e => setEditName(e.target.value)} type="text"/>
                                        <button onClick={() => handleSubmit(item.id)} type='button' className='btn btn-primary text-center'>Update</button>
                                    </form>
                                </Modal>
                            </tr>)
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
};
export default TableJs;