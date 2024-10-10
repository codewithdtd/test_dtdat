let data;
let query;
let token;

let arraySum = [];
let arraySumType2 = [];

const getData = async () => {
    try {
        const response = await fetch('https://test-share.shub.edu.vn/api/intern-test/input', {
            method: 'GET', 
        });
        if (response.ok) {
            const dataAPI = await response.json();
            data = dataAPI.data; 
            query = dataAPI.query; 
            token = dataAPI.token; 
        } else {
            console.error('error:', response.status);
        }
    } catch (error) {
        console.error('error:', error);
    }
}

const handleData = () => {
    let sum = 0;
    let sumType2 = 0;
    for(let i = 0; i < data.length; i++) {
        sum += data[i];
        arraySum[i] = sum;
        if(i % 2 == 0)
            sumType2 = sumType2 + data[i];
        if(i % 2 != 0)
            sumType2 = sumType2 - data[i];
        arraySumType2[i] = sumType2;
    }
}

const handleQuery = (type, l, r) => {
    if (type == 1) {
        if (l == 0)
            return arraySum[r]; 
        else 
            return arraySum[r] - arraySum[l - 1]; 
    } else if (type == 2) {
        if (l == 0) 
            return arraySumType2[r]; 
        else 
            return arraySumType2[r] - arraySumType2[l - 1]; 
    }
}

const outPut = async (result) => {
    try {
        const response = await fetch('https://test-share.shub.edu.vn/api/intern-test/output', {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(result)
        });
        if (response.ok) {
            const dataAPI = await response.json();
            console.log(dataAPI)
        } else {
            console.error('error:', response.status);
        }
    } catch (error) {
        console.error('error:', error);
    }
}


const main = async () => {
    await getData();
    handleData();
    let dataAfterQuery = [];
    query.forEach(element => {
       const result = handleQuery(element.type, element.range[0], element.range[1]);
       dataAfterQuery.push(result)
    });
    await outPut(dataAfterQuery);
}

main();
