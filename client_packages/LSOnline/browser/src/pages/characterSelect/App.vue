<template>
    <transition name="fade">
        <div class="selectBox" id="characters" v-if="show">
            <div class="selectTitle">
                <font-awesome-icon icon="users"></font-awesome-icon>
                Wybierz postać
            </div>
            <table class="characterTable" id="charTable">
                <tbody>
                <tr v-for="character in characterRows">
                    <td width="30%">
                        <font-awesome-icon icon="user" size="4x"></font-awesome-icon>
                    </td>
                    <td width="40%">
                        <b>{{ character.name }}</b><br/>{{character.hours}}h {{character.minutes}}m
                    </td>
                    <td class="centered" width="30%">
                        <a id="select" @click="selectChar(character.id)" class="selectButton">Wybierz
                            <font-awesome-icon icon="chevron-right"></font-awesome-icon>
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </transition>
</template>

<script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

    export default {
        name: "notificationParent",
        data() {
            return {
                characterRows: [],
                show: false
            }
        },
        methods: {
            showCharacters(characters) {
                characters = JSON.parse(characters);
                this.characterRows = characters;
                this.show = true;
            },
            hideCharacters() {
                this.show = false;
            },
            selectChar(characterId) {
                mp.trigger('characterSelected', characterId);
            }
        },
        components: {
            FontAwesomeIcon
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/style.scss";

    .selectBox {
        font-family: OpenSans-Light, sans-serif;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        width: 1200px;
        padding: 10px;
        border-radius: 3px;
        margin: 100px auto auto;
    }

    .selectBox .selectTitle {
        font-family: OpenSans-Regular, sans-serif;
        color: #ffffff;
        font-size: 60px;
        letter-spacing: 4px;
        margin-top: -95px;
    }

    .selectBox .characterTable {
        font-size: 18px;
        width: 100%;
        margin-top: 10px;
    }

    .selectBox .selectButton {
        background-color: rgba(255, 255, 255, 0.2);
        padding: 10px;
        cursor: pointer;
    }

    .selectBox .selectButton:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    .selectBox .selectButton:active {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .characterTable .centered {
        text-align: center;
    }

    .characterTable td {
        padding: 10px;
    }

    .selectBox .image {
        float: left;
        padding: 10px 10px 10px 10px;
        color: rgba(255, 255, 255, 0.6);
    }

    .selectBox .title {
        float: left;
        margin-top: 10px;
        width: 80%;
        font-family: OpenSans-Regular, sans-serif;
    }

    .selectBox .content {
        float: left;
        width: 80%;
        padding-bottom: 10px;
    }
</style>
