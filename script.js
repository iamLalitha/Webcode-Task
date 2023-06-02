//get reference 
let searchInput=document.getElementById('searchInput');
//from search box
let searchButton=document.getElementById('searchButton');
//get product info
let productList=document.getElementById('productList');
 searchButton.addEventListener('click',searchProducts);

 //function to search products
 async function searchProducts(){
    let searchTerm=searchInput.value.trim();

    if(searchTerm==''){
        productList.innerHTML='<p>Please enter a search term.</p>';
        return;
    }

    try{
        const response = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${searchTerm}`);

        let data=await response.json();

        if(data.length==0){
            productList.innerHTML= '<p>No products found.</p>';
            return;
        }
        //calling displayproduct function to display the products
        displayProducts(data);
    } catch(error){
        console.log('error:',error);
        productList.innerHTML='<p>An error occurred while fetching data.</p>';

    }
 }
 //ffunction to display products
 function displayProducts(products){
    productList.innerHTML='';

    if(products.length===0){
        const noResults=document.createElement('p');
        noResults.textContent='No products found.';
        productList.appendChild(noResults);
    return;
    }

    products.forEach(product=>{
        //creating elements separetly
        let card=document.createElement('div');
        card.classList.add('product-card');

        let brand=document.createElement('h3');
        brand.textContent= product.brand;

        let name=document.createElement('h4');
        name.textContent=product.name;

        const price = document.createElement('p');
        const formattedPrice = product.price_sign + product.price;
        price.textContent = `Price: ${formattedPrice}`;

        let image=document.createElement('img');
        image.src=product.image_link;
        image.style.width = '300px'; // Set the desired width
        image.style.height = '300px'; // Set the desired height

        let link=document.createElement('a');
        link.href= product.product_link;
        link.textContent = 'view Product';
        link.classList.add('productLink');


        let description =document.createElement('p');
        description.textContent=product.description;
// appending all the values to the card
        card.appendChild(brand);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(image);
        card.appendChild(link);
        card.appendChild(description);

        //appending card to productList
        productList.appendChild(card);
    });
 }

  
 