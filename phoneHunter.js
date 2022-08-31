const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit)
}
// loadPhones()

const displayPhones = (phones, dataLimit) =>{
    
    
    // console.log(phones)
    const displayPhone = document.getElementById('display-phone')
    displayPhone.textContent = ''
    //display 10 phones only 
    
    // search message 
    const searchMessage = document.getElementById('search-message')
    const showAllButton = document.getElementById('show-all')
    if(phones.length === 0){
        searchMessage.classList.remove('d-none')
        showAllButton.classList.add('d-none')
    }
    else if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10)
        showAllButton.classList.remove('d-none')
    }
    else{
        searchMessage.classList.add('d-none')
        // showAllButton.classList.add('d-none')
    }

    //display phone in card and set inner html
    
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
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-secondary btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
              </div>
        `;
        displayPhone.appendChild(phoneDiv)
    });
    loadSpinner(false)
}



// search phone by name or text and show only 10
document.getElementById('btn-search').addEventListener('click', function(){
    searchingProcess(10)
})

//load spinner
const loadSpinner = (isLoading) =>{
    const spinner = document.getElementById('btn-spinner')
    if(isLoading){
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none')
    }
}

// searching function and full data load 
const searchingProcess =(dataLimit) => {
    loadSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit)
}

//Enter key search
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        searchingProcess(10)
    }
})

// show phone details in modal 
const loadPhoneDetails = async(id) =>{
    const response = await fetch (` https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await response.json()
    console.log(data.data)
}

