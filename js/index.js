/**
 * Created by Administrator on 2016/3/23.
 */
$(function () {
    //轮播图
    banner();

    //tooltips
        $('[data-toggle="tooltip"]').tooltip();
    //初始化
    initTabs();

});
//轮播图
function banner(){
    /*
     * 1.通过ajax获取数据 图片
     * 2.判断屏幕的尺寸 $(window).width()
     * 3.再根据屏幕的尺寸 json转化渲染html字符串  两种方式（js拼接   模板引擎）
     * 4.渲染在页面当中 html
     * 5.响应屏幕的尺寸  来渲染当前的屏幕尺寸的图片  resize事件
     *
     *
     * */
    //缓存数据
    var myData='';
    //通过ajax获取数据
    var getData= function (callback) {
        //判断   如果数据已经存在  就不做请求
        if(myData){
            //返回已经存在的数据
            callback&&callback(myData);
            //短路
            return false;
        }
        $.ajax({
            //从html下加载 所以路径应该是：
            url:'js/index.json',
            type:'get',
            data:{},
            dataType:'json',
            success: function (data) {
                myData=data;
                callback&&callback(myData);
                console.log(data);

            }
        })
    }
    //根据屏幕的尺寸 json转化渲染html字符串  js拼接  模板引擎 arttemplate

    //获取数据
    //渲染
    var renderHtml= function () {
        //首先判断屏幕的尺寸
        //获取当前屏幕的尺寸
        var width=$(window).width();
        var isMobile=false;
        //在768下都认为时移动端
        if(width<768){
            isMobile=true;
        }
        getData(function (data) {
            //渲染html
            //拿到模板
            var templatePoint= _.template($('#template_point').html());
            var templateImage= _.template($('#template_image').html());
            //把数据传进去解析成html
            //以键值对的形式
            var pointHtml=templatePoint({model:data});
            var imageHtml=templateImage({model:{list:data,isMobile:isMobile}});
            console.log(imageHtml);
            //渲染在页面当中
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        });
    };
    //响应屏幕的尺寸  来渲染当前屏幕的尺寸下的图片  resize事件
    // trigger时jquery的立即触发这个传入的事件
    // trigger（reseze）立即触发了resize这个事件
    $(window).on('resize', function () {
        renderHtml();
    }).trigger('resize');

    //在移动端需要滑动
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var isMove=false;
    $('.wjs_banner').on('touchstart', function (e) {
        //在jquery中绑定touch事件的时候  返回的originalEvent 包含的是touchevent
        startX= e.originalEvent.touches[0].clientX;
    });
    $('.wjs_banner').on('touchmove', function (e) {
        //在jquery中绑定touch事件的时候  返回的originalEvent 包含的是touchevent
        moveX= e.originalEvent.touches[0].clientX;
        distanceX=moveX-startX;
        isMove=true;
    });
    $('.wjs_banner').on('touchend', function (e) {
        //在jquery中绑定touch事件的时候  返回的originalEvent 包含的是touchevent
        //滑动过50 的时候才换图
        if(isMove&&Math.abs(distanceX)>50){
            if(distanceX>0){
                $('.carousel').carousel('prev');

            }else{
                $('.carousel').carousel('next');
            }
        }
        //清零
        startX=0;
        moveX=0;
        distanceX=0;
        isMove=false;
    });
}


//初始化
function initTabs(){
    //父盒子
    var parent=$('.wjs_tabs_parent');
    var child = parent.find('ul');
    var lis = child.find('li');
    var width = 0;
    lis.each(function () {
        width += $(this).innerWidth()
    });
    console.log(width);
    child.width(width);


    //滑动
    itcast.iScroll({
        swioeDow:parent.get(0),
        swipeTyoe:'x',
        swipeDistance:60
    })
}















