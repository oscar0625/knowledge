<template>
  <div class="docking-ach-list">
    <ul>
      <li
        v-for="item in dataList"
        :key="item.id"
        :class="{
          'failure-data': item.state === 3
        }"
      >
        <a
          :href="`/${
            item.achvTypeName === '产品' ? 'prodAchInfo' : 'techAchInfo'
          }?id=${item.relationId}`"
          :target="isBlank"
        >
          <div class="title">
            <h4 class="fn-text-ellipsis">
              <span
                :class="{
                  tag: true,
                  prod: item.achvTypeName === '产品'
                }"
              >
                {{ item.achvTypeName + "成果" }}</span
              >{{ item.achiName }}
            </h4>
            <!-- <div class="edit">
              <a
                v-if="noStatus"
                href="javascript:;"
                class="el-icon-close"
                @click="handleDelete(item.relationId)"
              ></a>
            </div> -->
          </div>
          <div class="detail">
            <div class="match">
              匹配度：<span>{{ item.matchingDegree }} </span>
            </div>
            <div
              class="score"
              v-if="item.totalScore && item.achvTypeName === '技术'"
            >
              <span
                v-for="s in Math.round(item.totalScore / 20)"
                :key="s + 's'"
                class="star"
              ></span>
              <span
                v-for="u in 5 - Math.round(item.totalScore / 20)"
                :key="u + 'u'"
                class="un-star"
              ></span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DockingAchList",
  props: {
    dataList: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="less">
.docking-ach-list {
  overflow: hidden;
  li {
    margin-bottom: 30 / @rem;
    border-radius: 20 / @rem;
    background: #ffffff;

    > a {
      display: block;
      padding: 22 / @rem 30 / @rem 0;
    }

    .title {
      h4 {
        line-height: 50 / @rem;
        font-size: 34 / @rem;
        color: #000000;
        font-weight: 800;
        .tag {
          display: inline-block;
          width: 120 / @rem;
          margin-right: 30 / @rem;
          border-radius: 4 / @rem;
          vertical-align: 3 / @rem;
          line-height: 33 / @rem;
          text-align: center;
          font-weight: normal;
          font-size: 24 / @rem;
          color: #ffffff;
          background: linear-gradient(90deg, #0c40d4, #245bf5);
          opacity: 0.9;
          &.prod {
            background: linear-gradient(90deg, #fa8615, #fa9c15);
          }
        }
      }
    }
    .detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 85 / @rem;
      border-top: 1 / @rem dashed #f2f2f2;
      margin-top: 22 / @rem;
      .match {
        line-height: 30 / @rem;
        font-size: 28 / @rem;
        font-weight: 500;
        color: #666666;
      }
      .score {
        display: flex;
        > span {
          width: 28 / @rem;
          height: 28 / @rem;
          margin-left: 8 / @rem;
          background-size: cover;
          background-position: center;
          &.star {
            background-image: url("~@/assets/images/star_icon.png");
          }
          &.un-star {
            background-image: url("~@/assets/images/star_un_icon.png");
          }
        }
      }
    }
  }
}
</style>
