<template>
  <el-footer id="myFooter" height="240px">
    <div class="wrapper">
      <el-row class="top">
        <el-col :span="8">
          <div>
            <el-image :src="ewm1" lazy></el-image>
          </div>
          <p>中关村人工智能<br />创新创业基地</p>
        </el-col>
        <el-col :span="8">
          <div>
            <el-image :src="ewm2" lazy></el-image>
          </div>
          <p>中国人工智能学会智<br />能驾驶专业委员会</p>
        </el-col>
        <el-col :span="8">
          <div>
            <el-image :src="ewm3" lazy></el-image>
          </div>
          <p>重庆机器人产<br />业生态研究院</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="8">
          联系电话：15727388750
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="8">
          Copyright @2020中关村人工智能创新创业基地版权所有
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="8" :offset="8">
          <a href="http://www.beian.miit.gov.cn/" target="_blank">
            京ICP备15034667号-4</a
          >
        </el-col>
      </el-row> -->
    </div>
  </el-footer>
</template>

<script>
import ewm1 from "@/assets/images/ewm1.jpg";
import ewm2 from "@/assets/images/ewm2.jpg";
import ewm3 from "@/assets/images/ewm3.jpg";
export default {
  name: "MyFooter",
  data() {
    return {
      ewm1,
      ewm2,
      ewm3
    };
  }
};
</script>

<style lang="less">
#myFooter {
  padding: 0;
  text-align: center;
  font-size: 14px;
  color: #b2b0b0;
  background: @envColor2;

  .el-row {
    line-height: 22px;
    &.top {
      padding: 30px 0;
      .el-image {
        width: 75px;
        height: 75px;
      }
    }
  }
}
</style>
