import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { Select, Space ,DatePicker } from 'antd';
import { Button, Modal } from 'antd';
import axios from "axios";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";


const Income = () => {

    let today = new Date()
    let Data = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()


    const [getUser , setGetUser] = useState([])
    const [date ,setDate ] = useState(Data)
    const [amount, setAmount] = useState('')
    const [amountValue, setAmountValue] = useState([])
    const [userName , setUserName] =useState('')
    const [nameKassa , setNameKassa ] = useState('')

    useEffect(() => {
        getUsers()
    },[])


    const [titleUser, setTitleUser] = useState('Foydalanuvchi tanlang');
    const [titleKassa, setTitleKassa] = useState('Kassani tanlang');


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(isModalOpen => !isModalOpen);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onKassa = (value) => {
        setTitleKassa(value);
    };
    const onUser = (value) => {
        setTitleUser(value);
    };


    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };


    const getUsers = () => {
        axios.get('http://localhost:5000/users')
            .then(res => setGetUser(res.data))
    }


    const addIncome = () => {
        if(amount === ''){
            alert('Miqdorini kiriting')
        }
        else{
            axios({
                url:'http://localhost:5000/users',
                method:'post',
                data: {userName:titleUser,name:titleKassa,amount:amount}
            }).then(res=> {
                getUsers()
                setAmount('')
            })

        }


    }

    const DeleteIn = (id) => {
        axios.delete(`http://localhost:5000/users/${id}`)
            .then(res => {
                getUsers()
            })
    }

    const  editIn = (id) => {
        axios.get(`http://localhost:5000/users/${id}`)
            .then(res => {
                setUserName(res.data.userName)
                setAmountValue(res.data.amount)
                setNameKassa(res.data.name)
                showModal()
                getUsers()
            })
    }

    const onSubmit = (id) => {
        axios.put(`http://localhost:5000/users/${id}` , {userName:userName,amount:amountValue,name:nameKassa})
            .then(res => {
                getUsers()
                showModal()
            })
    }


    return (
        <div>


            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">

                <div className="offcanvas-header">
                    <h5 id="offcanvasRightLabel">Offcanvas right</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close">.</button>
                </div>
                <div className="offcanvas-body d-flex flex-column gap-4">

                    <Select style={{width: '100%',}} value={titleUser} onChange={onUser} options={getUser.map((item) => ({label: item.userName, value: item.userName,}) )}/>
                    <Select style={{width: '100%',}} value={titleKassa} onChange={onKassa} options={getUser.map((item) => ({label: item.name, value: item.name,}) )}/>

                    <input value={amount} onChange={e=> setAmount(e.target.value)} type="number" className='form-control' placeholder='$' />
                    <DatePicker onChange={onChange} />
                    <button data-bs-dismiss="offcanvas" aria-label="Close" onClick={addIncome} className='btn btn-primary'>Saqlash</button>
                </div>
            </div>


            <div className="row">
                <div className="col-md-8 offset-2 border my-5 p-3 rounded">
                    <div className="col-md-12 d-flex justify-content-between align-items-center ">
                        <h1>Kirim</h1>
                        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">+Add</button>
                    </div>
                    <table className='table table-hover my-5'>
                        <thead className='table-info'>
                            <tr>
                                <th>ID</th>
                                <th>User Name</th>
                                <th>Amount</th>
                                <th>Cash Register</th>
                                <th>Time</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            getUser.map((user ,index) => <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.userName}</td>
                                <td>{user.amount} $</td>
                                <td>{user.name}</td>
                                <td>{date}</td>
                                <td className='d-flex gap-1'>
                                    <button className='btn btn-danger' onClick={()=>DeleteIn(user.id)}><DeleteOutlined/></button>
                                    <button className='btn btn-primary' onClick={() => editIn(user.id)}><EditOutlined/></button>
                                </td>
                                <Modal title="Basic Modal" open={isModalOpen} footer={null} onCancel={handleCancel}>
                                    <input value={userName} onChange={e=> setUserName(e.target.value)} type="text" className='form-control'/>
                                    <input value={amountValue} onChange={e=> setAmountValue(e.target.value)} type="text"  className='form-control my-3'/>
                                    <input className='form-control' type="text" value={nameKassa} onChange={e=> setNameKassa(e.target.value)}/>
                                    <button className="btn btn-primary my-3" onClick={()=>onSubmit(user.id)} >Submit</button>
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

export default Income;