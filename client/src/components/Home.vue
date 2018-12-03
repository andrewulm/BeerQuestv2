<template>
    <div class="hero">
        <div class="hero-overlay">
            <div class="container">
                <!-- // Beer Form // -->
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

                <!-- // Output Beers // -->
                <p v-if="error">{{ error }}</p>
                <div class="d-flex flex-wrap">
                    <div class="col-sm-12 col-md-6 beers"
                         v-for="(beer, index) in beers"
                         v-bind:item="beer"
                         v-bind:index="index"
                         v-bind:key="beer._id"
                    >
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4>{{ beer.name }}</h4>
                                </div>
                                <div class="card-body d-flex flex-wrap">
                                    <div class="col-6">
                                        <h6>{{ `${beer.createdAt.getDate()}/${beer.createdAt.getMonth()}/${beer.createdAt.getFullYear()}` }}</h6>
                                        <p>{{ beer.description }}</p>
                                    </div>
                                    <div class="col-6 text-center">
                                        <img class="beer-image img-fluid" v-bind:src="beer.image"/>
                                    </div>
                                </div>
                                <div class="card-footer d-flex">
                                    <div class="col-6 beer-rating">
                                        <div v-if="beer.rating === '1'">
                                            <fa-icon icon="star"/>
                                        </div>
                                        <div v-else-if="beer.rating === '2'">
                                            <fa-icon icon="star"/><fa-icon icon="star"/>
                                        </div>
                                        <div v-else-if="beer.rating === '3'">
                                            <fa-icon icon="star"/><fa-icon icon="star"/><fa-icon icon="star"/>
                                        </div>
                                        <div v-else-if="beer.rating === '4'">
                                            <fa-icon icon="star"/><fa-icon icon="star"/><fa-icon icon="star"/><fa-icon icon="star"/>
                                        </div>
                                        <div v-else-if="beer.rating === '5'">
                                            <fa-icon icon="star"/><fa-icon icon="star"/><fa-icon icon="star"/><fa-icon icon="star"/><fa-icon icon="star"/>
                                        </div>
                                    </div>
                                    <div class="col-6 delete-button text-right">
                                        <button v-on:click="deletePost(beer._id)">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BeerService from '../services/BeerService'

    export default {
        name: "Home",
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

    .hero {
        min-height: 80vh;
        background: url('http://glass.style/wp-content/uploads/2018/04/craft-beer-dunellen-hotel.jpg') no-repeat center;
        background-size: cover;

        .hero-overlay {
            min-height: 80vh;
            background: rgba(0,0,0, 0.65);
            display: flex;
            align-items: center;
            justify-content: center;

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

            .beers {
                .col-12 {
                    padding: 0;

                    .card {
                        border: none;
                        margin-bottom: 20px;
                        color: #333;
                        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                        transition: 1s;
                        min-height: 325px;

                        &:hover {
                            transform: scale( 1.05 );
                            transition: 1s;
                        }

                        .card-header {
                            padding: 10px;
                            background: #D89018;

                            h4 {
                                color: #fff;
                            }
                        }

                        .card-body {
                            padding: 10px;

                            .beer-image {
                                max-height: 200px;
                            }
                        }

                        .card-footer {
                            padding: 10px;

                            .beer-rating {
                                svg {
                                    color: #D89018;
                                }
                            }

                            .delete-button {
                                button {
                                    border-radius: 6px;
                                    border: none;
                                    padding: 5px 10px;
                                    background: darken(#30c0f0, 10%);
                                    color: #fff;

                                    &:hover {
                                        background: darken(#30c0f0, 15%);
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
