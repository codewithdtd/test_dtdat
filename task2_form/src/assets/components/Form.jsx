import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = (props) => {
    const [data, setData] = useState(null);
    const [validate, setValidate] = useState([])
    const [validateSoLuong, setValidateSoLuong] = useState(false)
    const [validateDoanhThu, setValidateDoanhThu] = useState(false)
    const [validateDonGia, setValidateDonGia] = useState(false)
    const [validateTru, setValidateTru] = useState(false)
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
            tru: '',
            doanhThu: 60000,
            donGia: 19800
        })
    }, [])
    return (
    <div className='form'>
        <ToastContainer autoClose={2000} />
        <form className='main' onSubmit={e => handleSubmit(e)}>
            <div className='header'>
                <div>
                    <ArrowBackIcon />
                    Đóng
                </div>
                <button>Cập nhật</button>
            </div>
            <h1>Nhập giao dịch</h1>
            
            <div className={`input ${validate?.includes('thoiGian') ? 'error' : ''}`}>
                <p htmlFor="">Thời gian</p>
                <input required type="datetime-local" name="" id="" value={data?.thoiGian} onChange={(e) => setData({...data, thoiGian: e.target.value})} />
            </div>
            <div className={`input ${validate?.includes('soLuong') ? 'error' : ''}`}>
                <p htmlFor="">Số lượng</p>
                <input required type="number" min={0} name="" value={data?.soLuong} id="" step={0.01} onChange={(e) => setData({...data, soLuong: e.target.value})} />
            </div>
            <div className={`input ${validate?.includes('tru') ? 'error' : ''}`}>
                <p htmlFor="">Trụ</p>
                <select required name="" id="" value={data?.tru}  onChange={(e) => setData({...data, tru: e.target.value})}>
                    <option value={data?.tru}>{data?.tru || 'Chọn'}</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                </select>
            </div>
            <div className={`input ${validate?.includes('doanhThu') ? 'error' : ''}`}>
                <p htmlFor="">Doanh thu</p>
                <input required type="number" min={0} name="" id="" value={data?.doanhThu} onChange={(e) => setData({...data, doanhThu: e.target.value})}/>
            </div>
            <div className={`input ${validate?.includes('donGia') ? 'error' : ''}`}>
                <p htmlFor="">Đơn giá</p>
                <input required type="number" min={0} name="" id="" value={data?.donGia} onChange={(e) => setData({...data, donGia: e.target.value})} />
            </div>
        </form>

        {/* <div className='main'>
            <div className={`input ${validate?.includes(key) ? 'error' : ''}`}>
                <FormControl fullWidth
                    size='small'
                    sx={{
                        backgroundColor: '', 
                        mt: 1.4,  
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '', 
                            '& fieldset': {
                            border: 'none',       
                            },
                            '&:hover fieldset': {
                            border: 'none',        
                            },
                            '&.Mui-focused fieldset': {
                            border: 'none',       
                            },
                        },
                    }}
                >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Thời gian"
                        views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </LocalizationProvider>
                </FormControl>
            </div>
            <div className={`input ${validate?.includes(key) ? 'error' : ''}`}>
                <FormControl fullWidth
                    size='small'
                    sx={{
                        backgroundColor: '', 
                        mt: 1.4,  
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '', 
                            '& fieldset': {
                            border: 'none',       
                            },
                            '&:hover fieldset': {
                            border: 'none',        
                            },
                            '&.Mui-focused fieldset': {
                            border: 'none',       
                            },
                        },
                    }}
                >
                    <TextField id="outlined-soluong" 
                        label="Số lượng" 
                        variant="outlined" 
                        defaultValue={0}
                        value={data?.soLuong} 
                        type='number'
                        inputProps={{ min: 0, step: 0.01 }} 
                        onChange={(e) => setData({...data, soLuong: e.target.value})}
                    />
                </FormControl>
            </div>
            <div className={`input ${validate?.includes(key) ? 'error' : ''}`}>
                <FormControl fullWidth
                    size='small'
                    sx={{
                        backgroundColor: '', 
                        mt: 1.4,  
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '', 
                            '& fieldset': {
                            border: 'none',       
                            },
                            '&:hover fieldset': {
                            border: 'none',        
                            },
                            '&.Mui-focused fieldset': {
                            border: 'none',       
                            },
                        },
                    }}
                >
                    <TextField id="outlined-soluong" 
                        label="Trụ" 
                        variant="outlined" 
                        defaultValue={0}
                        value={data?.tru} 
                        type='number'
                        inputProps={{ min: 0, step: 0.01 }} 
                        onChange={(e) => setData({...data, tru: e.target.value})}
                    />
                </FormControl>
            </div>
            <div className={`input ${validate?.includes(key) ? 'error' : ''}`}>
                <FormControl fullWidth
                    size='small'
                    sx={{
                        backgroundColor: '', 
                        mt: 1.4,  
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '', 
                            '& fieldset': {
                            border: 'none',       
                            },
                            '&:hover fieldset': {
                            border: 'none',        
                            },
                            '&.Mui-focused fieldset': {
                            border: 'none',       
                            },
                        },
                    }}
                >
                    <TextField id="outlined-soluong" 
                        label="Doanh thu" 
                        variant="outlined" 
                        defaultValue={0}
                        value={data?.doanhThu} 
                        type='number'
                        inputProps={{ min: 0, step: 0.01 }} 
                        onChange={(e) => setData({...data, doanhThu: e.target.value})}
                    />
                </FormControl>
            </div>
            <div className={`input ${validate?.includes(key) ? 'error' : ''}`}>
                <FormControl fullWidth
                    size='small'
                    sx={{
                        backgroundColor: '', 
                        mt: 1.4,  
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '', 
                            '& fieldset': {
                            border: 'none',       
                            },
                            '&:hover fieldset': {
                            border: 'none',        
                            },
                            '&.Mui-focused fieldset': {
                            border: 'none',       
                            },
                        },
                    }}
                >
                    <TextField id="outlined-soluong" 
                        label="Đơn giá" 
                        variant="outlined" 
                        defaultValue={0}
                        value={data?.donGia} 
                        type='number'
                        inputProps={{ min: 0, step: 0.01 }} 
                        onChange={(e) => setData({...data, donGia: e.target.value})}
                    />
                </FormControl>
            </div>
        </div> */}
    </div>
  );
}

export default Form