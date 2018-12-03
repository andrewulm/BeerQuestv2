<template>
    <div class="beer-form-container">
        <h1>Review Some Beers!</h1>
        <hr/>
        <div class="beer-form">
            <h4>Add a New Beer</h4>
            <div class="col-12">
                <label for="beer-name">Name:</label><br/>
                <input type="text" id="beer-name" v-model="name">
            </div>
            <div class="col-12">
                <label for="beer-description">Description:</label><br/>
                <input type="text" id="beer-description" v-model="description">
            </div>
            <div class="col-12">
                <label for="beer-image">Image:</label><br/>
                <input type="text" id="beer-image" v-model="image">
            </div>
            <div class="col-12">
                <label for="beer-rating">Rating (Out of 5):</label><br/>
                <select id="beer-rating" v-model="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div class="col-12">
                <button v-on:click="createPost">Cheers!</button>
            </div>
        </div>
    </div>
</template>

<script>
    import BeerService from '../services/BeerService'

    export default {
        name: "BeerForm",
        data() {
            return {
                beers: [],
                error: '',
                name: '',
                description: '',
                image: '',
                rating: '',
            }
        },
        async created() {
            try {
                this.beers = await BeerService.getBeers();
            } catch(err) {
                this.error = err.message;
            }
        },
        methods: {
            async createPost() {
                await BeerService.insertPost(this.name, this.description, this.image, this.rating);
                this.beers = await BeerService.getBeers();
                this.name = '';
                this.description = '';
                this.image = '';
                this.rating = '';
            },
            async deletePost(id) {
                await BeerService.deletePost(id);
                this.beers = await BeerService.getBeers();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .beer-form-container {
        margin: 15px;
        border-radius: 6px;
        padding: 10px 15px;
        background-color: rgba(255, 255, 255, 0.85);
        border-bottom: 8px #F0C030 solid;
        box-shadow: 0 5px 10px rgba(0,0,0,0.1);

        .beer-form {
            div {
                margin: 10px 0;
            }

            input {
                width: 100%;
                border-radius: 6px;
                border: 1px #ccc solid;
                padding: 10px 15px;
                background-color: rgba(255, 255, 255, 0.35);
            }

            select {
                width: 100%;
                border-radius: 6px;
                border: 1px #ccc solid;
                padding: 10px 15px;
                background-color: rgba(255, 255, 255, 0.35);
            }

            button {
                display: block;
                width: 80%;
                margin: 10px auto;
                background: darken(#30c0f0, 10%);
                padding: 10px 15px;
                color: #fff;
                font-weight: 700;
                border-radius: 6px;
                border: none;

                &:hover {
                    background: darken(#30c0f0, 15%);
                    cursor: pointer;
                }
            }
        }
    }
</style>
