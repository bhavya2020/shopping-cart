function refresh(products)
{

    let productList=$('#products-list');
    productList.empty();
        for (let product of products) {
            let newProduct = $(`
             <div class="card col-3 m-2" style="width: 20rem;">
            <div class="card-body">
                <h4 class="card-title">${product.name}</h4>
                <p class="card-text">Price:${product.price}</p>
                 <i data-pid="${product.id}" class="fa fa-trash del" onclick="del(this)" style="color: red; float: right;font-size: 4vh"></i>
            </div>
        </div>`
            );
            productList.prepend(newProduct);
        }
}
$(()=>{
$.get('http://localhost:5656/admin',(data)=> {
    refresh(data);
});
    let name=$('#name');
    let price=$('#price');
    $('#add').click(()=>{
        $.post('http://localhost:5656/admin',{
            name: name.val(),
            price: price.val()
        },(data)=>{refresh(data)});
    name.val('');
    price.val('');
    });

  window.del= function(el)
    {
        let pid=$(el).attr('data-pid');
        $.post(`/admin/${pid}`,(data) => {
           refresh(data)
        })
    }

});



