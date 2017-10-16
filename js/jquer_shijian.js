(function() {
  $.fn.shijian = function(options) {
    function cPlugin(o) {
      var sjObj = o;
      //默认参数
      sjObj.defaults = {
        type: "time",
        Format: "yyyy-mm-dd", //显示时间格式//yyyy表示年份 ，mm月份 ，dd天数
        Order: 'yymmdd',
        width: 60, //
        height: 32,
        Year: true, //是否显示年//
        Month: true, //是否显示月//
        Day: true, //是否显示日//
        Hour: true, //是否显示小时
        Minute: false, //是否显示分钟
        Seconds: false, //是否显示秒
        yyArr: [], //年份数组
        mmArr: [], //月份数组
        ddArr: [], //天数数组
        hArr: [], //小时数组
        mArr: [], //分钟数组
        sArr: [], //分钟数组
        yyyy: "0000", //当前显示年
        mm: "00", //当前显示月
        dd: "00", //当前显示日
        h: "00", //当前显示小时
        m: "00", //当前显示分
        s: "00", //当前显示秒
        val: null, //最终显示时间
        yearText: "年", //顶部时间 年单位 文字
        monthText: "月", //顶部时间 月单位 文字
        dayText: '日期', //顶部时间 日单位 文字
        hourText: '时', //顶部时间 时单位 文字
        minuteText: '分', //顶部时间 分单位 文字
        secondsText: '秒', //顶部时间 秒单位 文字
        okText: "确认", //按钮确认键文字
        cancelText: "取消", //按钮取消键文字
        thisElm: null, //当前控制的dom
        showNowTime: true, //是否默认显示当前时间
        alwaysShow: false, //是否默认直接显示插件
        timeElm: null, //放时间插件的box
        onfun: function() { //取消改变时间时候执行事件

        },
        okfun: function() { //确认时间时候执行事件

        },
        t_box: null, //保存生产元素盒子
        df_persp: function() {
          return $("<div class='df-persp'><div class='persp-bg'></div>")
        },
        df_box: function() {
          return $("</div><div class='df-box " + (sjObj.opt.alwaysShow ? "alwaysShow" : "") + "' style='line-height:40px;'></div>")
        },
        df_main: function() {
          return $("<div class='df-main'>")
        },
        df_btn: function() {
          if (sjObj.opt.alwaysShow) {
            return
          }
          return $("<div class='df-btn' style='height:40px'><div class='df-ok'>" + sjObj.opt.okText + "</div><div class='df-no'>" + sjObj.opt.cancelText + "</div></div>")
        },
        df_wrap: function() {
          return $("<div class='df-wrap'><table><tbody><tr></tr></tbody></table></div>")
        },
        df_final: function() {
          return $("<div class='df-final'></div>")
        },
        getArr: function() {
          //按时间生成分钟，小时，月天数，月份

          var mydate = new Date();
          mydate.getFullYear(); //获取完整的年份(4位,1970-????)
          mydate.getMonth(); //获取当前月份(0-11,0代表1月)
          mydate.getDate(); //获取当前日(1-31)
          var seperator1 = "-";
          var month = mydate.getMonth() + 1;
          if (!options.mmArr) this.mmArr[0] = mydate.getMonth() + 1;

                var GetDateStr = function(AddDayCount) {
                  var dd = new Date();
                  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
                  var y = dd.getFullYear();
                  var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
                  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
                  return y + "-" + m + "-" + d;
                };
          for (var i = 0; i < 20; i++) {
            if (i < 20 && !options.ddArr) {
              this.ddArr[i] = GetDateStr(i);
            }

          }

          if (!options.hArr) this.hArr[0] = '11:00';
          if (!options.hArr) this.hArr[1] = '11:10';
          if (!options.hArr) this.hArr[2] = '11:20';
          if (!options.hArr) this.hArr[3] = '11:30';
          if (!options.hArr) this.hArr[4] = '11:40';
          if (!options.hArr) this.hArr[5] = '11:50';
          if (!options.hArr) this.hArr[6] = '12:00';
          if (!options.hArr) this.hArr[7] = '17:00';
          if (!options.hArr) this.hArr[8] = '17:10';
          if (!options.hArr) this.hArr[9] = '17:20';
          if (!options.hArr) this.hArr[10] = '17:30';
          if (!options.hArr) this.hArr[11] = '17:40';
          if (!options.hArr) this.hArr[12] = '17:50';
          if (!options.hArr) this.hArr[13] = '18:00';

          /* for(var i=0;i<6;i++){
		                    if(i<6&&!options.mArr)this.mArr[i]=i*10;
		                }*/
        },
        y: 1,
        nowTime: new Date(),
        startYear: null, //自定义开始年份
        endYear: null, //自定义结束年份
        ampmText: null, //上午下午
        //结构字符串生成
        dataNum: 0,
        strStart: function(text, c) {
          var df = this;
          var str;
          var text = text || "";
          console.log(this);
          if (df.width) {
            str = '<div class="df-class">' + text + '</div><div class="df-item " style="height:' + (df.height * 5 - 1) + 'px;min-width:' + df.width + 'px"><ul class="df-ul" data-class=' + c + '>';
          } else {
            str = '<div class="df-class">' + text + '</div><div class="df-item " style="height:' + (df.height * 5 - 1) + 'px"><ul class="df-ul" data-class=' + c + '>';
          }
          sjObj.opt.dataNum++;
          return str;
        },
        //拼接字符串结尾
        strEnd: function() {
          var df = this;
          return "</ul><div class='G-bg'><div class='G-top' style='height:" + (df.height * 2) + "px'></div><div class='G-mid' style='height:" + df.height + "px'></div><div class='G-btm' style='height:" + (df.height * 2) + "px'></div></div></div>"
        },
        //数字小于10 就在字前面+一个0
        fillZero: function(x) {
          if (x < 10) {
            return x = "0" + x;
          } else {
            return "" + x;
          }
        },
        //获取年份
        getYear: function() {
          if (!this.startYear && !options.yyArr) {
            var y = sjObj.opt.y || 10;
            nowTime = new Date();
            console.log()

            if (sjObj.opt.y < 0) {
              sjObj.opt.yyArr[0] = nowTime.getFullYear();
            } else {
              sjObj.opt.yyArr[0] = nowTime.getFullYear();
            }

            sjObj.opt.getArr()
            //console.log(this.yyArr);
            //console.log(this.mmArr);
            //console.log(this.ddArr);
            //console.log(this.hArr);
            //console.log(this.mArr);
          }
        },
        //核心内容居中
        setCenter: function() {
          var wid = $(window).width();
          var tabWid = null;
          var mWid = 0;
          $(".df-wrap table").each(function() {
            tabWid += parseFloat($(this).width());
          })
          if (tabWid > wid) {
            $(".df-wrap table").each(function() {
              mWid = parseFloat($(this).width()) > mWid ? parseFloat($(this).width()) : mWid;
            })
            $('.df-box').width(mWid);
          } else {
            $('.df-box').width(tabWid + 10)
          }
        },
        //返回数组组成的html字符串
        buildArrStr: function(Arr, txt, c) {
          var str = this.strStart(txt, c);
          $.each(Arr, function() {
            str += '<li class="df-li df-show"  data-val=' + sjObj.opt.fillZero(this) + ' style="line-height:' + sjObj.opt.height + 'px;height:' + sjObj.opt.height + 'px">' + sjObj.opt.fillZero(this) + '</li>'
          })
          console.log(Arr)
          str += sjObj.opt.strEnd();
          return str;
        },
        //创建html
        buildHTml: function() {
          var wrap = sjObj.opt.df_wrap();
          sjObj.opt.t_box = sjObj.opt.df_box();
          var main = sjObj.opt.df_main();
          var persp = sjObj.opt.df_persp();
          console.log(sjObj.opt.t_box);
          if (sjObj.opt.alwaysShow) {
            //  if(){
            // sjObj.opt.timeElm.append(persp.append(sjObj.opt.t_box.append(sjObj.opt.df_final).append(main.append(wrap)).append(sjObj.opt.df_btn)));
            //  }else{
            sjObj.opt.timeElm = eval(sjObj.opt.timeElm);
            console.log(sjObj.opt.timeElm)
            sjObj.opt.timeElm.append(sjObj.opt.t_box.append(main.append(wrap)));
            //  }
          } else {
            sjObj.opt.timeElm = $("<div class='df-persp'><div class='persp-bg'></div>");
            sjObj.opt.timeElm.append(sjObj.opt.t_box.append(sjObj.opt.df_final).append(main.append(wrap)).append(sjObj.opt.df_btn));
            $('body').append(sjObj.opt.timeElm)
            // $('body').append(persp.append(sjObj.opt.t_box.append(sjObj.opt.df_final).append(main.append(wrap)).append(sjObj.opt.df_btn)));
          }
          if (sjObj.opt.ampmText) {
            main.append("<div class='df-wrap'><table><tbody><tr><td>" + sjObj.opt.buildAmPmStr() + "</tr></tbody></table></div>")
          }
          if (sjObj.opt.Format == "dd-mm-yyyy") {
            if (sjObj.opt.Day) $(sjObj.opt.timeElm.find('.df-wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd") + "</td>");
            if (sjObj.opt.Month) $(sjObj.opt.timeElm.find('.df-wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>");
            if (sjObj.opt.Year) $(sjObj.opt.timeElm.find('df-wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>");
          } else if (sjObj.opt.Format == "mm-dd-yyyy") {
            if (sjObj.opt.Month) $(sjObj.opt.timeElm.find('.df-wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>");
            if (sjObj.opt.Day) $(sjObj.opt.timeElm.find('.df-wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd") + "</td>");
            if (sjObj.opt.Year) $(sjObj.opt.timeElm.find('.df-wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>");
          } else {
            if (sjObj.opt.Day) $(sjObj.opt.timeElm.find('.df-wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd") + "</td>");
          }
          if (sjObj.opt.Hour) {
            var eml = sjObj.opt.df_wrap();
            $(eml).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.hArr, sjObj.opt.hourText, "h") + "</td>")
            if (sjObj.opt.Minute) {
              $(eml).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mArr, sjObj.opt.minuteText, "m") + "</td>")
            };
            if (sjObj.opt.Seconds) {
              $(eml).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.sArr, sjObj.opt.secondsText, "m") + "</td>")
            }
            main.append(eml)
          };
          if (sjObj.opt.showNowTime) {
            if (sjObj.value) {
              console.log("input中有值")
              var str = sjObj.value
              if (str.length < 16) {
                console.log("长度小于16 补充年月日空白")
                str = "2000/01/01 " + str;
              }
              console.log("字符串转时间")
              var data = new Date(str.replace(/-/g, "/"));
            } else {
              var data = new Date();
            }
            console.log(data);
            var year = data.getFullYear();
            var month = data.getMonth() + 1;
            var day = data.getDate();
            var hours = data.getHours();
            var Minutes = data.getMinutes();
            console.log(year, month, day, hours, Minutes);
            console.log("是否显示年", sjObj.opt.Year)
            if (sjObj.opt.Year) sjObj.opt.timeElm.find("[data-class='yyyy'] .df-li").each(function() {
              console.log(parseInt($(this).attr("data-val")), parseInt(year))
              if (parseInt($(this).attr("data-val")) == parseInt(year)) {
                var pY = -($(this).index() - 2) * sjObj.opt.height;
                console.log(pY, year)
                $(this).parent().css({
                  "transform": "translate(0," + pY + "px)"
                })
              }
            })
            if (sjObj.opt.Month) sjObj.opt.timeElm.find("[data-class='mm'] .df-li").each(function() {
              if (parseInt($(this).attr("data-val")) == parseInt(month)) {
                var pY = -($(this).index() - 2) * sjObj.opt.height;
                console.log(pY, month)
                $(this).parent().css({
                  "transform": "translate(0," + pY + "px)"
                })
              }
            })
            if (sjObj.opt.Day) sjObj.opt.timeElm.find("[data-class='dd'] .df-li").each(function() {
              if (parseInt($(this).attr("data-val")) == parseInt(day)) {
                var pY = -($(this).index() - 2) * sjObj.opt.height;
                console.log(day)
                $(this).parent().css({
                  "transform": "translate(0," + pY + "px)"
                })
              }
            })
            if (sjObj.opt.Hour) sjObj.opt.timeElm.find("[data-class='h'] .df-li").each(function() {
              if (parseInt($(this).attr("data-val")) == parseInt(hours)) {
                var pY = -($(this).index() - 2) * sjObj.opt.height;
                //console.log(pY,Hour)
                $(this).parent().css({
                  "transform": "translate(0," + pY + "px)"
                })
              }
            })
            /*   if(sjObj.opt.Minute)sjObj.opt.timeElm.find("[data-class='m'] .df-li").each(function(){
                   if(parseInt($(this).attr("data-val"))==parseInt(Minutes)){
                       var pY=-($(this).index()-2)*sjObj.opt.height;
                       console.log(pY,Minutes,$(this).index(),this)
                       $(this).parent().css({"transform":"translate(0,"+pY+"px)"})
                   }
               })
               if(sjObj.opt.Seconds)sjObj.opt.timeElm.find("[data-class='m'] .df-li").each(function(){
                   if(parseInt($(this).attr("data-val"))==parseInt(Seconds)){
                       var pY=-($(this).index()-2)*sjObj.opt.height;
                       //console.log(pY)
                       $(this).parent().css({"transform":"translate(0,"+pY+"px)"})
                   }
               })*/
          } else {
            console.log("使用自定义时间")

            if (sjObj.opt.Day) sjObj.opt.timeElm.find("[data-class='dd'] .df-li").each(function() {
              if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.dd)) {
                var pY = -($(this).index() - 2) * sjObj.opt.height;
                //console.log(pY)
                $(this).parent().css({
                  "transform": "translate(0," + pY + "px)"
                })
              }
            })
            if (sjObj.opt.Hour) sjObj.opt.timeElm.find("[data-class='h'] .df-li").each(function() {
              if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.h)) {
                var pY = -($(this).index() - 2) * sjObj.opt.height;
                console.log(pY, sjObj.opt.h, $(this).index())
                $(this).parent().css({
                  "transform": "translate(0," + pY + "px)"
                })
              }
            })
            /* if(sjObj.opt.Minute)sjObj.opt.timeElm.find("[data-class='m'] .df-li").each(function(){
                 if(parseInt($(this).attr("data-val"))==parseInt(sjObj.opt.m)){
                     var pY=-($(this).index()-2)*sjObj.opt.height;
                     console.log(pY,sjObj.opt.m,$(this).index())
                     $(this).parent().css({"transform":"translate(0,"+pY+"px)"})
                 }
             })
             if(sjObj.opt.Seconds)sjObj.opt.timeElm.find("[data-class='m'] .df-li").each(function(){
                 if(parseInt($(this).attr("data-val"))==parseInt(sjObj.opt.s)){
                     var pY=-($(this).index()-2)*sjObj.opt.height;
                     //console.log(pY)
                     $(this).parent().css({"transform":"translate(0,"+pY+"px)"})
                 }
             })*/
            console.log("设置默认时间")
          }
          sjObj.opt.fillData();
          sjObj.opt.setCenter();
          sjObj.opt.bindFun();
        },
        //绑定事件
        bindFun: function() {
          //关闭事件
          sjObj.opt.timeElm.find(".df-no").on("click", function() {
            $(this).parent().parent().parent().remove();
            $("html").removeClass("ov_hi");
          })
          sjObj.opt.timeElm.find(".df-ok").on("click", function() {
            var str = "";
          
            if (sjObj.opt.Day) {
              str = str.replace("dd", sjObj.opt.dd) + " ";
            }
            str += sjObj.opt.h;
            sjObj.opt.val = str;
            console.log("我执行了没")
            $(sjObj.opt.thisElm).val(sjObj.opt.val);
            $(this).parent().parent().parent().remove();
            sjObj.opt.okfun();
            $("html").removeClass("ov_hi");
          })
          //滚动事件
          sjObj.opt.moveElm(sjObj.opt.timeElm.find(".G-bg"))
        },
        //将时间放入dom中
        fillData: function() {
          var str = "";

          if (sjObj.opt.Day) {
            str += sjObj.opt.dd + " "
          }
          str += sjObj.opt.h;

          if (!sjObj.opt.alwaysShow) {
            console.log("直接显示？", sjObj.opt.timeElm.find(".df-final"))
            sjObj.opt.timeElm.find(".df-final").html(str);
          } else {
            console.log("啊哈哈哈哈啊？", sjObj.opt.timeElm.find(".df-final"))
            //console.log($(sjObj.opt.thisElm));
            $(sjObj.opt.thisElm).html(str).val(str);
          }
        },
        //变量赋值监听
        vardata: function(name, val) {
          if (!val) {
            return;
          }
          if (sjObj.opt[name] != val) {
            sjObj.opt[name] = val;
            sjObj.opt.fillData();
          }
        },

        //获取当前日期
        getFinal: function() {
          var currentY = 0;
          var str = "";
          if (sjObj.opt.showNowTime) {
            sjObj.opt.timeElm.find(".df-ul").each(function() {
              currentY = getTranslateY(this);
              var dataClass = $(this).attr("data-class");
              var val = $($(this).find(".df-li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
              sjObj.opt.vardata(dataClass, val);
              console.log(dataClass, val)
              $(this).unbind("webkitTransitionEnd").on("webkitTransitionEnd", function() {
                currentY = getTranslateY(this);
                var val = $($(this).find(".df-li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                dataClass = $(this).attr("data-class");
                sjObj.opt.vardata(dataClass, val);
                sjObj.opt.daysJudge(dataClass);
              })
            })
          } else {
            sjObj.opt.timeElm.find(".df-ul").each(function() {
              currentY = getTranslateY(this);
              var dataClass = $(this).attr("data-class");
              var val = $($(this).find(".df-li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
              sjObj.opt.vardata(dataClass, val);
              console.log(dataClass, val)
              $(this).unbind("webkitTransitionEnd").on("webkitTransitionEnd", function() {
                currentY = getTranslateY(this);
                var val = $($(this).find(".df-li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                dataClass = $(this).attr("data-class");
                sjObj.opt.vardata(dataClass, val);
                sjObj.opt.daysJudge(dataClass);
              })
            })
          }
        },
        //根据时间判断当月天数
        daysJudge: function(name) {
          if (name == 'mm' || name == "yyyy") { //在选择年份获取天数时
            var day = new Date(sjObj.opt.yyyy, sjObj.opt.mm, 0).getDate();
            var l = sjObj.opt.timeElm.find('[data-class="dd"]').find(".df-show").length
            //console.log("dd长度",l,$('[data-class="dd"]'));
            var mubiao = day - l;
            if (mubiao > 0) {
              //console.log("大于");
              for (var i = 0; i < mubiao; i++) {
                $(sjObj.opt.timeElm.find('[data-class="dd"]').find(".df-li")[l + i]).removeClass("df-hide").addClass("df-show")
                //console.log($($('[data-class="dd"]').find(".df-li")[l-1+i]))
              }
            } else {
              //console.log("小于");
              var naomovey = getTranslateY(sjObj.opt.timeElm.find('[data-class="dd"]'))
              for (var i = 0; i > mubiao; i--) {
                //console.log($($('[data-class="dd"]').find(".df-li")[l-1+i]),l-1+i)
                $(sjObj.opt.timeElm.find('[data-class="dd"]').find(".df-li")[l - 1 + i]).removeClass("df-show").addClass("df-hide")
              }
              //console.log("当前y",naomovey,"目标y",(day-1-2)*sjObj.opt.height)
              if (naomovey > (day - 1 - 2) * sjObj.opt.height) {
                sjObj.opt.timeElm.find('[data-class="dd"]').css({
                  "transition": "all .5s"
                })
                sjObj.opt.timeElm.find('[data-class="dd"]').css({
                  "transform": "translate(0," + -(day - 1 - 2) * sjObj.opt.height + "px)"
                })
              }
            }
            //console.log("当月天数",day);
          };
        },
        //滚动事件绑定
        moveElm: function(eml) {
          //console.log("进入",eml)
          return $(eml).each(function() {
            //移动事件变量
            //console.log("进入",$(this))
            var sX = null,
              sY = null,
              mX = null,
              mY = null,
              eX = null,
              eY = null,
              sTime = null,
              eTime = null,
              mTime = null,
              nTime = null, //开始时间，结束时间，移动时的时间，开始到现在花费的时间
              nY = 0,
              drt = null,
              nowElm = null, //现在的Y位置。方向，当前元素
              canStart = true,
              canMove = false,
              canEnd = false, //移动事件条件。。
              emlLang = null, //子元素长度
              maxY = null,
              minY = null, //最大距离和最小距离
              lastY = null,
              nowY = null,
              moveY = null,
              stopInertiaMove = false, //是否停止惯性滚
              SE = null,
              ME = null,
              EE = null,
              moveCy = 0;
            var stop = function(e) {
              //Opera/Chrome/FF
              if (e.preventDefault)
                e.preventDefault();
              //IE
              e.returnValue = false;
            }
            //移动事件开始
            var moveStart = function(e) {
              console.log(e);
              stop(e);
              if (!canStart) {
                return
              }
              if (e.originalEvent.touches) {
                SE = e.originalEvent.targetTouches[0]
              } else {
                SE = e;
              }
              sX = SE.pageX;
              sY = SE.pageY;
              nowElm = $(this).prev(".df-ul");
              emlLang = nowElm.find(".df-show").length;
              lastY = sY;
              nY = getTranslateY(nowElm);
              console.log("移动开始时", e);
              sTime = new Date().getTime();
              if (!canMove && canEnd) {
                return false
              }
              canStart = false
              canMove = false;
              stopInertiaMove = true;
              $(window).on("touchmove", function(e) {
                if (stopInertiaMove) {
                  e.preventDefault();
                }
              })

            };
            var moveing = function(e) {
              stop(e);
              if (e.originalEvent.touches) {
                ME = e.originalEvent.targetTouches[0]
              } else {
                ME = e;
              }
              //console.log("移动中",ME,sjObj.opt.nY)
              mTime = new Date().getTime();
              mX = ME.pageX;
              mY = ME.pageY;
              drt = GetSlideDirection(sX, sY, mX, mY);
              if ((drt == 1 || drt == 2) && !canStart) {
                //console.log("条件允许移动")
                canMove = true;
                canEnd = true;
                stopInertiaMove = true;
              }
              if (canMove) {
                nowElm.css({
                  "transition": "none"
                })
                //console.log(sjObj.opt.nowElm,-(sjObj.opt.nY-(sjObj.opt.mY-sjObj.opt.sY)),sjObj.opt.mX,sjObj.opt.sX,sjObj.opt.nY)
                nowElm.css({
                  "transform": "translate(0," + -(nY - (mY - sY)) + "px)"
                })
                sjObj.opt.getFinal(); //获取当前值
              }
              if (mTime - sTime > 300) {
                console.log("移动后加速")
                sTime = mTime;
                lastY = mY;
              }
            };

            var moveEnd = function(e) {
              stop(e);
              if (e.originalEvent.touches) {
                EE = e.originalEvent.changedTouches[0]
              } else {
                EE = e;
              }
              //alert("松开鼠标")
              eX = EE.pageX;
              eY = EE.pageY;
              maxY = sjObj.opt.height * 2;
              minY = -(emlLang - 3) * sjObj.opt.height;
              if (canEnd) {
                canMove = false;
                canEnd = false;
                canStart = true;
                nY = -(nY - (mY - sY));
                nowY = eY;
                //console.log(lastY,nowY,"结束时")
                //console.log(sjObj.opt.nY,-(sjObj.opt.emlLang-2)*sjObj.opt.height)
                if (nY > maxY) {
                  nowElm.css({
                    "transition": "all .5s"
                  })
                  nowElm.css({
                    "transform": "translate(0," + maxY + "px)"
                  })
                } else if (nY < minY) {
                  nowElm.css({
                    "transition": "all .5s"
                  })
                  nowElm.css({
                    "transform": "translate(0," + minY + "px)"
                  })
                } else {
                  eTime = new Date().getTime();
                  var speed = ((nowY - lastY) / (eTime - sTime));
                  //console.log("移动距离",(nowY-lastY))
                  //console.log("移动时间",(eTime-sTime),sTime,eTime)
                  //console.log('移动速度',speed);
                  stopInertiaMove = false;
                  //惯性滚动函数
                  (function(v, startTime, contentY) {
                    var dir = v > 0 ? -1 : 1;
                    //加速度方向
                    var deceleration = dir * 0.001; //0.001 为减速时间
                    //console.log("移动方向",dir);
                    //console.log("减速率",deceleration);
                    function inertiaMove() {
                      if (stopInertiaMove)
                        return;
                      var nowTime = new Date().getTime();
                      var t = nowTime - startTime;
                      var nowV = v + t * deceleration;
                      //console.log("当期速度",nowV);
                      var moveY = (v + nowV) / 2 * t;
                      //console.log("当期移动距离",(contentY+moveY));
                      //console.log("当期停止条件",dir * nowV,dir,nowV);
                      if (dir * nowV > 0) { //大于0是减速停止
                        //	console.log("移动结束，总距离",moveCy)
                        //	console.log("移动结束，总距离除以高度",(moveCy/sjObj.opt.height))
                        //	console.log("移动结束，总距离%高度",moveCy%sjObj.opt.height)
                        if (moveCy > sjObj.opt.maxY) {
                          nowElm.css({
                            "transition": "all .5s"
                          })
                          sjObj.opt.nowElm.css({
                            "transform": "translate(0," + sjObj.opt.maxY + "px)"
                          })
                        } else if (moveCy < sjObj.opt.minY) {
                          nowElm.css({
                            "transition": "all .5s"
                          })
                          nowElm.css({
                            "transform": "translate(0," + sjObj.opt.minY + "px)"
                          })
                        } else {
                          var MC = Math.round(moveCy / sjObj.opt.height)
                          //		console.log(MC)
                          if (MC > 2) {
                            //			console.log("大于长度")
                            MC = 2
                          } else if (MC < -(emlLang - 1) + 2) {
                            //			console.log("小于长度+显示个数")
                            MC = -(emlLang - 1) + 2
                          }
                          nowElm.css({
                            "transition": "all .4s"
                          });
                          nowElm.css({
                            "transform": "translate(0," + sjObj.opt.height * MC + "px)"
                          })
                        }
                        sjObj.opt.getFinal();
                        //sjObj.opt.daysJudge();
                        return
                      }
                      moveCy = (contentY + moveY)
                      if (moveCy > (maxY + (sjObj.opt.height * 2))) {
                        nowElm.css({
                          "transition": "all .5s"
                        })
                        nowElm.css({
                          "transform": "translate(0," + maxY + "px)"
                        })
                        return
                      } else if (moveCy < (minY - (sjObj.opt.height * 2))) {
                        nowElm.css({
                          "transition": "all .5s"
                        })
                        nowElm.css({
                          "transform": "translate(0," + minY + "px)"
                        })
                        return
                      }
                      nowElm.css({
                        "transform": "translate(0," + moveCy + "px)"
                      })
                      sjObj.opt.getFinal();
                      var timers = setTimeout(inertiaMove, 10);
                    }
                    inertiaMove();
                  })(speed, eTime, nY);
                }
                console.log("移动结束", EE)
              }
            }
            console.log("开始绑定事件", $(this))
            $(this).unbind("touchstart mousedown").on("touchstart mousedown", moveStart) //触摸起始//鼠标按下
            $(this).unbind("touchmove").on("touchmove", moveing) //触摸移动
            $(this).unbind("touchend").on("touchend", moveEnd) //触摸结束
            $(document).on("mousemove", moveing) //鼠标按下后移动中
            $(document).on("mouseup", moveEnd) //鼠标松开

          })
        },
      }
      sjObj.opt = $.extend({}, sjObj.defaults, options);
      var GetSlideAngle = function(dx, dy) { //判断角度
        return Math.atan2(dy, dx) * 180 / Math.PI;
      }

      var GetSlideDirection = function(startX, startY, endX, endY) { //判读手指滑动方向
        var dy = startY - endY;
        var dx = endX - startX;
        var result = 0;
        //如果滑动距离太短
        if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
          return result;
        }
        var angle = GetSlideAngle(dx, dy);
        if (angle >= -45 && angle < 45) {
          result = 4; //右
        } else if (angle >= 45 && angle < 135) {
          result = 1; //上
        } else if (angle >= -135 && angle < -45) {
          result = 2; //下
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
          result = 3; //左
        }
        return result;
      };
      var getTranslateY = function(eml) {
        var matrix = $(eml).css("transform");
        console.log("获取到的transform", matrix)
        var T;
        if (matrix == "none") {
          T = 0;
        } else {
          var arr = matrix.split(",")
          T = -(arr[5].split(")")[0]);
        }
        console.log("返回的transform", T)
        return T
      }
      sjObj.innt = function() {
        if (!sjObj.opt.alwaysShow) {
          $(this).on("click", function() {
            sjObj.opt.thisElm = this;
            switch (sjObj.opt.type) {
              case "time":
                $("html").addClass("ov_hi");
                $(this).blur(); //失去焦点
                sjObj.opt.getYear(); //获取年份
                sjObj.opt.buildHTml();
                sjObj.opt.getFinal();
                break;
            }
          })
          //$(this).val(sjObj.opt.time)
        } else {
          sjObj.opt.thisElm = this;
          console.log("直接显示")
          sjObj.opt.getYear(); //获取年份
          sjObj.opt.buildHTml();
        }
        $(window).on("resize", function() {
          console.log("窗口大小改变")
          sjObj.opt.setCenter()
        })
      }
      sjObj.innt();
      return sjObj
    }
    if (this.length > 1) {
      console.log("多个")
      var arr = []
      $.each(this, function() {
        arr.push(cPlugin(this))
      })
      return arr
    } else {
      console.log("一个")
      obj = cPlugin(this);
      console.log("一个时间对象", obj);
      return obj
    }
  }
})(jQuery)
