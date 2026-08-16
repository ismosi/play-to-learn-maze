import { useState } from "react";
import classes from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setUserInfo } from "../../Store/app.slice";

const Login = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((store) => store.app.userInfo);
  const navigate = useNavigate();

  // Form state
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    pwd: "",
    confirmPwd: "", // 用于注册时确认密码
  });

  // 处理输入变化
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 登录处理
  const handleLogin = () => {
    const { name, pwd } = formData;
    if (name === "" || pwd === "") {
      alert("用户名或密码不能为空");
      return;
    }
    if (userInfo?.name !== name || userInfo?.pwd !== pwd) {
      alert("用户名或者密码错误");
      setFormData({ name: "", pwd: "", confirmPwd: "" }); // 清空表单
      return;
    }
    alert("登录成功");
    const redirectUrl = localStorage.getItem("redirectAfterLogin") || "/";
    localStorage.removeItem("redirectAfterLogin"); // 登录后清除存储的目标页面
    navigate(redirectUrl); // 跳转到目标页面
  };

  // 注册处理
  const handleRegister = () => {
    const { name, pwd, confirmPwd } = formData;

    if (name === "" || pwd === "" || confirmPwd === "") {
      alert("所有字段都必须填写");
      return;
    }

    if (pwd !== confirmPwd) {
      alert("两次输入的密码不一致");
      return;
    }

    dispatch(
      setUserInfo({
        name,
        pwd,
      })
    );

    // 这里可以添加注册逻辑
    alert("注册成功");
    setIsLoginForm(true); // 注册成功后切换到登录表单
    setFormData({ name: "", pwd: "", confirmPwd: "" }); // 清空表单
  };

  return (
    <div className={classes.container2}>
      <div className={classes.container}>
        <div className={classes.loginWrapper}>
          <div className={classes.header}>迷宫游戏</div>

          <div className={classes.formWrapper}>
            <input
              type="text"
              name="name"
              placeholder="username"
              className={classes.inputItem}
              value={formData.name}
              onChange={handleInputChange}
            />

            <input
              type="password"
              name="pwd"
              placeholder="password"
              className={classes.inputItem}
              value={formData.pwd}
              onChange={handleInputChange}
            />

            {!isLoginForm && (
              <input
                type="password"
                name="confirmPwd"
                placeholder="confirm password"
                className={classes.inputItem}
                value={formData.confirmPwd}
                onChange={handleInputChange}
              />
            )}

            <div
              className={classes.btn}
              onClick={isLoginForm ? handleLogin : handleRegister}
            >
              {isLoginForm ? "登录" : "注册"}
            </div>

            <div
              className={classes.switchForm}
              onClick={() => {
                setIsLoginForm(!isLoginForm);
                setFormData({ name: "", pwd: "", confirmPwd: "" });
              }}
            >
              {isLoginForm ? "没有账号？点击注册" : "已有账号？点击登录"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
