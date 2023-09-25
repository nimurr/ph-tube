const loadTabs = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const allTabData = data.data;
    allTabs(allTabData);
}

const allTabs = (data) => {

    const tabs = document.getElementById('tabs');
    data.forEach(data => {
        // console.log(data)
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="allCards('${data.category_id}')"  href="#"> ${data.category} </a>
        `;
        tabs.appendChild(div);
        allCards(data.category_id);

    })
}

const allCards = async (Id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${Id}`);
    const data = await res.json();
    let allData = data;

    const cards = document.getElementById('cards');
    cards.innerHTML = '';

    const noteFound = document.getElementById('noteFound');
    if (allData.status !== true) {
        noteFound.classList.remove('hidden')
    }
    else {
        noteFound.classList.add('hidden')
    }

    allData = allData.data;

    allData.forEach(data => {
        let totalTime = data.others.posted_date;

        let minute = parseInt(Math.floor((totalTime / 60 )));
        let hours = parseInt(minute / 60);
        let hoursto = parseInt(hours * 60);
        let tosort = parseInt(hours)
        let minutes = Math.abs(hoursto - minute);


        const div = document.createElement('div');
        div.innerHTML = `
                <img class="img-overly" src='${data.thumbnail}' >
                <p id="overly" class="img-overly-text">${tosort < 9999 && tosort?  tosort +'hrs' : ''  }  ${minutes? minutes + 'min ago' : ''}</p>
                <div class="card-body-text">
                    <img src="${data.authors[0].profile_picture}" />
                    <div>
                        <h4>${data.title}</h4>
                        <p>${data.authors[0].profile_name} ${data.authors[0].verified ? '<img src="img/icon.png" />' : ''}</p>
                        <span>${data.others.views} views</span>
                    </div>
                </img>
            `
  

    
        cards.appendChild(div)
    })

}


loadTabs();