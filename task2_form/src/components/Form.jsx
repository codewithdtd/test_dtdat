import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = (props) => {
    const [data, setData] = useState({});
    const [validate, setValidate] = useState([])
    const checkIfDataIsValid = () => {
        if (!data) return false; 
        let newValidate = [...validate]; 

        for (const key in data) {
            if (data[key] === null || data[key] === undefined || data[key] === '') {
                if (!newValidate.includes(key)) {
                    newValidate.push(key); 
                }
            } else {
                newValidate = newValidate.filter((item) => item !== key);
            }
        }

        setValidate(newValidate);

        if (newValidate.length > 0) {
            return false; 
        }
        
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (checkIfDataIsValid()) {
            toast.success('Thành công!')
            setValidate([])
        } else {
            toast.error('Thất bại!!!')
        }
    }
    useEffect(() => {
        setData({
            thoiGian: '2024-10-07 17:25:02',
            soLuong: 3.03,
            tru: '07',
            doanhThu: 60000,
            donGia: 19800
        })
    }, [])
    return (
    <div className='form flex justify-center py-5'>
        <ToastContainer autoClose={2000} />
        <form className='main w-1/2' onSubmit={e => handleSubmit(e)}>
            <div className='header flex justify-between'>
                <div className='flex items-center cursor-pointer hover:text-blue-700'>
                    <ArrowBackIcon />
                    Đóng
                </div>
                <button className='bg-blue-500 text-white p-2 px-4 hover:bg-blue-600 rounded-xl'>Cập nhật</button>
            </div>
            <h1 className='md:text-5xl text-3xl mt-3 font-bold'>Nhập giao dịch</h1>
            
            <div className={`input my-3 border-2 p-1 px-3 rounded-lg ${validate?.includes('thoiGian') ? 'error' : ''}`}>
                <p className='text-sm text-gray-500'>Thời gian</p>
                <input required type="datetime-local" className='w-full outline-none bg-transparent' name="" id="" value={data?.thoiGian} onChange={(e) => setData({...data, thoiGian: e.target.value})} />
            </div>
            <div className={`input my-3 border-2 p-1 px-3 rounded-lg ${validate?.includes('soLuong') ? 'error' : ''}`}>
                <p className='text-sm text-gray-500'>Số lượng</p>
                <input required type="number" min={0} name="" className='w-full outline-none bg-transparent' value={data?.soLuong} id="" step={0.01} onChange={(e) => setData({...data, soLuong: e.target.value})} />
            </div>
            <div className={`input my-3 border-2 p-1 px-3 rounded-lg ${validate?.includes('tru') ? 'error' : ''}`}>
                <p className='text-sm text-gray-500'>Trụ</p>
                <select required name="" id="" value={data?.tru} className='w-full outline-none bg-transparent' onChange={(e) => setData({...data, tru: e.target.value})}>
                    <option value={data?.tru}>{data?.tru || 'Chọn'}</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                </select>
            </div>
            <div className={`input my-3 border-2 p-1 px-3 rounded-lg ${validate?.includes('doanhThu') ? 'error' : ''}`}>
                <p className='text-sm text-gray-500'>Doanh thu</p>
                <input required type="number" min={0} name="" className='w-full outline-none bg-transparent' id="" value={data?.doanhThu} onChange={(e) => setData({...data, doanhThu: e.target.value})}/>
            </div>
            <div className={`input my-3 border-2 p-1 px-3 rounded-lg ${validate?.includes('donGia') ? 'error' : ''}`}>
                <p className='text-sm text-gray-500'>Đơn giá</p>
                <input required type="number" min={0} name="" className='w-full outline-none bg-transparent' id="" value={data?.donGia} onChange={(e) => setData({...data, donGia: e.target.value})} />
            </div>
        </form>
    </div>
  );
}

export default Form