<template>
    <div class="banner-shortcut">
        <ul class="">

            <li class="item" v-for="(p,i) of list" :key="i" :class="{novice:i==0,advise:i==1,announcement:i==2}">
                <a :href="p.url">
                    <div>
                        <h3 class="tit3">{{p.title}}</h3>
                        <p class="title">{{p.subTitle}}</p>
                    </div>
                </a>
            </li>

        </ul>
    </div>
</template>