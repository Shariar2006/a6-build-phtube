


const loadCategory = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
  const data = await res.json()
  const btns = data.data;
  displayBtns(btns);
}

const displayBtns = btns => {
  const btnContainer = document.getElementById('btn-container');
  btns.forEach(btn => {
    const categoriesBtn = document.createElement('div')
    categoriesBtn.classList = `text-center flex-row`;
    categoriesBtn.innerHTML = `<button class="text-white text-xs font-medium bg-[#FF1F3D] py-[10px] px-[10px] lg:px-[20px] rounded-md" onClick=loadPhTube(${btn.category_id})>${btn.category}</button>`
    btnContainer.appendChild(categoriesBtn)
  })
}

loadCategory()

const defaultTube = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
  const data = await res.json();
  const cards = data.data;
  displaycards(cards)
}

const loadPhTube = async (categoryId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
  const data = await res.json();
  const cards = data.data;
  displaycards(cards)
}

function timeConvert(seconds) {
  seconds = Number(seconds);

  let day = Math.floor(seconds / 86400);
  let hour = Math.floor(seconds / 3600);
  let minute = Math.floor(seconds % 3600 / 60);

  let dayDisplay = day > 0 ? day + (day == 1 ? " day, " : " days, ") : "";
  let hourDisplay = hour > 0 ? hour + (hour == 1 ? " hour, " : " hours, ") : "";
  let minuteDisplay = minute > 0 ? minute + (minute == 1 ? " minute, " : " minutes, ") : "";
  return(dayDisplay + hourDisplay + minuteDisplay)
}


const displaycards = cards => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = "";
    const errorContainer = document.getElementById('errorContainer')
    errorContainer.innerHTML = "";
    const errorMsg = document.createElement('div');
    
    {
      cards.length ?
      cards.forEach(card => {
        const tubeCard = document.createElement('div')
        tubeCard.classList = `card mx-auto p-3 bg-base-100 shadow-xl w-[312px]`
        tubeCard.innerHTML =
          `<figure><img class="relative" src="${card.thumbnail}" alt="" /> 
            <span class="absolute right-6 text-xs top-36 text-white font-semibold bg-gray-900 p-1 rounded">${timeConvert(card?.others?.posted_date)}</span>
          </figure>
          <div class="mt-5 gap-3 flex">
            <div class="w-8">
            <img class="rounded-full" src="${card.authors[0].profile_picture}" alt="" />
            </div>
            <div>
            <h2 class="card-title text-black">${card.title}</h2>
            <h2 class=" text-gray-500 text-xs">${card.authors[0].profile_name}
            <span>${card?.authors[0].verified ? `<i class="fa-solid fa-circle-check"></i>` : " " }</span></h2>
            <h2 class="text-gray-500 text-xs">${card.others.views}</h2>
            </div>
          </div>
        </div>`
  
        cardContainer.appendChild(tubeCard)
      })
      :
        
        errorMsg.innerHTML =
          `
          <figure><img class="mx-auto mt-24 justify-center items-center" src="Icon.png" alt="icon"/></figure>
          <p class="text-center font-bold text-3xl">Oops!! Sorry, There is no content here</p>
          `
        }
        errorContainer.appendChild(errorMsg)
  }


defaultTube();