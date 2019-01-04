<template>
    <!-- <div class="et"> -->
        <div class="partner" :class="{'partner-en': !activeLang}">
            <div class="main">

            
            <!-- <block> -->
                <!-- <Card icon="compose" slot="inner"> -->
                    <div class="hd">
                        <div>
                            <img src='https://d3bcj1iwrh8aaw.cloudfront.net/imgs/p-1.png'></img>
                            <span>{{ $t('partnerPage.title') }}</span>
                            <img src='https://d3bcj1iwrh8aaw.cloudfront.net/imgs/p-1.png'></img>
                        </div>
                    </div>

                    <div class="txt">
                        <p>
                            <section>{{ $t('partnerPage.p1') }}</section>
                            <section>{{ $t('partnerPage.p2') }}</section>
                            <section>{{ $t('partnerPage.p3') }}</section>
                            <section>
                                {{ $t('partnerPage.p4') }}
                                <a href="mailto:partner@exchain.com ">partner@exchain.com </a>
                                {{ $t('partnerPage.p5') }}
                            </section>
                        </p>
                    </div>
                <!-- </Card> -->
            <!-- </block> -->
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import cookie from 'js-cookie'
export default {
  name: 'partner',
  components: { },
  data () {
		return {
			activeLang: ''
		}
	},
	methods: {
		isChina () {
            var lang = cookie.get('exchain_language', { domain: this.$store.state.api.domain })
			if (!lang) {
				lang = this.$store.state.activeLang
			}
			if (!lang) {
				lang = 'cn'
			}
			return (lang === 'cn')
    }
	},
    mounted () {
		this.activeLang = this.isChina()
		var vu = this
        // bus.$on('langChange', () => {
        //     vu.activeLang = vu.isChina()
		// })
    },
    destroyed () {
        // bus.$off('langChange');
    }
}
</script>

<style lang="less">
@import url(../../assets/style/config.less);
.partner {
  background: url(https://d3bcj1iwrh8aaw.cloudfront.net/imgs/pbg.png);
  background-position: top -50px center;
  background-repeat: no-repeat;
  //   background-size: cover;
  height: 1100px;
  padding-top: 500px;
  .hd {
      div {
      position: relative;
      text-align: center;
      line-height: @font-title*6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: @font-title;
      font-weight: bold;
      img {
        width: @font-title*1.2;
        height: @font-title*1.2;
        margin: 5px;
      }
    }
  }
  .txt {
    // padding: 30px;
    // width: 1100px;
    padding: 0 50px 30px 50px;
    p {
      font-size: @font-text*1.1;
    }
    section {
      line-height: @font-text*2;
      padding-bottom: @font-text*2;
    }
  }
}
.partner-en {
	background: url(https://d3bcj1iwrh8aaw.cloudfront.net/imgs/pbg-en.jpg);
	background-position: top -50px center;
	// background-size: 100%;
	background-repeat: no-repeat;
}
</style>