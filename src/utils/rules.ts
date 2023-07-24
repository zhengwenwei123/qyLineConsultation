const mobileRules = [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
  ]
  
  const passwordRules = [
    { required: true, message: '请输入密码' },
    { pattern: /^\w{8,24}$/, message: '密码需8-24个字符' }
  ]
  const codeRules = [
    { required: true, message: '请输入验证码' },
    { pattern: /^\d{6}$/, message: '验证码6个数字' }
  ]
  const nameRules = [
    { required: true, message: '请输入姓名' },
    { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '中文2-16个字符' }
  ]
  
  const idCardRules = [
    { required: true, message: '请输入身份证号' },
    {
      pattern:
        /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
      message: '身份证号不正确'
    }
  ]
  export { mobileRules, passwordRules, codeRules,nameRules ,idCardRules}
