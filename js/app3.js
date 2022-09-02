const loadPhone = async(search, dataLimite) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimite)
}

const displayPhone = (phones, dataLimite) => {
        
        const showMore = document.getElementById('showMore');
        if(dataLimite && phones.length > 10){
            phones = phones.slice(0, 10);
            showMore.classList.remove('d-none')
        }
        else{
            showMore.classList.add('d-none')
        }

    const displayPhoneDiv = document.getElementById('DisplayData');
    const notFound = document.getElementById('notFound');
      
    if(phones.length === 0){
        notFound.classList.remove('d-none');
    }
    else{
        notFound.classList.add('d-none');
    }
    displayPhoneDiv.textContent = '';
    phones.forEach(phone => {
        const creatDiv = document.createElement('div');
        console.log(phone.phone_name)
    creatDiv.classList.add('col');
    creatDiv.innerHTML = `
    <div class="card">
    <img src="${phone.image}" class="card-img-top p-5" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <button class="btn btn-primary" onclick="loadPhoneDetails('${phone.slug}')">Details</button>
    </div>
  </div>
    `;
    displayPhoneDiv.appendChild(creatDiv);
    });
    
}
const proccessData = (dataLimite) => {
    const SearchField = document.getElementById('searchInput');
    const searchInputText =  SearchField.value; 
    loadPhone(searchInputText, dataLimite);
    // console.log(loadPhone());
    // SearchField.value = '';
}

document.getElementById('search').addEventListener('click', function(){
    proccessData(10);

})

document.getElementById('showAll').addEventListener('click', function(){
    proccessData();
    
    
})
const loadPhoneDetails = async(slug) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    const res = await fetch(url);
    const data = await res.json();
    phoneDetails(data);
}

const phoneDetails = (phones) => {
    const phoneDetails = document.getElementById('phone-details');
    const creDiv = document.createElement('div'); 
    phoneDetails.textContent = '';
    creDiv.innerHTML = `
    <h2>${phones.data.name} </h2>
    <img src="${phones.data.image}">
    <p>Storage : ${phones.data.mainFeatures.storage}</p>
    <p>DisplaySize : ${phones.data.mainFeatures.displaySize}</p>
    <p>ChipSet : ${phones.data.mainFeatures.chipSet}</p>
    <p>Memory : ${phones.data.mainFeatures.memory}</p>
    <p>Sensors : ${phones.data.mainFeatures.sensors}</p>
    <p>Bluetooth : ${phones.data.others ?.Bluetooth ? phones.data.others.Bluetooth : 'bluetooth not found'}</p>
    <p>ReleaseDate : ${phones.data.releaseDate ? phones.data.releaseDate : 'relesase date not found'}</p>
    `; 
    phoneDetails.appendChild(creDiv);
}


loadPhone()


