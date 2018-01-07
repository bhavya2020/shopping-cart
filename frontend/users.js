function refresh(products)
{
    let productList=$('#products-list');
    productList.empty();
    for (let product of products) {
        let newProduct = $(`
            <div class="card col-3 m-2" style="width: 20rem;">
                <img class="card-img-top" src="./Images/${product.img}" >
                <div class="card-body">
                    <h4 class="card-title">${product.name}</h4>
                    <p class="card-text">Price:${product.price}</p>
                    <i data-pid="${product.id}" class="fa fa-plus" onclick="add(this)" style="color: blue; float: right;font-size: 4vh"></i>
                </div>
            </div>`
        );
        productList.prepend(newProduct);
    }
}
$(()=>{
    $.get('http://localhost:5656/users',(data)=> {
        refresh(data);
    });
    window.add= function(el)
    {
        let flag=false;
        let pid=$(el).attr('data-pid');
        $.post(`/users/${pid}`,(p) => {
            p.push({img:"img",id:0,name:'abc',price:12,quantity:1});
          let pp=localStorage.getItem(`product`);
          let ps=JSON.parse(pp);
          console.log(ps);
          if(ps===null)
          {
              let product=[{
                  img:p[0].img,
                  id:p[0].id,
                  name:p[0].name,
                  price:p[0].price,
                  quantity:1
              },{
                  img:p[1].img,
                  id:p[1].id,
                  name:p[1].name,
                  price:p[1].price,
                  quantity:1}];
              console.log("p=");
              console.log(product);
              let po=JSON.stringify(product);
              localStorage.setItem('product',po);
          }
          else {
              console.log(ps);
              for (let ps2 of ps) {
                  if (ps2.id == p[0].id) {


                      ps2.quantity = ps2.quantity + 1;
                      console.log(ps);
                      let pr = JSON.stringify(ps);
                      localStorage.setItem('product', pr);
                      flag = true;
                      break;
                  }
              }
              if (!flag) {

                  let product = {
                      img:p[0].img,
                      id: p[0].id,
                      name: p[0].name,
                      price: p[0].price,
                      quantity: 1
                  };
                  ps.push(product);
                  let po = JSON.stringify(ps);
                  localStorage.setItem('product', po);
              }
          }
        })
    };
    $('#cart').click(()=>{
        window.location='/cart.html';
    })
});
