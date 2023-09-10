import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Button, Modal, Form, Input} from 'antd';
import {DeleteOutlined ,EditOutlined} from "@ant-design/icons";
import 'bootstrap/dist/css/bootstrap.min.css'

const Users = () => {

    const [userValue , setUserValue] = useState("")
    const [userEditValue , setUserEditValue] = useState("")
    const [users , setUsers] = useState([])
    const [openModal , setOpenModal] = useState(false)
    const [openEditModal ,setOpenEditModal] = useState(false)

    useEffect(() => {
        getUsers()
    })

    const handleCancel = () => {
        setOpenModal(false)
        setOpenEditModal(false)
    }
    const showModal = () => {
        setOpenModal(openModal => !openModal)
    }
    const editModal = () => {
        setOpenEditModal(openEditModal => !openEditModal)
    }
    const getUsers = () => {
        axios.get('http://localhost:5000/users')
            .then(res => setUsers(res.data))
    }

    const addUsers = () => {
        if(userValue === ''){
            alert("User qo'shing")
        }
        else{
            axios.post( `http://localhost:5000/users` ,{userName:userValue})
                .then(res => {
                    getUsers()
                    showModal()
                    setUserValue('')
                })
        }
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost:5000/users/${id}`)
            .then(res => {
                getUsers()
            })
    }

    const editUser = (id) => {
        axios.get(`http://localhost:5000/users/${id}`)
            .then(res => {
                getUsers()
                setUserEditValue(res.data.userName)
                editModal()
            })
    }
    const updateUser = (id) => {
        if(userEditValue === ''){
            alert("Iltimos to'ldiring")
        }
        else{
            axios.put(`http://localhost:5000/users/${id}` , {userName:userEditValue})
                .then(res => {
                    getUsers()
                    setOpenEditModal(false)
                })
        }
    }
    return (
        <div>

            <Modal title="Modal" open={openModal} onCancel={handleCancel} footer={null}>
                <form className='text-end'>
                    <input placeholder='Name User' className='form-control' value={userValue} onChange={e => setUserValue(e.target.value) } type="text"/>
                    <button className='btn btn-success my-3' type={'submit'} onClick={e => addUsers(e.preventDefault())}>Submit</button>
                </form>
            </Modal>



            <div className="row">
                <div className="col-md-6 offset-3 my-5 border rounded p-3">
                    <div className="row justify-content-sm-between align-items-center">
                        <div className="col-md-6"> <h1>Users</h1> </div>
                        <div onClick={showModal} className="col-md-6 text-end"> <Button>+Add Users</Button> </div>
                    </div>

                    <table className='table table-striped table-hover my-5'>
                        <thead>
                            <tr className='table-dark'>
                                <th>ID</th>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((item,index) => <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td className='d-flex gap-3'>
                                    <Button onClick={() => deleteUser(item.id)} danger className='d-flex justify-content-center align-items-center'><DeleteOutlined/></Button>
                                    <Button onClick={() => editUser(item.id)} type='primary' className='d-flex justify-content-center align-items-center'><EditOutlined/></Button>
                                </td>
                                <Modal title="Modal" open={openEditModal} onCancel={handleCancel} footer={null}>
                                    <div className='text-end'>
                                        <input placeholder='Name User' className='form-control' value={userEditValue} onChange={e => setUserEditValue(e.target.value) } type="text"/>
                                        <button  className='btn btn-success my-3' type={'button'} onClick={()=> updateUser(item.id)}>Submit</button>
                                    </div>
                                </Modal>
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;