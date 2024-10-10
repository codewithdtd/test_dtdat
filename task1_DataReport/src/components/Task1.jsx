import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Task1 = () => {
  const [data, setData] = useState([]); // Lưu dữ liệu sau khi đọc file
  const [timeStart, setTimeStart] = useState('00:00');
  const [timeEnd, setTimeEnd] = useState('23:59');
  const [fileName, setFileName] = useState('');
  const [onLoading, setOnLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]); 
  const [errorMessage, setErrorMessage] = useState('');
  // Xử lý khi người dùng tải file lên
  const handleFileUpload = (file) => {
    // const file = e.target.files[0];
    setFileName(file.name)
    const reader = new FileReader();

    // Đọc file
    setOnLoading(true)
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData); 
      console.log(jsonData)
      setOnLoading(false)
    };
    reader.readAsArrayBuffer(file);
  };

  // Xử lý truy vấn lọc dữ liệu
  const handleQuery = () => {
    const start = new Date(`1970-01-01T${timeStart}:00`);
    const end = new Date(`1970-01-01T${timeEnd}:00`);

    if (end <= start) {
      setErrorMessage('Thời gian kết thúc phải lớn hơn thời gian bắt đầu.');
    } else {
      setErrorMessage(''); // Reset thông báo lỗi
    }
    setOnLoading(true)
    const filtered = data.filter(row => {
      const rowTime = new Date(`1970-01-01T${row['__EMPTY_1']}`); // Thay '__EMPTY_1' bằng tên cột chứa thời gian
      return rowTime >= start && rowTime <= end;
    });
    setFilteredData(filtered);
    setOnLoading(false)
  };

  const uploadFile = async (state = 'Thành công') => {
    if(state == 'Thành công') {
      const newFile = data; 
      toast.success('Upload file thành công !!!')
    }
    else 
      toast.error('Upload file Thất bại !!!')
  }

  useEffect(() => {
    const loadFile = async () => {
      setOnLoading(true);
      const response = await fetch('./src/assets/đề bài test_report.xlsx');
      const fileBlob = await response.blob();
      const file = new File([fileBlob], 'test_report.xlsx');
      handleFileUpload(file);
      setOnLoading(false);
    };

    loadFile();
  }, [])

  return (
    <div className="task1 px-5">
      <ToastContainer autoClose={2000} />
      <h1 className='text-center p-3 font-bold text-3xl'>CHI TIẾT DOANH THU</h1>

      <div className='handleFile flex gap-2 flex-col items-center md:flex-row justify-between'>
        <div className='handleFile__name flex gap-2'>
          <label htmlFor="upload" className='border-2 border-blue-400 text-blue-600 font-medium p-2 px-3 cursor-pointer hover:bg-blue-400 hover:text-white rounded-md bg-blue-200'>Chọn File</label>
          <input id='upload' 
            className='hidden'
            type="file" 
            accept=".xlsx, .xls" 
            onChange={e => handleFileUpload(e.target.files[0])} 
          />
          {fileName ? 
            <div className='name flex items-center'>
              <img src="./src/assets/xlsx.png" alt="" className='logoFile w-10' />
              <p>{fileName}</p>
              <button onClick={e => uploadFile('Thành công')} className='bg-blue-500 hover:bg-blue-700 mx-2 p-2 rounded-md text-white'>Đăng tải</button>
            </div>
          : ''}
        </div>
        <div className='handleFile__query text-gray-600'>
          <input
            type="time"
            value={timeStart}
            className='border border-gray-400 p-1 rounded-md mx-2'
            onChange={e => setTimeStart(e.target.value)}
          />
          -
          <input
            type="time"
            value={timeEnd}
            onChange={e => setTimeEnd(e.target.value)}
            className='border border-gray-400 p-1 rounded-md mx-2'
          />
          {errorMessage && <div className="error">{errorMessage}</div>}
          <button onClick={handleQuery} className='bg-blue-500 hover:bg-blue-700 mx-1 p-2 rounded-md text-white'>Lọc</button>
          <button onClick={e => {setTimeStart('00:00'), setTimeEnd('23:59'), setFilteredData([])}} className='bg-blue-500 hover:bg-blue-700 p-2 rounded-md text-white'>Đặt lại</button>
        </div>
      </div>
      {onLoading ? <p>Đang tải...</p> : ''}
      <table className='table mx-auto border border-gray-500 mt-4' border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr className='border border-gray-500 bg-blue-400'>
            {data.length > 0 &&
              Object.values(data[4]).map((key, index) => (
                <th className='border border-gray-500' key={index}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {(filteredData.length > 0 ? filteredData : data).map((row, index) => 
            index > 4 ? (
              <tr className='border hover:bg-gray-200 border-gray-500 text-center' key={index}>
                {Object.values(data[4]).map((_, i) => {
                  const val = ((i == 0) 
                          ? row['CHI TIẾT DOANH THU'] 
                          : (i == 1) ?  row[`__EMPTY`] 
                          : row[`__EMPTY_${i-1}`]) || ''; // Access the value for the current index, or an empty string
                  return <td className='border border-gray-500' key={i}>{val}</td>;
                })}
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      {data.length > 0 ? '' : <p className='text-center'>Chưa có dữ liệu</p>}
    </div>
  );
}

export default Task1;
