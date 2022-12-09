<template>
  <div class="communication">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="鉴权" name="1">
        <el-form
          :model="data.communication.authentication"
          ref="authentication"
          label-width="80px"
          class="demo-authentication"
          v-if="this.data.communication.authentication"
        >
          <el-form-item label="鉴权接口">
            <el-input
              v-model="authentication.url"
              type="textarea"
              @change="change('url')"
            ></el-input>
          </el-form-item>
          <el-form-item label="过期时间">
            <el-input
              v-model="authentication.expire"
              @change="change('expire')"
            ></el-input>
          </el-form-item>
          <el-form-item label="请求方式">
            <el-radio
              v-model="authentication.method"
              label="get"
              @change="change('method')"
              >get</el-radio
            >
            <el-radio
              v-model="authentication.method"
              label="post"
              @change="change('method')"
              >post</el-radio
            >
          </el-form-item>
        </el-form>
        <div class="add">
          <div class="head">
            <span>参数</span>
            <span
              ><el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="authTest"
                >测试请求</el-button
              ><el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addPamars"
                >添加</el-button
              ></span
            >
          </div>
          <div class="parmasbody">
            <div
              class="parmasbox"
              v-for="(item, ind) in authentication.parmas"
              :key="ind"
            >
              <span>
                <span>名称</span>
                <span> <el-input v-model="item.name"></el-input></span>

                <span class="type" @click.stop="typeSelect(item)">
                  <el-popover placement="left" width="220" trigger="hover">
                    <div class="parmsTypeSelect">
                      <el-select
                        v-model="item.type"
                        placeholder="请选择"
                        :popperAppendToBody="false"
                      >
                        <el-option
                          v-for="item in parmasType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                    <i class="el-icon-edit" slot="reference"></i>
                  </el-popover>
                </span>
              </span>
              <span>
                <span>值</span>
                <span> <el-input v-model="item.value"></el-input></span>
              </span>
            </div>
          </div>
          <div class="head">
            <span>返回数据读取的字段</span>
          </div>
          <div class="parmasbody">
            <div class="parmasbox">
              <el-input
                v-model="authentication.field"
                @change="change('field')"
                placeholder="多重属性时可以用比如data.token的写法"
              ></el-input>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="数据接口" name="2">
        <div class="add">
          <div class="head">
            <span>接口管理</span>

            <span>
              <span>
                <el-radio v-model="InterfaceType" label="tree">树结构</el-radio>
                <el-radio v-model="InterfaceType" label="list"
                  >列表结构</el-radio
                >
              </span>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click.stop="addInterface(InterfaceType)"
                >添加</el-button
              >
            </span>
          </div>
          <div class="parmasbody" v-if="data.communication.Interface" >
            <div v-for="(item, ind) in Interface.InterfaceList" :key="ind">
              <div class="box">
                <span>
                  <span>名称</span>
                  <span> <el-input v-model="item.name"></el-input></span>
                </span>
                <span>
                  <span>url</span>
                  <span>
                    <el-input v-model="item.url" type="textarea"></el-input
                  ></span>
                </span>
              </div>
              <div class="box">
                <span>请求方式</span>
                <span>
                  <el-radio v-model="item.method" label="get">get</el-radio>
                  <el-radio v-model="item.method" label="post">post</el-radio>
                </span>
              </div>
              <div class="box">
                <span>传参类型</span>
                <span>
                  <el-radio v-model="item.pramasType" label="pramas">pramas</el-radio>
                  <el-radio v-model="item.pramasType" label="data">data</el-radio>
                </span>
              </div>
              <div class="box">
                <span>数据解析字段</span>
                <span>
                  <el-input
                    v-model="item.field.dataField"
                    placeholder="多重属性时可以用比如data.token的写法"
                  ></el-input
                ></span>
              </div>
              <div class="box">
                <span>列表解析字段</span>
                <span>
                  <el-input
                    v-model="item.field.listField"
                    placeholder="多重属性时可以用比如data.token的写法"
                  ></el-input
                ></span>
              </div>
              <div class="box">
                <span>列表名称字段</span>
                <span>
                  <el-input
                    v-model="item.field.bindNameField"
                    placeholder="列表返回数据需要显示名称对应的字段"
                  ></el-input
                ></span>
              </div>
              <div class="box">
                <span>列表编码字段</span>
                <span>
                  <el-input
                    v-model="item.field.bindCodeField"
                    placeholder="列表返回数据需要显示编码对应的字段"
                  ></el-input
                ></span>
              </div>
              <div class="box">
                <span>总页数解析字段</span>
                <span>
                  <el-input
                    v-model="item.field.totalField"
                    placeholder="多重属性时可以用比如data.token的写法"
                  ></el-input
                ></span>
              </div>
              <div class="box">
                <span>当前页字段</span>
                <span>
                  <el-input
                    v-model="item.parmas.current"
                    placeholder="多重属性时可以用比如data.token的写法"
                  ></el-input
                ></span>
              </div>
              <div class="box">
                <span>分页字段</span>
                <span>
                  <el-input
                    v-model="item.parmas.size"
                    placeholder="多重属性时可以用比如data.token的写法"
                  ></el-input
                ></span>
              </div>
              <div class="box">
                <span>搜索字段</span>
                <span>
                  <el-input
                    v-model="item.parmas.searchKey"
                    placeholder="多重属性时可以用比如data.token的写法"
                  ></el-input
                ></span>
              </div>
              <div class="box">
                <span>存储关联字段</span>
                <span>
                  <el-input
                    v-model="item.field.relationField"
                    placeholder="当前列表存储的关联字段，如id"
                  ></el-input
                ></span>
              </div>
              <div class="box">
                <span>关联上级字段</span>
                <span>
                  <el-input
                    v-model="item.field.lastRelationField"
                    placeholder="多重属性时可以用比如data.token的写法"
                  ></el-input
                ></span>
              </div>
              <div class="box">
                <span>关联查询字段</span>
                <span>
                  <el-input
                    v-model="item.field.searchRelationField"
                    placeholder="多重属性时可以用比如data.token的写法"
                  ></el-input
                ></span>
              </div>
              <div class="add">
                <div class="head">
                  <span>附加参数</span>
                  <span>
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-plus"
                      @click="addPamarsExtraParmas(item)"
                      >添加</el-button>
                    </span
                  >
                </div>
                <div class="parmasbody">
                  <div
                    class="parmasbox"
                    v-for="(item, ind) in item.parmas.extraParmas"
                    :key="ind"
                  >
                    <span>
                      <span>名称</span>
                      <span> <el-input v-model="item.name"></el-input></span>

                      <span class="type" @click.stop="typeSelect(item)">
                        <el-popover
                          placement="left"
                          width="220"
                          trigger="hover"
                        >
                          <div class="parmsTypeSelect">
                            <el-select
                              v-model="item.type"
                              placeholder="请选择"
                              :popperAppendToBody="false"
                            >
                              <el-option
                                v-for="item in parmasType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              >
                              </el-option>
                            </el-select>
                          </div>
                          <i class="el-icon-edit" slot="reference"></i>
                        </el-popover>
                      </span>
                    </span>
                    <span>
                      <span>值</span>
                      <span> <el-input v-model="item.value"></el-input></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { proxyRequest } from "@/api/proxy.js";
import { getPenAuthInfoParmas } from "@/utils/util";
export default {
  name: "communication",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  created() {
    if (!this.data.communication) {
      this.data.communication = {};
      this.data.communication.authentication = {
        url: "",
        expire: "",
        method: "post",
        parmas: [],
        field: "",
      };
    } else {
      this.authentication = this.data.communication.authentication;
      if (this.data.communication.Interface) {
        this.Interface = this.data.communication.Interface;
      }
    }
    console.log(this.data,'===communication==')
  },
  data() {
    return {
      activeName: "1",
      authentication: {
        url: "",
        expire: "",
        parmas: [],
        field: "",
      },
      Interface: {
        InterfaceList: [],
      },
      parmasType: [
        {
          value: 1,
          label: "请求参数",
        },
        {
          value: 2,
          label: "请求头信息",
        },
      ],
      extraParmas:[],
      InterfaceType: "list",
    };
  },
  methods: {
    change(key) {
      this.data.communication.authentication[key] = this.authentication[key];
      console.log(this.data);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addPamars() {
      this.authentication.parmas.push({
        type: "",
        name: "",
        value: "",
      });
      this.data.communication.authentication = this.authentication;
    },
    typeSelect() {},
    async authTest() {
      let obj = getPenAuthInfoParmas(this.data);
      console.log(obj);
      let res = await proxyRequest(obj);
      if (res.code == 200) {
        this.$message.success("测试通过！");
        this.data.communication.authentication.token =
          res.data[this.data.communication.authentication.field];
      }
    },
    addInterface(type) {
      if (type == "tree") {
      } else {
        this.Interface.InterfaceList.push({
          name: "",
          url: "",
          type: "list", //树结构，或者分页列表
          method: "post",
          pramasType:'data',
          field: {
            dataField: "data",
            listField: "",
            totalField: "total",
            relationField:'id',
            lastRelationField:'id',
            searchRelationField:''
          },
          parmas: {
            current: "current",
            size: "size",
            searchKey: "name",
          },
        });
      }
      this.data.communication.Interface = this.Interface;
      console.log(this.data.communication,'==this.data.communication.Interface==')
      this.$forceUpdate()
    },
    addPamarsExtraParmas(item){
        this.extraParmas.push({
        type: "",
        name: "",
        value: "",
      })
      item.parmas.extraParmas = this.extraParmas
      this.$forceUpdate()
    }
  },
};
</script>
<style lang="scss" scoped>
.communication {
  .add {
    margin: 2px;
    .head {
      border-bottom: solid #e0e0e0 1px;
      border-top: solid #e0e0e0 1px;
      padding: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .parmasbody {
      padding: 10px 0;
      .parmasbox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .type {
          position: absolute;
          left: -2px;
          cursor: pointer;
        }
        > span {
          margin-bottom: 5px;
          span:first-child {
            width: 100px;
            padding-right: 2px;
            text-align: right;
          }
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      .box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .type {
          position: absolute;
          left: -2px;
          cursor: pointer;
        }
        > span {
          margin-bottom: 5px;
          span:first-child {
            width: 100px;
            padding-right: 2px;
            text-align: right;
          }
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>