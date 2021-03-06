//index.js
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data: {
    nowTemp: '12°C',
    nowWeather: '晴天',
    nowWeatherBackground: '',
    forecast: []
  },
  //跳转事件
  bindViewTap: function() {
    wx.navigateTo({
      url: '../timer/timer'
    })
  },

  onPullDownRefresh() {
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })
  },

  onLoad() {
    this.getNow()
  },

  getNow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '广州市'
      },
      success: res  => {
        console.log(res.data);
        let result = res.data.result;
        let temp = result.now.temp;
        let weather = result.now.weather;
        console.log(temp, weather);
        this.setData({
          nowTemp: temp + '°C',
          nowWeather: weatherMap[weather],
          nowWeatherBackground: '/images/' + weather + '-bg.png'
        }),

        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather]
        });

        let forecast = [];
        let nowHour = new Date().getHours()
        for (var i = 0; i < 24; i += 3) {
          forecast.push({
            time: (i + nowHour) % 24 + "时",
            iconPath: '/images/sunny-icon.png',
            temp: "12°"
          })
        }
        forecast[0].time = '现在';
        this.setData({
          forecast: forecast
        })
      },
      complete: ()=> {
        callback && callback()
      }
    })
  }
})
