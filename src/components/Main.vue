<template>
  	<div>
	  	<transition name="form-fade" mode="in-out">
	  		<el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>长春分公司员工宽带竞赛开</span>
          </div>
		    	<el-form class="main" :model="dataForm" :rules="rules" ref="dataForm" 
            :status-icon="true" :show-message="false" size="small" >
						<el-form-item prop="dept" label="员工部门">
							<el-input v-model="dataForm.dept"></el-input>
						</el-form-item>
						<el-form-item prop="name" label="员工姓名">
							<el-input v-model="dataForm.name"></el-input>
						</el-form-item>
						<el-form-item prop="number" label="员工编号">
							<el-input v-model="dataForm.number"></el-input>
						</el-form-item>
						<el-form-item prop="mobile" label="员工手机号">
							<el-input v-model="dataForm.mobile"></el-input>
						</el-form-item>
            <el-radio-group v-model="type" size="small" :style="{margin: '10px'}">
              <el-radio-button label="0">有可安装小区</el-radio-button>
              <el-radio-button label="1">无可安装小区</el-radio-button>
            </el-radio-group>              
						<el-form-item prop="area" label="用户区域">
              <el-select v-model="dataForm.area" placeholder="请选择区域">
                <el-option
                      v-for="(item,i) in areas"
                      :key="i"
                      :label="item"
                      :value="item">
                    </el-option>              
              </el-select>
						</el-form-item>
						<el-form-item prop="village" label="用户小区" v-if="type == '0'" >
              <el-select v-model="dataForm.village" placeholder="请选择小区">
                <el-option
                      v-for="(item,i) in villages"
                      :key="i"
                      :label="item"
                      :value="item">
                    </el-option>              
              </el-select>
						</el-form-item>
						<el-form-item prop="village" label="希望开通移动宽带的小区" v-if="type == '1'">
							<el-input v-model="dataForm.village"></el-input>
						</el-form-item>
						<el-form-item prop="building" label="用户楼栋" v-if="type == '0'">
							<el-input v-model="dataForm.building"></el-input>
						</el-form-item>
						<el-form-item prop="unit" label="用户单元" v-if="type == '0'">
							<el-input v-model="dataForm.unit"></el-input>
						</el-form-item>
						<el-form-item prop="door" label="用户门牌号" v-if="type == '0'">
							<el-input v-model="dataForm.door"></el-input>
						</el-form-item>
						<el-form-item prop="user_name" label="办理人姓名">
							<el-input v-model="dataForm.user_name"></el-input>
						</el-form-item>
						<el-form-item prop="user_contact" label="办理人联系电话">
							<el-input v-model="dataForm.user_contact"></el-input>
						</el-form-item>
						<el-form-item prop="user_mobile" label="融合主卡号码" v-if="type == '0'">
							<el-input v-model="dataForm.user_mobile"></el-input>
						</el-form-item>
						<el-form-item prop="remark" label="备注">
							<el-input v-model="dataForm.remark"></el-input>
						</el-form-item>

						<el-form-item>
								<el-button type="primary" @click="submitForm('dataForm')" :style="{width: '100%'}">确认无误提交</el-button>
							</el-form-item>
					</el-form>
	  		</el-card>
	  	</transition>
  	</div>
</template>

<script>
import api from '@/api'
import villages from '@/api/village'
import areas from '@/api/area'

const fields = [
  "dept",
  "name",
  "mobile",
  "number",
  "area",
  "user_name",
  "user_contact",
  "remark"
];
const fields2 = [
  ...fields,
  "village",
  "building",
  "unit",
  "door",
  "user_mobile"
];
const initForm = fields.reduce(
  (p, c) => ({
    ...p,
    [c]: ""
  }),
  { }
);
export default {
  data() {
    return {
      dataForm: initForm,
      type: "0",
      areas,
    };
  },
  mounted() {
  },
  computed: {
    rules() {
      const _fileds = this.type == '0' ? fields2 : fields;

      const _rules = _fileds.reduce(
        (p, c) => ({
          ...p,
          [c]: [{ required: true, message: "不能为空", trigger: "blur" }]
        }),
        {}
      );
      return _rules;
    },
    villages() {
      if(this.dataForm.area){
        return villages(this.dataForm.area);
      }
      return [];
    }
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await api.submit(this.type, this.dataForm);
          console.log(res);
          if (res.errcode === 0) {
          this.$root.finish = true;
          this.$router.push("/finish");
          this.$message({ type: "success", message: "信息提交成功", duration: 3000});
          this.$root.currentData = res.data;
            this.$router.push(this.$route.query.redirect || "/");
          } else {
            this.$notify.error({
              title: "错误",
              message: res.errmsg,
              offset: 140
            });
          }

        } else {
          this.$notify.error({
            title: "错误",
            message: "信息输入有误，请核对后重新提交",
          });
          return false;
        }
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container {
  width: 100%;
  position: relative;
}
.main {
  max-width: 368px;
  margin: 0 auto;
}
.el-card {
  margin-bottom: 48px;
}
.main .el-form-item {
  margin-bottom: 5px;
}
.main .el-form-item .el-select {
  width: 100%;
}
</style>
