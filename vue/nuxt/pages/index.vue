<template>
  <div class="homepage">
    <div class="banner">
      <my-swiper />
    </div>
    <div class="content wrapper">
      <section>
        <div class="title fn-clear">
          <h1 class="fn-left">
            精选好课
          </h1>
          <span class="fn-left">行业知识，趣味解读</span>
        </div>
        <div class="list">
          <ul class="fn-clear">
            <li
              v-for="item in selectedCourseList"
              :key="item.id"
              class="fn-left"
            >
              <el-image :src="item.coverURL" fit="cover" lazy></el-image>
              <div class="bottom">
                <nuxt-link class="fn-text-ellipsis typeface2" :to="item.id">{{
                  item.topic
                }}</nuxt-link>
                <p class="fn-text-ellipsis">
                  {{ item.description | htmlTagFilter }}
                </p>
                <span class="typeface5">
                  {{ item.validDateStart | dateFilterSpace }}
                  {{ " - " }}
                  {{ item.validDateEnd | dateFilterSpace }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div class="title fn-clear">
          <h1 class="fn-left">
            人工智能
          </h1>
          <span class="fn-left">自信智能，兴致铸成</span>
          <nuxt-link class="fn-right" to="/course">更多 ></nuxt-link>
        </div>
        <div class="list">
          <ul class="fn-clear">
            <li v-for="item in aiCourseList" :key="item.id" class="fn-left">
              <el-image :src="item.coverURL" fit="cover" lazy></el-image>
              <div class="bottom">
                <nuxt-link class="fn-text-ellipsis typeface2" :to="item.id">{{
                  item.topic
                }}</nuxt-link>
                <p class="fn-text-ellipsis">
                  {{ item.description | htmlTagFilter }}
                </p>
                <span class="typeface5">
                  {{ item.validDateStart | dateFilterSpace }}
                  {{ " - " }}
                  {{ item.validDateEnd | dateFilterSpace }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div class="title fn-clear">
          <h1 class="fn-left">
            自动驾驶
          </h1>
          <span class="fn-left">自强于兴，智慧于恒</span>
          <nuxt-link class="fn-right" to="/course">更多 ></nuxt-link>
        </div>
        <div class="list">
          <ul class="fn-clear">
            <li
              v-for="item in autopilotCourseList"
              :key="item.id"
              class="fn-left"
            >
              <el-image :src="item.coverURL" fit="cover" lazy></el-image>
              <div class="bottom">
                <nuxt-link class="fn-text-ellipsis typeface2" :to="item.id">{{
                  item.topic
                }}</nuxt-link>
                <p class="fn-text-ellipsis">
                  {{ item.description | htmlTagFilter }}
                </p>
                <span class="typeface5">
                  {{ item.validDateStart | dateFilterSpace }}
                  {{ " - " }}
                  {{ item.validDateEnd | dateFilterSpace }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div class="title fn-clear">
          <h1 class="fn-left">
            智能制造
          </h1>
          <span class="fn-left">科技为本，智汇自兴</span>
          <nuxt-link class="fn-right" to="/course">更多 ></nuxt-link>
        </div>
        <div class="list">
          <ul class="fn-clear">
            <li
              v-for="item in intelligentManufacturingCourseList"
              :key="item.id"
              class="fn-left"
            >
              <el-image :src="item.coverURL" fit="cover" lazy></el-image>
              <div class="bottom">
                <nuxt-link class="fn-text-ellipsis typeface2" :to="item.id">{{
                  item.topic
                }}</nuxt-link>
                <p class="fn-text-ellipsis">
                  {{ item.description | htmlTagFilter }}
                </p>
                <span class="typeface5">
                  {{ item.validDateStart | dateFilterSpace }}
                  {{ " - " }}
                  {{ item.validDateEnd | dateFilterSpace }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import mySwiper from "@/components/homepage/swiper";

export default {
  name: "Homepage",
  components: {
    mySwiper
  },
  asyncData({ $api, error }) {
    return $api("homepage", "getCourseList", {}).then((res) => {
      const {
        selectedCourseList,
        aiCourseList,
        intelligentManufacturingCourseList,
        autopilotCourseList
      } = res;
      return {
        selectedCourseList,
        aiCourseList,
        intelligentManufacturingCourseList,
        autopilotCourseList
      };
    });
  },
  data() {
    return {};
  },
  head() {
    return {
      meta: [
        {
          hid: "description",
          name: "description",
          content: "课程首页"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.homepage {
  .banner {
    height: 360px;
  }
  .content {
    padding-bottom: 25px;
    .title {
      padding: 25px 0;
      line-height: 40px;
      font-size: 16px;
      letter-spacing: 2px;
      h1 {
        font-size: 28px;
        font-weight: normal;
        color: #1c242c;
      }
      span {
        padding-left: 30px;
        color: #9aa5b5;
      }
      a {
        color: @mainColor;
      }
    }
    .list {
      ul {
        li {
          width: 288px;
          margin-right: 16px;
          margin-bottom: 30px;
          &:nth-child(4n) {
            margin-right: 0;
          }
          .el-image {
            display: block;
            height: 162px;
            border-radius: 5px 5px 0 0;
          }
          .bottom {
            padding: 13px;
            border: 1px solid #dedfdf;
            border-top: none;
            border-radius: 0 0 5px 5px;
            a {
              display: block;
              height: 25px;
              line-height: 25px;
            }
            p {
              height: 23px;
              padding-bottom: 12px;
              line-height: 23px;
              font-size: 14px;
              color: #9aa5b5;
            }
            span {
              display: block;
              height: 14px;
              line-height: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
