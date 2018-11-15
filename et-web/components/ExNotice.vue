<template>
    <div >
        <ul class="notice">

            <li class="item" v-for="(p,i) of $t('static.notice')" :key="i" :class="{novice:i==0,advise:i==1,announcement:i==2}">
                <a :href="p.url">
                    <div>
                        <h3 class="headline ">{{p.title}}</h3>
                        <p class="subheading">{{p.subTitle}}</p>
                    </div>
                </a>
            </li>

        </ul>
    </div>
</template>
<style lang="stylus" scoped>
.notice {
    position: absolute;
    width: 380px;
    height: 300px;
    float: right;
    right: calc(50% - 600px);
    top: 35px;

    .item {
        height: 100px;

        div {
            padding: 16px 20px;
        }

        &:hover {
            background-color: rgb(80, 176, 140);
        }

        h3 {
            margin-bottom: 11px;
            color: #FAFAFA;
            // font-size: 22px;
            // font-weight: 500;
        }

        p {
            color: #E0E0E0;
            // font-size: 16px;
        }
    }

    gradient(a, b) {
        background: -webkit-linear-gradient(left, a, b);
        background: -moz-linear-gradient(to right, a, b);
        background: -ms-linear-gradient(to right, a, b);
        background: -o-linear-gradient(to right, a, b);
        background: linear-gradient(to right, a, b);
    }

    .novice {
        gradient(rgba(89, 153, 229, 0.6), rgba(115, 89, 229, 0.6));
    }

    .advise {
        gradient(rgba(116, 202, 242, 0.6), rgba(107, 161, 166, 0.6));
    }

    .announcement {
        gradient(rgba(152, 116, 242, 0.6), rgba(176, 113, 190, 0.6));
    }
}
</style>
