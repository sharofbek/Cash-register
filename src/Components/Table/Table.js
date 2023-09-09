import React, {useEffect, useState} from 'react';
import { Button, Modal, Form, Input} from 'antd';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import {DeleteOutlined ,EditOutlined} from "@ant-design/icons";




const TableJs = () => {


    const [kassa , setKassa] = useState([])

    const [name ,setName] = useState('')
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
            url:'http://localhost:5000/kassa',
            method:'get'
        }).then(res => setKassa(res.data))
    }

    const onFinish = () => {
        let obj = { name: name }
        axios.post("http://localhost:5000/kassa" , obj)
            .then(res => {
                getKassa()
                showModal()
            })

    }


    const DeleteKassa = (id) => {
        axios({
            url:`http://localhost:5000/kassa/${id}`,
            method:'delete',
        }).then(res => {
            getKassa()
        })
    }

    const editKassa = (id) => {
        axios.get(`http://localhost:5000/kassa/${id}`)
            .then(res => {
                getKassa()
                kassa.map(item => {
                    let name = item.name
                    setEditName(name)
                })
                showModal2()

            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        kassa.map(item => {
            let edit = {name: editName}
            axios.put(`http://localhost:5000/kassa/${item.id}` , edit)
                .then(res => {
                    getKassa()
                })
            setEditModal(false)
            setEditName("")
        })



    }



    return (
        <div>

            <Modal title="Modal" open={isModalOpen}  onCancel={handleCancel} footer={null}>
                <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onFinish} autoComplete="off">
                    <Form.Item label="Name" name="name" rules={[{required: true, message: "Iltimos nom kiriting!!!",},]}>
                        <Input value={name} onChange={(e)=>setName(e.target.value)} />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                        <Button  type="primary" htmlType="submit">
                            Saqlash
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Modal" open={editModal}  onCancel={handleCancel} footer={null}>
                <form onSubmit={handleSubmit}>
                    <input value={editName} onChange={(e) => setEditName(e.target.value)} type="text"/>
                    <button className='btn btn-primary text-center'>Update</button>
                </form>
            </Modal>

                <div className="col-md-6 offset-3 my-3 p-5 border rounded">
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-sm-between align-items-center">
                            <h1>Kassa</h1>
                            <div className="row"><Button type="primary" onClick={showModal}>+Add</Button>
                        </div>
                    </div>

                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nomi</th>
                                <th>
                                </th>
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