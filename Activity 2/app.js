const Title = document.getElementById('Title')
const Artist = document.getElementById('Artist')
const Add = document.getElementById('Add')
const ul = document.getElementById('songlist')

Add.addEventListener('click', ()=>{
    
    //create elemet 
    const newTitle = Title.value
    const newArtist = Artist.value

  

    
    const p = document.createElement('li')
    const small = document.createElement('small')
    const button = document.createElement('button')
    

    //set value to the element
    p.innerHTML = newTitle;
    small.innerHTML = newArtist;
    button.innerHTML = "Delete";
    

    //add class to element
    p.classList.add()
    small.classList.add()
    button.classList.add()
    


    //create container
    const li =document.createElement('li');
    
    li.append(p)
    li.append(small)
    li.append(button)




    ul.append(li);

    console.log (li);
   



})



console.log (Title, Artist, Add)



