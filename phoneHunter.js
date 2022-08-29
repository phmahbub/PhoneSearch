const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data)
}
// loadPhones()

const displayPhones = (phones) =>{
    // console.log(phones)

    // search message 
    const searchMessage = document.getElementById('search-message')
    if(phones.length ===0){
        searchMessage.classList.remove('d-none')
    }
    else{
        searchMessage.classList.add('d-none')
    }

    //display phone in card and set inner html
    const displayPhone = document.getElementById('display-phone')
    displayPhone.innerHTML = ''
    
    phones.forEach(phone=> {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h3 class="card-title text-center">Brand: ${phone.brand}<br> Model: ${phone.phone_name}</h3>
                  <p class="card-text text-center">${phone.slug}</p>
                </div>
              </div>
        `;
        displayPhone.appendChild(phoneDiv)
    });
    loadSpinner(false)
}

// search phone by name or text
document.getElementById('btn-search').addEventListener('click', function(){
    loadSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText)
})

const loadSpinner = (isLoading) =>{
    const spinner = document.getElementById('btn-spinner')
    if(isLoading){
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none')
    }
}
//add spinner in loading time 
    

