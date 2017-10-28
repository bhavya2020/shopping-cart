$(()=>{
    let pList=localStorage.getItem('product');
    let plist=JSON.parse(pList);
    let productList=$('#products-list');
    productList.empty();
    for(let product of plist )
    {
            if (product.id != 0) {
                let newProduct = $(`
             <div class="card col-3 m-2" style="width: 20rem;">
            <div class="card-body">
                <h4 class="card-title">${product.name}</h4>
                <p class="card-text">Price:${product.price}</p>
                <p class="card-text">Quantity:${product.quantity}</p>
                <p class="card-text">Amount:${product.quantity * product.price}</p>
            </div>
        </div>`
                );
                productList.prepend(newProduct);
            }

    }
    $('#bag').click(()=>{window.location="./users.html"});

});