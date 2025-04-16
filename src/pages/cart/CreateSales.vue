<template>
    <div class="row">
        <div class="col-md-12">
  <div class="card">
    <div class="card-body">
   {{ cartItems }}
     
<div class="container invoice">
  <div class="invoice-header d-flex justify-content-between align-items-center">
    <h2 class="mb-0">INVOICE</h2>
    <small>Date: <strong>April 16, 2025</strong></small>
  </div>

  <div class="row mb-4">
    <div class="col-sm-4">
      <h5>From:</h5>
      <p>
        My Company<br />
        123 Main Street<br />
        City, Country<br />
        Email: hello@mycompany.com
      </p>
    </div>
    <div class="col-sm-4 text-start">
      <h5 class="pb-2">Warehouse</h5>
        <select v-model="dataObj.selectedWareHouse" class="form-control" name="" id="">
          <option disabled value="">Select Warehouse</option>
          <option v-for="w in warehouse" :key="w.id" :value="w">{{ w.name }}</option>

        </select>
        <p>Phone : {{ dataObj.selectedWareHouse.contact }}</p>
        <p>address : {{ dataObj.selectedWareHouse.city }}</p>

    </div>
    <div class="col-sm-4 text-sm-start">
      <h5 class="pb-2">Customer</h5>
        <select v-model="dataObj.selectedCustomer" class="form-control" name="" id="">
          <option disabled  value="">Select Customer</option>
          <option v-for="c in customers" :key="c.id" :value="c">{{ c.name }}</option>
        </select>
        <p>Phone : {{ dataObj.selectedCustomer.mobile }}</p>
        <p>address : {{ dataObj.selectedCustomer.address }}</p>


    </div>
  </div>

  <table class="table table-bordered">
    <thead class="table-light">
      <tr>
        <th>#</th>
        <th>Item</th>
        <th>Qty</th>
        <th>Unit Price</th>
        <th>Discount</th>
        <th>Total</th>
        <th><button @click="clearCart" class="btn btn-danger">Clear All</button></th>
      </tr>
      <tr>
        <th>#</th>
        <th>
          <select v-model="dataObj.selectedProduct" class="form-control" name="" id="">
          <option disabled  value="">Select Product</option>
          <option v-for="p in products" :key="p.id" :value="p">{{ p.name }}</option>
        </select>
        </th>
        <th> <input v-model="dataObj.qty" class="form-control" type="number" name="qty" value="1"></th>
        <th>{{ dataObj.selectedProduct.offer_price }}</th>
        <th>
          <input v-model="dataObj.discount" class="form-control" type="number" name="discount" >
        </th>
        <th></th>
        <th> <button @click="addToCart" class="btn btn-primary">Add</button></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item , i) in cartItems" :key="item.id">
        <td>{{ i +1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.qty }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.discount }}</td>
        <td>{{ item.subtotal }}</td>
        <td><button @click="itemRemove(item.item_id)" class="btn btn-warning">Remove</button></td>
      </tr>
      
    </tbody>
    <tfoot>
      <tr>
        <th colspan="5" class="text-end">Subtotal</th>
        <th>$390.00</th>
      </tr>
      <tr>
        <th colspan="5" class="text-end">Tax (5%)</th>
        <th>$19.50</th>
      </tr>
      <tr>
        <th colspan="5" class="text-end">Total</th>
        <th>$409.50</th>
      </tr>
    </tfoot>
  </table>

  <div class="invoice-footer text-center">
    <button @click="processOrder" class="btn btn-primary">Process</button>
    <p class="mb-0">Thank you for your business!</p>
  </div>
</div>
</div>
</div>
        
</div>
  </div>
</template>

<script  setup>
import api from '@/Api';
import { onMounted, reactive, ref } from 'vue';
import { useCart } from './Cart';



const cart= useCart("sales");
const cartItems= ref(cart.getCart());
const warehouse= ref([])
const products= ref([])
const customers= ref([])


const dataObj= reactive({
  selectedCustomer:{},
  selectedWareHouse:{},
  selectedProduct:{},
  qty:1,
  discount:0
})

// add to cart 

const addToCart= ()=>{

  let calculate_discount = dataObj.discount * dataObj.qty
  let subtotal= (dataObj.selectedProduct.offer_price * dataObj.qty) - calculate_discount
  const data= {
     item_id:dataObj.selectedProduct.id,
     name:dataObj.selectedProduct.name,
     price:dataObj.selectedProduct.offer_price,
     discount:calculate_discount,
     qty:dataObj.qty,
     subtotal:subtotal
  }
  cart.save(data)
  cartItems.value = cart.getCart();
  console.log(data);
  dataObj.selectedProduct={}
  dataObj.qty=1
  dataObj.discount=0
}

// item remove 
const itemRemove= (id)=>{
  console.log(id);
  
  cart.deleteItem(id);
  cartItems.value = cart.getCart();
}

const clearCart=()=>{
  cart.clearCart();
  cartItems.value = cart.getCart();
}

// order process 
const processOrder=()=>{

  const processData= {
    products:cart.getCart(),
    customer:dataObj.selectedCustomer,
    warehouse:dataObj.selectedWareHouse,
  }

  api.post("/sales/processOrder", processData)
  .then((result) => {
    console.log(result.data);
  }).catch((err) => {
    console.log(err);
  });

}



// fetch salesData
const saleData=()=>{
   api.get("/sales/data")
   .then((result) => {
     console.log(result.data);

     warehouse.value= result.data.warehouse
     customers.value= result.data.customers
     products.value= result.data.products
   }).catch((err) => {
    console.log(err);
   });
}

onMounted(()=>{
   saleData()
})


</script>

<style>

</style>