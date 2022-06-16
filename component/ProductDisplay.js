app.component('product-display',{
    props:{
        premium:{
            typeof: Boolean,
            // required: true
        }
    } ,
    template: 
    /*html*/
    ` <h1>{{ title }}</h1>
    <h3>Shipping: {{ shipping }}</h3>
    <div class="product__img">
        <img :src="image" alt="">
    </div>
    <div class="product__info">
        <p v-if="isStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <ul>
            <!-- <li v-for="item in details">{{item}}</li> -->
        </ul>
    </div>
    <div v-for="(item,index) in variant" :key="item.id" @mouseover="updateIndex(index)" class="changeColor" :style="{backgroundColor: item.color}">{{item.color}}</div>
    <div class="product__cart">
        <h5>{{cart}}</h5>
        <button class="button" :class="{'button-disnable': !isStock}" :disabled="!isStock" @click="addToCart">Them vao</button>
    </div>
    <review-list  :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
    `,
    data() {
        return {
            brand: 'Adidas',
            selectIndex: 0,
            product: 'Boots', // updated data value //
            details: ['Trung1','Trung2','Trung3'],
            variant: [
                {id:1, color:'green',image:'https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/April2022/DSC05753_copy1.jpg',quantity:50},
                {id:2, color:'blue',image:'https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/April2022/DSC05908-Recovered_copy11.jpg',quantity:0}
            ],
            reviews: []
        }
    },
    methods:{
        addToCart(){
            this.$emit('add-to-cart',this.variant[this.selectIndex].id)
        },
        updateIndex(index){
            this.selectIndex = index;
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed:{
        title(){
            return this.brand + ' ' + this.product;
        },
        image(){
            return this.variant[this.selectIndex].image;
        },
        isStock(){
            return this.variant[this.selectIndex].quantity;
        },
        shipping(){
            if (this.premium) {
                return 'FREE'
            }
            return '2.99$'
        }
    }
})