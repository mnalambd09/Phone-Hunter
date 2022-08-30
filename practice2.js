const loadPhone = async(search) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
}

const displayPhone = (phones) => {
    const phoneDiv = document.getElementById('phoneSection');
    phones = phones.slice(0, 20);
    const noPhone = document.getElementById('phone-result');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    phoneDiv.textContent = '';
    phones.forEach(phone => {
        const creatDiv = document.createElement('div');
        creatDiv.classList.add('col');
        creatDiv.innerHTML = `
        <div class="card p-5">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
        `;
        phoneDiv.appendChild(creatDiv);
    });
}

document.getElementById('Search-btn').addEventListener('click', function(){
    const inputField = document.getElementById('Search-field');
    const inputFieldText = inputField.value;
    loadPhone(inputFieldText);
    inputField.value = '';
})



loadPhone();