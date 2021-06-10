<template>
  <div class="img-panel">
    <div
      class="framePage-body operationControl flexdc"
      style="align-items: flex-start; padding-top: 0.69rem"
    >
      <div class="searchbox">
        <div title="身份证号" class="searchboxItem ci-full">
          <span class="itemLabel">身份证号:</span>
          <el-input
            v-model="pageData.idcard"
            type="text"
            size="small"
            placeholder="请输入身份证号"
            clearable
          />
        </div>
        <div title="班级编号" class="searchboxItem ci-full">
          <span class="itemLabel">班级编号:</span>
          <el-input
            v-model="pageData.projectCode"
            type="text"
            size="small"
            placeholder="完整班级编号"
            clearable
          />
        </div>
        <div title="是否合格" class="searchboxItem ci-full">
          <span class="itemLabel">是否合格:</span>
          <el-select v-model="pageData.errorCode" size="small">
            <el-option label="不合格" :value="0"></el-option>
            <el-option label="合格" :value="1"></el-option>
          </el-select>
        </div>
        <el-button type="primary" class="bgc-bv" round @click="load(1)"
          >查询</el-button
        >
        <div>
          <span>
            已标记章节数:
            <el-popover
              placement="top"
              width="400"
              trigger="click"
              @show="loadMarkedKpointInfo"
            >
              <el-table :data="markedKpoints">
                <el-table-column
                  property="kpointName"
                  label="课件名"
                ></el-table-column>
              </el-table>
              <el-link slot="reference" type="primary"
                >{{ checkedAuthImgs.length }}
                <i
                  v-show="checkedAuthImgs.length"
                  class="el-icon-view el-icon--right"
                ></i>
              </el-link>
            </el-popover>
          </span>
        </div>
      </div>
    </div>
    <div>
      <el-collapse v-model="expandItems">
        <div v-for="item in faceDatas" :key="item.id">
          <el-collapse-item :name="item.id">
            <template slot="title">
              课程: {{ item.courseName }}. 课件: {{ item.kpointName }}
              <i
                class="header-icon el-icon-circle-check"
                v-show="checkAuthError(item.id)"
                >课程学习异常</i
              >
              <!-- <i class="header-icon el-icon-circle-check" v-show="checkExamError(item.id, item.projectCourseId)">考试签到异常</i> -->
            </template>
            <el-card
              :body-style="{ padding: '0px' }"
              class="img-card-default"
              :class="{ 'img-card-checked': findImgIndex(face).index > -1 }"
              shadow="hover"
              v-for="(face, index) in item.faces"
              :key="index"
            >
              <el-image
                class="img-body"
                :src="face.approveFace"
                fit="contain"
                @click="toggleImgCheck(face)"
                alt="good"
              ></el-image>
            </el-card>
          </el-collapse-item>
        </div>
      </el-collapse>
      <el-pagination
        v-show="this.faceDatas.length != 0"
        :total="pageData.total"
        :page-size="pageData.size"
        :current-page="pageData.current"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30]"
        @current-change="loadFaceDatas"
        @size-change="pageSizeChange"
      />
      <div v-show="this.faceDatas.length == 0">暂无数据</div>
    </div>
  </div>
</template>
<script>
import { resetKeepAlive } from "@/utils/common";
export default {
  name: "operate/illegalImgChecker",
  data() {
    return {
      pageData: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        idcard: "",
        projectCode: "",
        errorCode: 0,
      },
      faceDatas: [],
      loading: false,
      checkedAuthImgs: [],
      checkedExamImgs: [],
      expandItems: [],
      markedKpoints: [],
    };
  },
  watch: {
    faceDatas(newVal) {
      this.expandItems = [];
      newVal.forEach((item) => {
        this.expandItems.push(item.id);
      });
    },
  },
  created() {},
  methods: {
    load(current) {
      if (this.pageData.idcard.trim() == "") {
        this.$message.warning("请至少填写身份证号");
        return;
      }
      this.loadErrFaceDatas();
      this.loadFaceDatas(current);
    },
    loadErrFaceDatas() {
      this.$post(
        "/biz/user/face/mark/queryMarkFaceByIdCard",
        this.pageData
      ).then((re) => {
        let faceDatas = [];
        re.data.forEach((item) => {
          let kpointIndex = faceDatas.findIndex(
            (kpoint) => kpoint.id == this.buildUID(item)
          );
          if (kpointIndex == -1) {
            faceDatas.push(item);
          }
        });
        this.checkedAuthImgs = faceDatas;
      });
    },
    loadFaceDatas(current) {
      this.pageData.pageNum = current;
      this.$post(
        "/biz/user/face/detect/queryUserFaceByIdCard",
        this.pageData
      ).then((re) => {
        this.pageData.total = re.data.total;
        let faceDatas = [];
        re.data.list.forEach((item) => {
          let id = this.buildUID(item);
          let kpointIndex = faceDatas.findIndex((kpoint) => kpoint.id == id);
          if (kpointIndex > -1) {
            faceDatas[kpointIndex].faces.push(item);
          } else {
            faceDatas.push({
              id: id,
              kpointName: item.kpointName,
              courseName: item.courseName,
              faces: [item],
            });
          }
        });
        this.faceDatas = faceDatas;
      });
    },
    pageSizeChange(size) {
      this.pageData.pageSize = size;
      this.loadFaceDatas(this.pageData.pageNum);
    },
    findImgIndex(face) {
      let faceCollection;
      let index;
      // if (face.facetype === 40) { //大考试
      // 	faceCollection = this.checkedExamImgs;
      // 	index = faceCollection.findIndex(item => item.kpoint == 0 && item.projectCourseId == face.projectCourseId);
      // } if (face.facetype == 30) { //小考试
      // 	faceCollection = this.checkedExamImgs;
      // 	index = faceCollection.findIndex(item => item.kpointId == face.kpointId);
      // } else { //包括10和20. 分别是签到和认证
      // 	faceCollection = this.checkedAuthImgs;
      // 	index = faceCollection.findIndex(item => item.kpointId == face.kpointId);
      // }
      faceCollection = this.checkedAuthImgs;
      index = faceCollection.findIndex(
        (item) => this.buildUID(item) == this.buildUID(face)
      );
      return { index, faceCollection };
    },
    toggleImgCheck(face) {
      let { index, faceCollection } = this.findImgIndex(face);
      let faceId, store;
      if (index > -1) {
        let re = faceCollection.splice(index, 1)[0];
        faceId = re.faceId;
        store = false;
      } else {
        faceCollection.push(face);
        faceId = face.faceId;
        store = true;
      }
      this.$post("/biz/user/face/mark/insert", { faceId, store }).then((re) => {
        if (re.status == 0) {
          this.$message.success("保存成功");
        }
      });
    },
    checkAuthError(id) {
      return this.checkedAuthImgs.find((img) => id == this.buildUID(img));
    },
    // checkExamError(kpointId, projectCourseId) {
    // 	return this.checkedExamImgs.find(img => img.kpointId == kpointId) ||
    // 	this.checkedExamImgs.find(item => item.kpoint == 0 && item.projectCourseId == projectCourseId)
    // },
    buildUID(kpoint) {
      return kpoint.projectCourseId + "-" + kpoint.kpointId;
    },
    loadMarkedKpointInfo() {
      let faceIds = this.checkedAuthImgs.map((item) => item.faceId);
      if (faceIds.length == 0) {
        return;
      }
      this.$post("/biz/user/face/detect/queryKpointByFaceIds", {
        faceIds: faceIds,
      }).then((re) => {
        if (re.data.list) {
          this.markedKpoints = re.data.list;
        }
      });
    },
  },
  beforeRouteLeave: resetKeepAlive,
};
</script>
<style lang="less" scoped>
.img-panel {
  height: 100%;
  overflow: auto;

  .el-collapse-item__header .header-icon {
    margin-left: 5px;
    color: #f56c6c;
    font-size: 20px;
  }

  .img-card-default {
    width: 150px;
    height: 150px;
    margin: 5px;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    vertical-align: middle;
  }
  .img-card-checked {
    border: 1px solid #f56c6c;
  }
  .img-body {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }
}
</style>
