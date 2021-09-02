const searchBook = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    // console.log(url)
    // load data 
    fetch(url)
        .then(res => res.json())
        //  .then(data => console.log(data.docs.length))

          .then(data => displayBooks(data.docs))
        .catch(error => displayError('Something went wrong,no result found..'));
        // .catch(error => displayError('Something went wrong,please try again'));
        document.getElementById('search-field').value = '';

}
// show data
const displayBooks = docs => {
    // find all number of searching result
    const searchResults = docs.length;
    //  console.log(searchResults)
    const searchDiv =document.getElementById('search-results');
    const showResults = document.createElement('h3'); 
    showResults.innerHTML = `About ${searchResults} results`;
    searchDiv.appendChild(showResults);

    // all book data
    const container = document.getElementById('books');
    container.textContent = ''
    docs?.forEach(doc => {
        // console.log(doc)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
              <div class="card h-100">
              <img style="height:200px" src="https://covers.openlibrary.org/b/id/${doc.cover_i ? doc.cover_i:''}-L.jpg" class="card-img-top" alt="book picture..">
                <div class="card-body">
                  <h5 class="card-title">Book name: ${doc.title}</h5>
                  <p class="card-text">Author name: ${doc.author_name ? doc.author_name : ''}</p>
                  <p class="card-text">Publisher: ${doc.publisher}</p>
                  <p class="card-text">Book first publish year: ${doc.first_publish_year ? doc.first_publish_year:''}</p>
                  <p class="card-text">Book Publish on: ${doc.publish_date ? doc.publish_date:''}</p>
                </div>
            </div>
                `
        container.appendChild(div)
    })

}
// error message
const displayError = error => {
    const message = document.getElementById('errorMessage')
    message.innerText = error
}