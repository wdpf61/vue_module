<template>
   <div class="row">
    <div class="col">

 
    <div class="container my-5">
      <div class="card shadow">
        <div class="card-header bg-primary text-white text-center">
          <h1 class="mb-0">Invoice</h1>
        </div>
        <div class="card-body">
          <!-- Invoice Details -->
          <div class="row mb-4">
            <div class="col-md-4">
              <h5>Supplier</h5>
              <select class="form-select mb-2" @change="handleSelectedSupplier">
                <option>Select Supplier</option>
                <option v-for="supplier in suppliers" :key="supplier.id" :value="JSON.stringify(supplier)">
                  {{ supplier.name }}
                </option>
              </select>
              <p class="mb-1">Phone: {{ selectedSupplier?.mobile || '-' }}</p>
              <p>Email: {{ selectedSupplier?.email || '-' }}</p>
            </div>
  
            <div class="col-md-4">
              <h5>Warehouse</h5>
              <select class="form-select" @change="handleSelectedWarehouse">
                <option>Select Warehouse</option>
                <option v-for="wh in warehouse" :key="wh.id" :value="JSON.stringify(wh)">
                  {{ wh.name }}
                </option>
              </select>
              <p class="mb-1">Phone: {{ selectedWarehouse?.contact || '-' }}</p>
              <p>City: {{ selectedWarehouse?.city || '-' }}</p>
            </div>
  
            <div class="col-md-4">
              <h5>Invoice Details</h5>
              <p>Invoice No: <strong>#12345</strong></p>
              <p>Date: <strong>{{ today }}</strong></p>
              <div>
                Delivery Date:
                <input type="date" class="form-control mt-1" />
              </div>
            </div>
          </div>
  
          <!-- Product Table -->
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Discount</th>
                <th>Total</th>
                <th>
                  <button class="btn btn-warning" @click="handleDeleteAllItems">DeleteAll</button>
                </th>
              </tr>
              <tr>
                <td>
                  <select class="form-select" name="product" @change="handleSetItem">
                    <option>Select Product</option>
                    <option v-for="product in products" :key="product.id" :value="JSON.stringify(product)">
                      {{ product.name }}
                    </option>
                  </select>
                </td>
                <td><input v-model.number="item.qty" name="qty" class="w-100" placeholder="Qty" @input="handleQtyChange" /></td>
                <td><input :value="item.price" disabled class="w-100" /></td>
                <td><input v-model.number="item.discount" name="discount" class="w-100" placeholder="Discount" @input="handleDiscountChange" /></td>
                <td>{{ item.subtotal }}</td>
                <td><button class="btn btn-info" @click="handleSetAllItems">Add</button></td>
              </tr>
            </thead>
  
            <tbody>
              <tr v-for="(i, index) in items" :key="index">
                <td>{{ i.name }}</td>
                <td>{{ i.qty }}</td>
                <td>{{ i.price }}</td>
                <td>{{ i.discount }}</td>
                <td>{{ i.subtotal }}</td>
                <td><button class="btn btn-danger" @click="handleItemDelete(i.item_id)">-</button></td>
              </tr>
            </tbody>
  
            <tfoot>
              <tr>
                <td colspan="4" class="text-end">Discount</td>
                <td>${{ summaryCount.discount }}</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="4" class="text-end">Tax</td>
                <td>${{ summaryCount.tax }}</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="4" class="text-end">Subtotal</td>
                <td>${{ summaryCount.subtotal }}</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="4" class="text-end fw-bold">Total</td>
                <td class="fw-bold">${{ summaryCount.total }}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
  
          <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-danger" @click="handleDeleteAllItems">Clear All</button>
            <button class="btn btn-success" @click="handleProcess">Process</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </template>
  
  <script setup>
   import { ref, reactive, onMounted, watch } from 'vue'
   import axios from 'axios'
   import useCart from './Cart'
 



  const cart = useCart('purchase')
  const baseUrl = 'http://localhost/project/admin'
  
  // State
  const suppliers = ref([])
  const selectedSupplier = ref(null)
  const warehouse = ref([])
  const selectedWarehouse = ref(null)
  const products = ref([])
  
  const today = new Date().toLocaleDateString()
  
  const item = reactive({
    name: '',
    item_id: 0,
    qty: 1,
    price: 0,
    discount: 0,
    total_discount: 0,
    subtotal: 0
  })
  
  const items = ref(cart.getCart())
  
  const summaryCount = reactive({
    discount: 0,
    tax: 0,
    subtotal: 0,
    total: 0
  })
  
  const purchaseProcess = reactive({
    supplier_id: 0,
    warehouse_id: 0,
    products: [],
    purchase_total: 0,
    discount: 0,
    vat: 0
  })
  
  // Methods
  const handleSetItem = (e) => {
    const product = JSON.parse(e.target.value)
    item.name = product.name
    item.item_id = product.id
    item.qty = 1
    item.price = product.offer_price
    item.subtotal = product.offer_price
    item.discount = 0
    item.total_discount = 0
  }
  
  const handleQtyChange = () => {
    item.subtotal = item.price * item.qty - (item.qty * item.discount)
    item.total_discount = item.qty * item.discount
  }
  
  const handleDiscountChange = () => {
    item.total_discount = item.qty * item.discount
    item.subtotal = item.qty * item.price - item.total_discount
  }
  
  const handleSetAllItems = () => {
    cart.save({ ...item })
    items.value = cart.getCart()
    Object.assign(item, {
      name: '',
      item_id: 0,
      qty: 1,
      price: 0,
      discount: 0,
      total_discount: 0,
      subtotal: 0
    })
  }
  
  const handleItemDelete = (id) => {
    cart.deleteItem(id)
    items.value = cart.getCart()
  }
  
  const handleDeleteAllItems = () => {
    cart.clearCart()
    items.value = cart.getCart()
  }
  
  const calculateSummary = () => {
    const subtotal = items.value.reduce((sum, i) => sum + parseFloat(i.subtotal), 0)
    const discount = items.value.reduce((sum, i) => sum + parseFloat(i.total_discount || 0), 0)
    const tax = subtotal * 0.15
    const total = subtotal + tax
  
    summaryCount.subtotal = subtotal
    summaryCount.discount = discount
    summaryCount.tax = tax
    summaryCount.total = total
  }
  
  watch(items, calculateSummary, { deep: true })
  
  const fetchSuppliers = () => {
    axios.get(baseUrl + '/api/Supplier/').then((res) => {
      suppliers.value = res.data.suppliers
    })
  }
  
  const fetchWarehouses = () => {
    axios.get(baseUrl + '/api/warehouse/').then((res) => {
      warehouse.value = res.data.warehouses
    })
  }
  
  const fetchProducts = () => {
    axios.get(baseUrl + '/api/product/').then((res) => {
      products.value = res.data.products
    })
  }
  
  const handleSelectedSupplier = (e) => {
    selectedSupplier.value = JSON.parse(e.target.value)
  }
  
  const handleSelectedWarehouse = (e) => {
    selectedWarehouse.value = JSON.parse(e.target.value)
  }
  
  const handleProcess = () => {
    purchaseProcess.supplier_id = selectedSupplier.value?.id
    purchaseProcess.warehouse_id = selectedWarehouse.value?.id
    purchaseProcess.products = items.value
    purchaseProcess.purchase_total = summaryCount.total
    purchaseProcess.discount = summaryCount.discount
    purchaseProcess.vat = summaryCount.tax
  
    axios.post(baseUrl + '/api/Process/saveReact', purchaseProcess)
      .then((res) => {
        console.log(res)
        cart.clearCart()
        items.value = cart.getCart()
        selectedSupplier.value = null
        selectedWarehouse.value = null
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  onMounted(() => {
    fetchSuppliers()
    fetchWarehouses()
    fetchProducts()
    items.value = cart.getCart()
  })
  </script>
  