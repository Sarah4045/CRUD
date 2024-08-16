let title = document.getElementById('title');
let price = document.getElementById('price');
let taxas = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;
 
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxas.value + +ads.value)
        - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }
}


let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxas:taxas.value,
        ads:ads.value,
        discount:discount.value,
        total:total.value,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != ''&& price.value != '' && category.value != '' && newPro.count < 100){
    if(mood === 'create'){
       if(newPro.count > 1){
        for(let i = 0 ; i < newPro.count; i++){
            dataPro.push(newPro);
        }
        }else{
        dataPro.push(newPro);
    }
    }else{
    dataPro[  tmp  ] = newPro;
}
clearDate()
    }
    
    
    localStorage.setItem('product',    JSON.stringify(dataPro)   )

    //console.log(dataPro)
   // clearDate()
    showDate()
}

function clearDate(){
    title.value = '';
    price.value = '';
    taxas.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showDate(){
    let table = '';
    for(let i = 0; i < dataPro.length;i++){
        table +=`
         <tr>
                    <th>${i + 1}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxas}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th onclick="updateDate(${i})" id="update">update </th>
                    <th><button onclick="deleteData(${i})" id='delete">delete</button></th>
        </tr>`
        
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()"> delete All (${dataPro.length}) </button>`
    }else{
        btnDelete.innerHTML = '';
    }
}
showDate()

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showDate()
}

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showDate()
}

function updateDate(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxas.value = dataPro[i].taxas;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
}

let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
search.focus()
search.value = '';
showDate
    
}


function searchDate(value){
    let table = '';
    if(searchMood == 'title'){
        for(let i =0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value)){
                table +=`
         <tr>
                    <th>${i}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxas}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th onclick="updateDate(${i})" id="update">update </th>
                    <th><button onclick="deleteData(${i})" id='delete">delete</button></th>
        </tr>`
            }
        }
    }
    else{
        for(let i =0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value)){
                table +=`
         <tr>
                    <th>${i}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxas}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th onclick="updateDate(${i})" id="update">update </th>
                    <th><button onclick="deleteData(${i})" id='delete">delete</button></th>
        </tr>`
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;
}

