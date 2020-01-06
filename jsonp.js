// JSONP:
// 缺点： JSONP只能发起GET请求
/**
 * JSONP请求工具
 * @param url 请求的地址
 * @param data 请求的参数
 * @returns {Promise<any>}
 */
const request = ({url, data}) => {
    return new Promise((resolve, reject) => {
      // 处理传参成xx=yy&aa=bb的形式
      const handleData = (data) => {
        const keys = Object.keys(data)
        const keysLen = keys.length
        return keys.reduce((pre, cur, index) => {
          const value = data[cur]
          const flag = index !== keysLen - 1 ? '&' : ''
          return `${pre}${cur}=${value}${flag}`
        }, '')
      }
      // 动态创建script标签
      const script = document.createElement('script')
      // 接口返回的数据获取
      window.jsonpCb = (res) => {
        document.body.removeChild(script)
        delete window.jsonpCb
        resolve(res)
      }
      script.src = `${url}?${handleData(data)}&cb=jsonpCb`
      document.body.appendChild(script)
    })
  }
  // 使用方式
  request({
    url: 'http://localhost:9871/api/jsonp',
    data: {
      // 传参
      msg: 'helloJsonp'
    }
  }).then(res => {
    console.log(res)
  })

//   空iframe加form,实现POST请求
const requestPost = ({url, data}) => {
    // 首先创建一个用来发送数据的iframe.
    const iframe = document.createElement('iframe')
    iframe.name = 'iframePost'
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    const form = document.createElement('form')
    const node = document.createElement('input')
    // 注册iframe的load事件处理程序,如果你需要在响应返回时执行一些操作的话.
    iframe.addEventListener('load', function () {
      console.log('post success')
    })
  
    form.action = url
    // 在指定的iframe中执行form
    form.target = iframe.name
    form.method = 'post'
    for (let name in data) {
      node.name = name
      node.value = data[name].toString()
      form.appendChild(node.cloneNode())
    }
    // 表单元素需要添加到主文档中.
    form.style.display = 'none'
    document.body.appendChild(form)
    form.submit()
  
    // 表单提交后,就可以删除这个表单,不影响下次的数据发送.
    document.body.removeChild(form)
  }
  // 使用方式
  requestPost({
    url: 'http://localhost:9871/api/iframePost',
    data: {
      msg: 'helloIframePost'
    }
  })


//   3.CORS
// CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）跨域资源共享 CORS 详解。
// 看名字就知道这是处理跨域问题的标准做法。CORS有两种请求，简单请求和非简单请求。

// 前端什么也不用干，就是正常发请求就可以，如果需要带cookie的话，前后端都要设置一下

// 4.代理   Nginx出场了
server{
    # 监听9099端口
    listen 9099;
    # 域名是localhost
    server_name localhost;
    #凡是localhost:9099/api这个样子的，都转发到真正的服务端地址http://localhost:9871 
    location ^~ /api {
        proxy_pass http://localhost:9871;
    }    
}

// JSONP安全性问题
// CSRF攻击
// 前端构造一个恶意页面，请求JSONP接口，收集服务端的敏感信息。如果JSONP接口还涉及一些敏感操作或信息（比如登录、删除等操作），那就更不安全了。
// 解决方法：验证JSONP的调用来源（Referer），服务端判断Referer是否是白名单，或者部署随机Token来防御。



