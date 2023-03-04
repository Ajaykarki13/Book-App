//let inputtext = document.querySelector(".input")
let btn = document.querySelector("#btn")
let display = document.querySelector(".container")
let array=[];



btn.addEventListener("click", dataDisplay);

function dataDisplay(e) {
    e.preventDefault();
    let time = new Date().toLocaleTimeString();
    let date = new Date().toLocaleDateString();
    let inputtext = document.querySelector(".input")
    let text = inputtext.value;
    let query = text;
    let bookdata;
    let url = `https://www.googleapis.com/books/v1/volumes?q=${text}`
    fetch(url)
        .then(response => response.json())
        .then((data) => { let newarr = data.items; console.log(newarr);
           bookdata = newarr;
          obj={time:time,date:date,query:query,bookdata:bookdata}
          
          let list = localStorage.getItem("searched");
          if(list!=null)
          {
    array=JSON.parse(localStorage.getItem("searched"))
console.log(array); localStorage.setItem("searched",JSON.stringify(array));
array.push(obj);
//dataarray.push(obj) ;
          }
          else
          {  array.push(obj)  }
             display.innerHTML = '';
       // let text = inputtext.value;
       // let filter = newarr.filter((x) => { return (x.volumeInfo["title"].includes(text) || x.volumeInfo["authors"].includes(text)) })

           // console.log(filter)
            newarr.map((books) => {//console.log(books.volumeInfo)
                display.innerHTML +=
    
                    `<div class="card" style="width: 18rem;">
                <img src="${books.volumeInfo.imageLinks["thumbnail"]}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Title: ${books.volumeInfo["title"]}  </h5>
                  <p class="card-text">Author Name: ${books.volumeInfo["authors"]}  </p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Publisher: ${books.volumeInfo["publisher"]} </li>
                  <li class="list-group-item">Publish Date: ${books.volumeInfo["publishedDate"]} </li>
                  <li class="list-group-item">PageCount: ${books.volumeInfo["pageCount"]} </li>
                </ul>
                <div class="card-body">
                <button>Buy link<a href="${books.saleInfo["buyLink"]}"></a></button>
                </div>
              </div>`
             
    
    
            })})
            .catch(error=>console.log("Error",error))

         
           
}
//localStorage.setItem("searched",JSON.stringify(dataarray));
function historyPage()
{
  localStorage.setItem("searched",JSON.stringify(array));
  window.location.href="./history.html";
}

