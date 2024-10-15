const Title = document.getElementById('Title');
const Artist = document.getElementById('Artist');
const Add = document.getElementById('Add');
const ul = document.getElementById('songlist');
const search = document.getElementById('search');

Add.addEventListener('click', ()=>{
    
    //create elemet 
    const newTitle = Title.value;
    const newArtist = Artist.value;

  


    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-start';


    const p = document.createElement('p');
    const small = document.createElement('small');
    const button = document.createElement('button');
    

    //set value to the element
    p.innerHTML = newTitle;
    small.innerHTML = newArtist;
    button.innerHTML = "Delete";
    

    //add class to element
    p.classList.add('ms-2', 'me-auto', 'fw-bold');
    small.classList.add('ms-2', 'me-auto');
    button.classList.add('btn', 'btn-danger');
    

    button.onclick = () => {
        ul.removeChild(li);
    };

    //create container
    
    
    li.append(p)
    li.append(small)
    li.append(button)




    ul.append(li);

    console.log (li);
   



console.log (Title, Artist, Add)


// Clear input fields
    title.value = '';
    artist.value = '';

    // Call search function to update search results
    searchSongs();
});


searchBar.addEventListener('input', searchSongs);


function searchSongs() {
    const searchText = searchBar.value.toLowerCase();
    const songs = Array.from(ul.getElementsByTagName('li'));

    
    ul.innerHTML = '';

  
    songs.filter(song => {
        const songTitle = song.querySelector('.song').innerText.toLowerCase();
        return songTitle.includes(searchText);
    }).forEach(matchingSong => {
        ul.appendChild(matchingSong);
    });
}