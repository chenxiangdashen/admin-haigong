import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Row, Col, message } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { login } from '../../actions/auth'
import './index.less'


const propTypes = {
  user: PropTypes.object,
  loggingIn: PropTypes.bool,
  loginErrors: PropTypes.string
};

class Login extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  handleSubmit (data) {
    this.setState({
      loading: true
    });
    this.props.login(data.username, data.password).payload.promise.then(res => {
      this.setState({
        loading: false
      });
      if (res.error) {
        message.error(res.payload.response.data.message);
      }
      if (!res.error && res.payload.data)  {
        message.success('Welcome ' + res.payload.data.name);
        this.props.history.replace('/');
      }
    }).catch(err => {
      this.setState({
        loading: false
      });
    })
  }

  toRegister () {
    this.props.history.replace('/register');
  }

  render () {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const tailLayout = {
      wrapperCol: { offset: 6, span: 18 },
    };
    const onFinish = values => {
      console.log('Success:', values);
      this.handleSubmit(values)
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return (
      <Row className="login-row" type="flex" justify="space-around" align="middle">
        <Col span="8">
          <Form
              className='login-form'
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
          >
            <h2 className="logo"><span>logo</span></h2>
            <Form.Item
                label="登录名"
                name="username"
                rules={[{ message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <p>
                <Button className="btn-login" type='primary' size="large" loading={this.state.loading} htmlType='submit'>登录</Button>
              </p>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    )
  }
}

Login.propTypes = propTypes;

// Login = Form.create()(Login);

function mapStateToProps(state) {
  const {auth} = state;
  if (auth.user) {
      return {user: auth.user, loggingIn: auth.loggingIn, loginErrors: ''};
  }

  return {user: null, loggingIn: auth.loggingIn, loginErrors: auth.loginErrors};
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
