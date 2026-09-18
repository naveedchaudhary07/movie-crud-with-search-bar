// alert("hello js");

let cl = console.log;

const addbtn =document.getElementById("addbtn")
const backdrop = document.getElementById("backdrop")
const moviemodel = document.getElementById("moviemodel")
const closeModel = document.getElementById("closeModel")
const closebtn = document.getElementById("closebtn")
const moviecontainer=document.getElementById("moviecontainer");
const formSub = document.getElementById("formSub");
const updatebtn = document.getElementById("updatebtn");
const addmovie = document.getElementById("addmovie")
const searchbarform = document.getElementById("searchbarform")
const search_btn = document.getElementById("search_btn");

const movies = [
  {
    id: "1",
    movieName: "Leo",
    movieImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmuIkVsEvh24r-v6TYjKJD7Ay2m6zxC7dX0Kx4zcC9Mg&s=10",
    movieDescription:
      "Leo is an action thriller about a cafe owner whose mysterious past comes back to haunt him.",
    movieRating: 5
  },
  {
    id: "2",
    movieName: "Jawan",
    movieImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS84g80VX7-psDttEdowNPfgi3Ju7UUAaoRYSSy-OpeUg&s=10",
    movieDescription:
      "Jawan is an action-packed story of a man driven by a personal mission to fight injustice.",
    movieRating: 4
  },
  {
    id: "3",
    movieName: "Animal",
    movieImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjE0esfM-HjK8ahPGL_gYahqRM_K2dTNHDdDEfRD70tw&s=10",
    movieDescription:
      "Animal follows a troubled son whose intense relationship with his father leads him into a world of violence and revenge.",
    movieRating: 5
  },
  {
    id: "4",
    movieName: "Pushpa",
    movieImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXcc9InJIscgXOMFuspl5GnZXS1PwoP1QV4OhZfX6b2A&s=10",
    movieDescription:
      "Pushpa is an action drama about a determined man who rises through the ranks of a red sandalwood smuggling syndicate.",
    movieRating: 4
  }
];

// localStorage.setItem("moviesArr",JSON.stringify(movies));

let getMovies = localStorage.getItem("moviesArr");
let moviesArr;
if (getMovies) {
  moviesArr = JSON.parse(getMovies);
} else {
  moviesArr = movies;
  localStorage.setItem("moviesArr", JSON.stringify(moviesArr));
}


function setrating(rating){
if(rating >=4){
return "badge-success"
}
else if(rating< 4 && rating >=3){
    return "badge-warning"
}
else{return "badge-danger"}
}



// read functionality.....

function readmoviesdata(arr){
    let result ="";
   arr.forEach(ele => {
     result +=`  <div class="col-xl-4 col-sm-12 col-md-6 col-lg-3 mb-4 movies movies-item" id="${ele.id}">
          <div class="card movie-card">
            <div class="card-header d-flex justify-content-between">
              <h4 class="mb-0 movie-heading movie-title">${ele.movieName}</h4>
              <h4><span class="badge ${setrating(ele.movieRating)}">${ele.movieRating}</span></h4>
            </div>
            <div class="card-body p-0">
              <figure>
                <img src="${ele.movieImage}" alt="${ele.movieName}" title="${ele.movieName}" />
                <figcaption>
                  <h4 class="mb-0">${ele.movieName}</h4>
                  <p>${ele.movieDescription} </p>
                </figcaption>
              </figure>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <button onclick="onedithandler(this)" class="btn btn add-btn edit-btn">Edit</button>
              <button class="btn btn add-btn update-btn d-none">Update</button>
              <button onclick="onremovehandler(this)" class="btn btn delete-btn">Remove</button>
            </div>
          </div>
        </div>`
   });

    moviecontainer.innerHTML= result;

}

readmoviesdata(moviesArr);





// create functionality...
function onsubmit(eve){
eve.preventDefault()
const moviename=document.getElementById("moviename")
const movieimage=document.getElementById("movieimage")
const movieDesc=document.getElementById("movieDesc")
const movieRat=document.getElementById("movieRat")

let new_obj={
    id:Date.now().toString(),
    movieName : moviename.value,
    movieImage: movieimage.value,
    movieDescription: movieDesc.value,
    movieRating: movieRat.value
}
ontoggle()
formSub.reset()
moviesArr.unshift(new_obj)
localStorage.setItem("moviesArr",JSON.stringify(moviesArr));
let movie_div=document.createElement("div")

movie_div.className="col-xl-4 col-sm-12 col-md-6 col-lg-3 mb-4 movies movies-item"
movie_div.id=`${new_obj.id}`
movie_div.innerHTML=`<div class="card movie-card">
            <div class="card-header d-flex justify-content-between">
              <h4 class="mb-0 movie-heading movie-title">${new_obj.movieName}</h4>
              <h4><span class="badge ${setrating(new_obj.movieRating)}">${new_obj.movieRating}</span></h4>
            </div>
            <div class="card-body p-0">
              <figure>
                <img src="${new_obj.movieImage}" alt="${new_obj.movieName}" title="${new_obj.movieName}" />
                <figcaption>
                  <h4 class="mb-0">${new_obj.movieName}</h4>
                  <p>${new_obj.movieDescription}</p>
                </figcaption>
              </figure>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <button onclick="onedithandler(this)" class="btn btn add-btn edit-btn">Edit</button>
              <button class="btn btn add-btn update-btn d-none">Update</button>
              <button onclick="onremovehandler(this)" class="btn btn delete-btn">Remove</button>
            </div>
          </div>
        </div>`

    moviecontainer.prepend(movie_div);
  Swal.fire({
  title: `${new_obj.movieName} Movie Added Successfully!`,
  icon: "success",
  draggable: true
});
}


// edit functionality....

function onedithandler(ele){
   ontoggle()
 let edit_id = ele.closest(".movies").id
 localStorage.setItem("update_id",edit_id);
   addmovie.classList.add("d-none")
   updatebtn.classList.remove("d-none")

 
 
 let edit_obj =moviesArr.find((ele)=> ele.id===edit_id); 
 const moviename=document.getElementById("moviename")
 const movieimage=document.getElementById("movieimage")
 const movieDesc=document.getElementById("movieDesc")
 const movieRat=document.getElementById("movieRat")
 
 moviename.value=edit_obj.movieName
 movieimage.value=edit_obj.movieImage
 movieDesc.value=edit_obj.movieDescription
 movieRat.value=edit_obj.movieRat

}


// update functionality....

function onupdatehandler(){
let update_id = localStorage.getItem("update_id");
 
 const moviename=document.getElementById("moviename")
const movieimage=document.getElementById("movieimage")
const movieDesc=document.getElementById("movieDesc")
const movieRat=document.getElementById("movieRat")
let update_obj ={
  id:update_id,
    movieName : moviename.value,
    movieImage: movieimage.value,
    movieDescription: movieDesc.value,
    movieRating: movieRat.value
}
let update_idx= moviesArr.findIndex((ele) => ele.id === update_id);
moviesArr[update_idx]=update_obj;
localStorage.setItem("moviesArr",JSON.stringify(moviesArr));


let update_div=document.getElementById(update_id)
localStorage.removeItem("update_id")

update_div.innerHTML=`<div class="card movie-card">
            <div class="card-header d-flex justify-content-between">
              <h4 class="mb-0 movie-heading movie-title">${update_obj.movieName}</h4>
              <h4><span class="badge ${setrating(update_obj.movieRating)}">${update_obj.movieRating}</span></h4>
            </div>
            <div class="card-body p-0">
              <figure>
                <img src="${update_obj.movieImage}" alt="${update_obj.movieName}" title="${update_obj.movieName}" />
                <figcaption>
                  <h4 class="mb-0">${update_obj.movieName}</h4>
                  <p>${update_obj.movieDescription} </p>
                </figcaption>
              </figure>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <button onclick="onedithandler(this)" class="btn btn add-btn edit-btn">Edit</button>
              <button class="btn btn add-btn update-btn d-none">Update</button>
              <button onclick="onremovehandler(this)" class="btn btn delete-btn">Remove</button>
            </div>
          </div>
        </div>`

ontoggle()
}











// ondeletehandler....

function onremovehandler(eve){
  let dlt_id= eve.closest(".movies").id
  Swal.fire({
  title: "Are you sure?",
  text: `You want to delete this ${dlt_id} id movie !`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed){
    let dlt_idx = moviesArr.findIndex((ele) => ele.id === dlt_id);
    moviesArr.splice(dlt_idx,1);
    localStorage.setItem("moviesArr",JSON.stringify(moviesArr));
    eve.closest(".movies").remove()
    Swal.fire({
    title: "Deleted!",
    text: `Your movie with id ${dlt_id} is deleted .`,
    icon: "success"
  })};
});
}








function ontoggle(){
  backdrop.classList.toggle("active");
  moviemodel.classList.toggle("active");
  formSub.reset()
  addmovie.classList.remove("d-none")
  updatebtn.classList.add("d-none")
}


// searchbar functionality.....

function onsearchbarsub(eve){
  let searchbarvalue = searchbar.value.toLowerCase();
  let movie =document.querySelectorAll(".movies-item")
  movie.forEach((ele) =>{
    let moviename= ele.querySelector(".movie-title").textContent.toLowerCase()
     if (moviename.includes(searchbarvalue)) {
      ele.style.display = "";
    } else {
      ele.style.display = "none";
    }
  })
}





closeModel.addEventListener("click",ontoggle)
backdrop.addEventListener("click",ontoggle)
addbtn.addEventListener("click",ontoggle)
closebtn.addEventListener("click",ontoggle)
formSub.addEventListener("submit",onsubmit)
updatebtn.addEventListener("click",onupdatehandler)
search_btn.addEventListener("click",onsearchbarsub)