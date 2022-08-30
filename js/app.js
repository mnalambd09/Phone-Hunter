const loadPhone = (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

const displayPhone = (phones) => {
    const phoneDiv = document.getElementById('addPhone');
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

document.getElementById('phoneSearch').addEventListener('click', function(){
    const inputField = document.getElementById('SearchField');
    const inputFieldText = inputField.value;
    loadPhone(inputFieldText);
    inputField.value = '';
})

loadPhone();