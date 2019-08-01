$(document).ready(function () {
    var lunbopar = $('.lunbopar') // 包装轮播图的父盒子
    var ullunbo = $('.ullunbo') // 包含轮播图的 ul 元素
    var UlWidth = ullunbo.width(); // ul 元素宽度
    var outWidth = lunbopar.width()


    $('.ollunbo li').first().addClass('on')

    // 定义一个全局索引，可以显示不同的原点
    var index = 0

    function focus(index) {
        $('.ollunbo li').removeClass('on')
        $('.ollunbo li').eq(index).addClass('on')
    }

    // 自动
    function runLunBo() {

        if (index < $('.licircle').length - 1) {
            ullunbo.animate({
                left: "-=" + outWidth + "px"
            }, 700)
            index++
            focus(index)
            
        } else if (index === $('.licircle').length - 1) {
            index = 0
            focus(index)
            // 先将整个 ul left值归于0
            ullunbo.css({
                left: '0'
            })
            // 然后开始移动
            ullunbo.animate({
                left: "-=" + outWidth + "px"
            }, 700)

        }
    }
    //runLunBo()

    // // 自动轮播 设定一个定时器
    var timer = setInterval(runLunBo, 1500)

    // 点击下一张按钮，需要判断是否
    var state = true
    $('.lunbo_right').click(function () {
        if (state) {
            state = false
            clearInterval(timer)
            if (index < $('.licircle').length - 1) {

                ullunbo.animate({
                    left: "-=" + outWidth + "px"
                }, 500, function () {
                    state = true
                })
                //console.log(state)
                index++
                focus(index)
                console.log(index)
                timer = setInterval(runLunBo, 1500)
            } else if (index === $('.licircle').length - 1) {

                index = 0
                // 先将整个 ul left值归于0
                ullunbo.css({
                    left: '0'
                })
                // 然后开始移动
                ullunbo.animate({
                    left: "-=" + outWidth + "px"
                }, 700, function () {
                    state = true
                })
                focus(index)
                timer = setInterval(runLunBo, 1500)
            }
        }
        // clearInterval(timer)


    })
    $('.lunbo_left').click(function(){
        if(state){
            state = false
            clearInterval(timer)
            if(index <= $('.licircle').length - 1 && index > 0){
                index--
                ullunbo.animate({
                    left: "+=" + outWidth + "px"
                }, 700, function () {
                    state = true
                })
                focus(index)
                timer = setInterval(runLunBo, 1500)
            }else if(index === 0){
                index = $('.licircle').length-1
                ullunbo.css({
                    left: "-"+outWidth*($('.licircle').length+1)+"px"
                })
                ullunbo.animate({
                    left:"+="+outWidth+"px"
                }, 700, function () {
                    state = true
                })
                focus(index)
                timer = setInterval(runLunBo, 1500)
            }
        }

    })

    // 给每个焦点添加点击事件
    $('.ollunbo > li').click(function () {
        // 获取点击焦点索引
        var thisIndex = $(this).index()
        // 如果点击焦点索引 > 当前索引
        if (thisIndex > index) {
            // ullunbo.css({
            //     left:(index+1)*outWidth+'px'
            // })
            clearInterval(timer)
            ullunbo.animate({
                left: '-=' + outWidth * (thisIndex - index) + 'px'
            }, 500)

            index = thisIndex
            focus(index)
            timer = setInterval(runLunBo, 1500)
        } else if (thisIndex < index) {
            
            clearInterval(timer)
            ullunbo.animate({
                left: "+=" + outWidth * (index - thisIndex) + "px"
            }, 500)
            index = thisIndex
            focus(index)
            timer = setInterval(runLunBo, 1500)
        }
    })

    // 鼠标悬停会停止
    $('.banner').mouseover(function(){
        clearInterval(timer)
        $('.lunbo_left').css({
            'display':'block'
        })
        $('.lunbo_right').css({
            'display':'block'
        })
    })

    // 鼠标离开会继续播放
    $('.banner').mouseout(function(){
        $('.lunbo_left').css({
            'display':'none'
        })
        $('.lunbo_right').css({
            'display':'none'
        })
        clearInterval(timer)
        timer = setInterval(runLunBo, 1500)
    })
})