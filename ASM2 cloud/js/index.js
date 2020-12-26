$(document).on("submit", "#frm-login", Login);
$(document).on("submit", "#frm-register", Register);
$(document).on("submit", "#addproduct", AddProduct);


function Login(e) 
{
    e.preventDefault();

        $.ajax ({
            type: "POST",
            url: "../PHP/login.php",
            data: 
            {
                username : $("#username").val(),
                password : $("#password").val()
            },
            success: function( result ) {
                result = $.parseJSON(result);
                if (result.success)
                {
                    alert("Login successfully"); 
                    location.href="home.html";
                        
                }
                else
                {
                    alert("Login unsuccessfully!");
                }
            
            }
        });
    
}


function Register(e) 
{
    e.preventDefault();

    if($("#password").val() === $("#confirm-password").val()) {
        $.ajax ({
            type: "POST",
            url: "../PHP/register.php",
            data: $("#frm-register").serialize(),
            success: function( result ) {
                result = $.parseJSON(result);
                
                if(result.success) {
                    alert("Registered successfully!");
                    location.href="login.html";
                }
                else {
                    alert("Registered unsuccessfully!");
                }
            }
        });
    }
    else {
        $("#error").text("* Password mismatched.\n");
    }
}



function AddProduct(e)
{
    e.preventDefault();
    if($("#product_category").val()>2 || $("#product_category").val()<0)
    {
        alert("Wrong product category!");
    }
    else
    {
        $.ajax(
            {
                type: "POST",
                url: "../PHP/addproduct.php",
                data: {
                    product_id : $("#product_id").val(),
                    product_name : $("#product_name").val(),
                    product_price : $("#product_price").val(),
                    product_type : $("#product_category").val(),
                    product_des : $("#product_des").val(),
                    product_img : $("#product_img").val()
                },
                success: function( result ) {
                    result = $.parseJSON(result);
                    
                    if(result.success) {
                        alert("Added product");
                        location.href="home.html";
                    }
                    else {
                        alert("Failed to add new product");
                    }
                }
            }
        );
    } 
}


$("#Products").ready(showProduct_php);
function showProduct_php(){
    $.ajax({
        type: "POST", url: "../PHP/product.php",
        success: function(result){
            result = $.parseJSON(result);
            if(result){
                ShowAllProduct(result);
            }
            else{
                return;
            }
        }
    });
}
function ShowAllProduct(products){
    $("#Products").empty();

   for(item of products){
       var text = `
                    <div class="col-sm" id="Product_detail">
                    <div><img id="product_img" src="${item.img}" width="auto" height="200px"></img></div>
                        <div id="product_id">
                            <tr>
                                <td>ID: </td>
                                <td>${item.id}</td>
                            </tr>
                        </div>
                        <div id="product_name">
                            <tr>
                                <td>Name: </td>
                                <td>${item.pname}</td>
                            </tr>
                        </div>
                        <div id="product_price">
                            <tr>
                                <td>Price: </td>
                                <td>${item.price}</td>
                                <td> VND</td>
                            </tr>
                        </div>
                    <button id="btn-viewdetail" class="btn btn-success" data-product-id='${item.id}' onclick='viewDetail(this)'>Detail</button>
                    <button data-product-id='${item.id}' onclick='addtoCart(this)' class="btn btn-warning" id="btn-addcart">Add to Cart</button>
                    </div> `;
                    
                       $("#Products").append(text);
   }
}