<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="dataForm.userName" placeholder="登录帐号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {isEmail, isMobile} from '@/utils/validate'

  import roleRequest from '@/api/sys/role'
  import userRequest from '@/api/sys/user'

  export default {
    data () {
      let validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      };
      let validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.password !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      };
      let validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      };
      let validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      };
      return {
        visible: false,
        roleList: [],
        dataForm: {
          id: 0,
          userName: '',
          password: '',
          comfirmPassword: '',
          salt: '',
          email: '',
          mobile: '',
          roleIdList: [],
          status: 1
        },
        dataRule: {
          userName: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          comfirmPassword: [
            {validator: validateComfirmPassword, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {validator: validateEmail, trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '手机号不能为空', trigger: 'blur'},
            {validator: validateMobile, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      init (id) {
        let _this = this;
        _this.dataForm.id = id || 0;
        roleRequest.selectRole().then(data => {
          _this.roleList = data && data.code === 0 ? data.list : [];
        }).then(() => {
          _this.visible = true;
          _this.$nextTick(() => {
            _this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (_this.dataForm.id) {
            userRequest.getUserInfo(_this.dataForm.id).then(data => {
              if (data && data.code === 0) {
                _this.dataForm.userName = data.user.username;
                _this.dataForm.salt = data.user.salt;
                _this.dataForm.email = data.user.email;
                _this.dataForm.mobile = data.user.mobile;
                _this.dataForm.roleIdList = data.user.roleIdList;
                _this.dataForm.status = data.user.status;
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        let _this = this;
        _this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let params = {
              'userId': _this.dataForm.id || undefined,
              'username': _this.dataForm.userName,
              'password': _this.dataForm.password,
              'salt': _this.dataForm.salt,
              'email': _this.dataForm.email,
              'mobile': _this.dataForm.mobile,
              'status': _this.dataForm.status,
              'roleIdList': _this.dataForm.roleIdList
            };
            userRequest.saveOrUpdateUser(_this.dataForm.id, params).then(data => {
              if (data && data.code === 0) {
                _this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    _this.visible = false;
                    _this.$emit('refreshDataList')
                  }
                })
              } else {
                _this.$message.error(data.msg)
              }
            });
          }
        })
      }
    }
  }
</script>
