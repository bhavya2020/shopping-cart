function refresh(products)
{

    let productList=$('#products-list');
    productList.empty();
        for (let product of products) {
            console.log(product);
            let newProduct = $(`
             <div class="card col-3 m-2" style="width: 20rem;">
            <div class="card-body">
                <img class="card-img-top" src="./Images/${product.img}" >
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
    $('#name').val('');
    $('#price').val('');
$.get('http://localhost:5656/admin',(data)=> {
    refresh(data);
});

window.del= function(el) {
      let pid = $(el).attr('data-pid');
      $.post(`/admin/${pid}`, (data) => {
          refresh(data)
      })
  }

});


// pre-submit callback
function showRequest(formData, jqForm, options) {
    return true;
}

// post-submit callback
function showResponse(products) {
    $('#name').val('');
    $('#price').val('');
   refresh(products);
}

$(document).ready(function () {
    var options = {
        beforeSubmit: showRequest,  // pre-submit callback
        success: showResponse  // post-submit callback
    };

    // bind to the form's submit event
    $('#frmUploader').submit(function () {
        $(this).ajaxSubmit(options);
        // always return false to prevent standard browser submit and page navigation
        return false;
    });


});