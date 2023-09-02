const loadPhTube = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000')
    const data = await res.json();
    const cards = data.data;
    displaycards(cards)
}

const displaycards = cards => {
    const cardContainer = document.getElementById('card-container')
    cards.forEach(card => {
        console.log(card.title)
        const tubeCard = document.createElement('div')
        tubeCard.classList = `card w-96 bg-base-100 shadow-xl  w-[312px]`
        tubeCard.innerHTML = 
        `<figure><img src="${card.thumbnail}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${card.title}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>`
      cardContainer.appendChild(tubeCard)
    })
}

loadPhTube()