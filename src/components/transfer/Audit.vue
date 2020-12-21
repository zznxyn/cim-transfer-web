<template>
  <div class="message">
    <div class="m_top">
      <p class="m_title">工程基本信息</p>
      <img src="../../assets/images/jx.png" alt class="ic" />
      <div class="content_c">
        <ul>
          <li>
            <span>工程名称:</span>
            <span>重庆渝澳大桥第3期</span>
          </li>
          <li>
            <span>设计单位:</span>
            <span>重庆市天力建设有限公司</span>
          </li>
        </ul>
        <ol>
          <li>
            <span>建设单位:</span>
            <span>建工6局</span>
          </li>
          <li>
            <span>监理单位:</span>
            <span>建工3局第二工程部门</span>
          </li>
        </ol>
      </div>
    </div>
    <div class="tab">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">工程资料</span>
          <span slot="label">01</span>
          <div class="content">
            <div class="left">
              <ul class="ul_listr">
                <li>
                  <img src="../../assets/images/dicon.png" alt />三维模型
                </li>
                <li>
                  <img src="../../assets/images/icon1.png" alt class="active" />BIM模型
                </li>
                <li>
                  <img src="../../assets/images/icon1.png" alt />三维模型
                </li>
              </ul>
              <ul class="ul_listr1">
                <li>
                  <img src="../../assets/images/dl.png" alt />地理信息
                </li>
              </ul>
              <ul class="ul_listr2">
                <li>
                  <img src="../../assets/images/td.png" alt />图档资料
                </li>
                <li>
                  <img src="../../assets/images/xzhu.png" alt />影像资料
                </li>
              </ul>
            </div>
            <div class="right">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>三维模型</el-breadcrumb-item>
                <el-breadcrumb-item>BIM模型</el-breadcrumb-item>
                <el-breadcrumb-item>数字化</el-breadcrumb-item>
              </el-breadcrumb>
              <div class="btn">
                <el-table
                  :data="tableData"
                  :header-cell-style="{background:'#EBEEF7'}"
                  :row-class-name="tableRowClassName"
                  style="width: 100%;margin:auto"
                  class="tableBox"
                >
                  <el-table-column label="序号" width="50" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.date }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="文件名" min-width="60%">
                    <template slot-scope="scope">
                      <span>{{ scope.row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="修改时间" min-width="15%">
                    <template slot-scope="scope">
                      <span>{{ scope.row.address }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="大小" min-width="15%">
                    <template slot-scope="scope">
                      <span>{{ scope.row.otype }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="col" style="width:100%;height:20px;background:#F0F2F7"></div>
          <div class="b_bottom">
            <p class="m_title">审核意见</p>
            <img src="../../assets/images/jx.png" alt class="ic" />
            <div class="inp">
              <el-input type="textarea" :autosize="false" placeholder="请输入审核意见"></el-input>
            </div>
            <div class="an">
              <span>驳回</span>
              <span>通过</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">BIM关联文档</span>
          <span slot="label">02</span>
          <div class="divBox">
            <div class="div1">
              <p>待关联模型</p>
              <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[1]"></el-tree>
            </div>
            <div class="center">
              <div class="right_ce">
                <el-table
                  :data="tableData"
                  :header-cell-style="{background:'#EBEEF7'}"
                  :row-class-name="tableRowClassName"
                  style="width: 100%;margin:auto;padding-top:3px"
                  class="tableBox"
                >
                  <el-table-column label="序号" width="50" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.date }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="文件名" min-width="60%">
                    <template slot-scope="scope">
                      <span>{{ scope.row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="修改时间" min-width="15%">
                    <template slot-scope="scope">
                      <span>{{ scope.row.address }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="大小" min-width="15%">
                    <template slot-scope="scope">
                      <span>{{ scope.row.otype }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "工程模型",
          children: [
            {
              id: 4,
              label: "建筑"
            },
            {
              id: 5,
              label: "结构"
            },
            {
              id: 6,
              label: "电气"
            },
            {
              id: 7,
              label: "道路"
            },
            {
              id: 8,
              label: "附属设施"
            }
          ]
        },
        {
          id: 2,
          label: "工程模型",
          children: [
            {
              id: 4,
              label: "建筑"
            },
            {
              id: 5,
              label: "结构"
            },
            {
              id: 6,
              label: "电气"
            },
            {
              id: 7,
              label: "道路"
            },
            {
              id: 8,
              label: "附属设施"
            }
          ]
        }
      ],
      // defaultProps: {
      //   children: 'children',
      //   label: 'label'
      // },
      tableData: [
        {
          date: "1",
          name: "建筑BIM模型1期数据.rvt",
          address: "2020.02.02  14:40",
          otype: "14.45M",
          peole: "李明"
        },
        {
          date: "2",
          name: "建筑BIM模型1期数据.rvt",
          address: "2020.02.02  14:40",
          otype: "14.45M",
          peole: "李明"
        },
        {
          date: "3",
          name: "建筑BIM模型1期数据.rvt",
          address: "2020.02.02  14:40",
          otype: "14.45M",
          peole: "李明"
        },
        {
          date: "4",
          name: "建筑BIM模型1期数据.rvt",
          address: "2020.02.02  14:40",
          otype: "14.45M",
          peole: "李明"
        }
      ]
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      //console.log(rowIndex)
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.message {
  width: 100%;
}

.ic {
  position: absolute;
  height: 49px;
  top: 0;
}

.m_top {
  width: 100%;
  height: 140px;
  background-color: #fff;
  position: relative;

  .m_title {
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    box-sizing: border-box;
    font-size: 18px;
    color: #32375a;
    font-family: Microsoft YaHei;
  }
}

.content_c {
  width: 96%;
  margin: auto;
  //height: 100px;
}

.content_c ul {
  width: 500px;
  height: 25px;
  float: left;
  margin-top: 12px;
}

.content_c ol {
  height: 25px;
  float: left;
  margin-top: 12px;
}

.content_c ul li {
  height: 25px;
  margin-bottom: 14px;
}

.content_c ul li span:nth-child(1) {
  float: left;
  color: #666;
  font-size: 14px;
  font-family: Microsoft YaHei;
  line-height: 25px;
}

.content_c ul li span:nth-child(2) {
  margin-left: 15px;
  line-height: 25px;
  color: #333;
  font-size: 16px;
  display: grid;
  padding-left: 10px;
}

.content_c ol li {
  height: 25px;
  margin-bottom: 14px;
}

.content_c ol li span:nth-child(1) {
  float: left;
  color: #666;
  font-size: 14px;
  font-family: Microsoft YaHei;
  line-height: 25px;
}

.content_c ol li span:nth-child(2) {
  margin-left: 15px;
  line-height: 25px;
  color: #333;
  font-size: 16px;
  display: grid;
  padding-left: 10px;
}

.form {
  padding-top: 20px;
  box-sizing: border-box;
}

.el-row {
  margin-left: 100px;
}

.tab {
  margin-top: 20px;
  //height: 500px;
}

.content {
  display: flex;
  width: 100%;
  height: 340px;

  .left {
    width: 249px;
    border: 1px solid #05285e;
    height: 99%;
  }

  .right {
    flex: 1;
  }
}

.el-tabs--border-card {
  height: 100%;
  border: none;
}

/deep/ .el-tabs__item {
  font-size: 18px;
}

.tj {
  position: absolute;
  bottom: 0;
  margin-left: 200px;
}

.el-button.el-button {
  margin-left: 35px;
}

.divBox {
  width: 100%;
  display: flex;
  height: 600px;
}

.div1 {
  width: 250px;
  border: 1px solid rgba(107, 192, 249, 1);
  padding-top: 3px;
  height: 98%;

  p {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #4bc2ff;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fff;
    text-align: center;
  }
}

.center {
  flex: 1;
}

.div2 {
  width: 250px;

  p {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background-color: #cccccc;
  }
}

/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  width: 200px;
  // height: 45px;
  // line-height: 45px;
  text-align: center;
}

/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #fff;
  background: #1f2559;
}

/deep/
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:not(.is-disabled):hover {
  color: #ccc;
}

/deep/ .el-tabs__item {
  font-size: 16px;
}

/deep/ .el-tabs--border-card > .el-tabs__content {
  padding: 0px;
}

/deep/ .el-submenu .el-submenu__title {
  background-color: #fff !important;
}

/deep/ .el-menu--inline {
  background-color: #fff !important;
}

.el-icon-my-export {
  background: url(/officeHouse/resources/images/export.png) center no-repeat;
  background-size: cover;
}

/deep/ .el-breadcrumb {
  margin-top: 30px;
  margin-left: 26px;
  margin-bottom: 30px;
}

.btn {
  width: 96%;
  margin: auto;
  border: 1px solid rgba(235, 238, 247, 1);
  height: calc(100% - 80px);
}

/deep/ .el-table .warning-row {
  background: #f8f9fd;
}

/deep/ .el-table .success-row {
  background: #fff;
}

/deep/ .tableBox {
  th {
    padding: 0 !important;
    height: 40px;
    line-height: 40px;
  }

  td {
    padding: 0 !important;
    height: 40px;
    line-height: 40px;
  }
}

.b_bottom {
  position: relative;
  width: 100%;
  height: 240px;
  background-color: #fff;

  //margin-top: 20px;
  p {
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 18px;
    color: #32375a;
    font-family: Microsoft YaHei;
  }
}

.inp {
  width: 96%;
  margin: auto;
}

/deep/ .el-tabs--border-card > .el-tabs__header {
  background-color: #fff;
}

/deep/ .el-textarea {
  margin-top: 10px !important;
}

/deep/ .el-textarea__inner {
  height: 100px;
  background-color: #f8fafb;
  border-radius: 0px !important;
  resize: none;
}

.an {
  position: absolute;
  left: 50%;
  width: 500px;
  margin-left: -250px;
  margin-top: 20px;
}

.an span:nth-child(1) {
  display: block;
  width: 200px;
  height: 40px;
  border: 1px solid #05285e;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #05285e;
  float: left;
  margin-right: 20px;
}

.an span:nth-child(2) {
  display: block;
  width: 200px;
  height: 40px;
  border: 1px solid #05285e;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #fff;
  background-color: #05285e;
  float: left;
}

// /deep/ .el-tree-node {
//   margin-top: 10px;
// }

.right_ce {
  width: 96%;
  margin: auto;
  height: calc(100% - 10px);
  border: 1px solid rgba(235, 238, 247, 1);
}

/deep/ .el-tabs--border-card > .el-tabs__header {
  border: none;
}

#pane-0 {
  border-top: 4px solid #05285e;
}

#pane-1 {
  border-top: 4px solid #4bc2ff;
}

/deep/ #tab-0 {
  width: 252px;
  height: 50px;
  border-radius: 20px 20px 0px 0px;
  border-right: none;
  z-index: 1;
}

/deep/ #tab-0 span:nth-child(1) {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}

/deep/ #tab-0 span:nth-child(2) {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  padding-left: 95px;
  box-sizing: border-box;
}

/deep/ #tab-1 {
  width: 263px;
  height: 50px;
  border-radius: 20px 20px 0px 0px;
  position: absolute;
  left: 225px;
  border-left: none;
}

/deep/ #tab-1 span:nth-child(1) {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  padding-left: 30px;
}

/deep/ #tab-1 span:nth-child(2) {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  padding-left: 30px;
}

/deep/ .is-active {
  z-index: 2 !important;
}

// /deep/ .is-active span:nth-child(1){
//     color: #fff;
//     opacity: 0.3;
// }

/deep/ .el-table td,
.el-table th.is-leaf {
  border: none;
}

/deep/ .el-table__row > td {
  border: none;
}

/deep/ .el-table::before {
  //去掉最下面的那一条线
  height: 0px;
}

/deep/ .el-menu {
  background: none;
}

/deep/ #tab-1 {
  background-color: #4bc2ff;
}

/deep/ #tab-0 {
  background-color: #05285e;
}

/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  color: #fff;
}

/deep/
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:not(.is-disabled):hover {
  color: #fff;
}

.ul_listr li:nth-child(1) {
  padding-left: 32px;
  box-sizing: border-box;
  margin-top: 32px;
  color: #333;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 600;
  cursor: pointer;

  img {
    vertical-align: middle;
    margin-right: 8px;
  }
}

.ul_listr li:nth-child(2) {
  padding-left: 29px;
  box-sizing: border-box;
  margin-top: 20px;
  cursor: pointer;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  img {
    vertical-align: middle;
    margin-right: 10px;
  }
}

.ul_listr li:nth-child(3) {
  padding-left: 29px;
  box-sizing: border-box;
  margin-top: 20px;
  cursor: pointer;
  font-size: 12px;

  img {
    vertical-align: middle;
    margin-right: 10px;
  }
}

.ul_listr1 li:nth-child(1) {
  padding-left: 28px;
  box-sizing: border-box;
  margin-top: 32px;
  color: #333;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 600;
  cursor: pointer;

  img {
    vertical-align: middle;
    margin-right: 8px;
  }
}

.ul_listr1 li:nth-child(2) {
  padding-left: 29px;
  box-sizing: border-box;
  margin-top: 20px;
  cursor: pointer;
  font-size: 12px;

  img {
    vertical-align: middle;
    margin-right: 10px;
  }
}

.ul_listr1 li:nth-child(3) {
  padding-left: 29px;
  box-sizing: border-box;
  margin-top: 20px;
  font-size: 12px;
  cursor: pointer;

  img {
    vertical-align: middle;
    margin-right: 10px;
  }
}

.ul_listr1 li:nth-child(4) {
  padding-left: 29px;
  box-sizing: border-box;
  margin-top: 20px;
  cursor: pointer;
  font-size: 12px;

  img {
    vertical-align: middle;
    margin-right: 10px;
  }
}

.ul_listr1 li:nth-child(5) {
  padding-left: 29px;
  box-sizing: border-box;
  margin-top: 20px;
  cursor: pointer;
  font-size: 12px;

  img {
    vertical-align: middle;
    margin-right: 10px;
  }
}

.ul_listr2 li:nth-child(1) {
  padding-left: 29px;
  box-sizing: border-box;
  margin-top: 20px;
  color: #333;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 600;
  cursor: pointer;

  img {
    vertical-align: middle;
    margin-right: 10px;
  }
}

.ul_listr2 li:nth-child(2) {
  padding-left: 29px;
  box-sizing: border-box;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 600;
  margin-top: 20px;

  cursor: pointer;

  img {
    vertical-align: middle;
    margin-right: 10px;
  }
}

.ul_listr li:hover {
  background-color: #ebeef7;
}
.ul_listr li:nth-child(1) {
  background: none;
}
</style>
