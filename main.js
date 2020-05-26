//获取所有buttons
let $buttons = $('#buttonWrapper>button')
let $slides= $('#slides');
let $images = $slides.children('img')
let current=0;

makeFakeSlides()
$slides.css({transform:'translateX(-300px)'})
bindEvents()

$('#previous').on('click',function () {
    goToSlide(current-1)
})
$('#next').on('click',function () {
    goToSlide(current+1)
})

let timer=setInterval(function () {
    goToSlide(current+1)
},2000)

$('.container').on('mouseenter',function () {
    window.clearInterval(timer)
}).on('mouseleave',function () {
    timer=setInterval(function () {
        goToSlide(current+1)
    },2000)
})

function bindEvents(){
    $('#buttonWrapper').on('click', 'button',function (e) {
        let $button= $(e.currentTarget)
        let index= $button.index() //点的第几个button
        goToSlide(index)
    })
   /* $buttons.eq(0).on('click',function () {
        if(current==2){
            console.log("从最后到第一")
            $slides.css({transform: 'translateX(-1200px)'})
                .one('transitionend',function () {
                    $slides.hide()
                        .offset()
                    $slides.css({transform: 'translateX(-300px)'})
                        .show()
                })
        }else{
            $slides.css({transform: 'translateX(-300px)'})
        }
        current=0
    })
    $buttons.eq(1).on('click',function () {
        $slides.css({transform: 'translateX(-600px)'})
        current=1
    })
    $buttons.eq(2).on('click',function () {
        if(current==0){
            console.log("从第一到最后")
            $slides.css({transform: 'translateX(0px)'})
                .one('transitionend',function () {
                    $slides.hide()
                        .offset()
                    $slides.css({transform: 'translateX(-900px)'})
                        .show()
                })
        }else{
            $slides.css({transform: 'translateX(-900px)'})
            current=2
        }
    })*/
}
function goToSlide(index) {
    if(index>$buttons.length-1){
        index=0
    }else if (index<0){
        index=$buttons.length-1
    }
    if(current===$buttons.length-1 && index===0){
        //表示从最后一张到第一张
        $slides.css({transform: `translateX(${-($buttons.length+1)*300}px)`})
            .one('transitionend',function () {
                $slides.hide()
                    .offset()
                $slides.css({transform: `translateX(${-(index+1)*300}px)`})
                    .show()
            })

    }else if(current===0 && index=== $buttons.length-1){
        //表示从第一张到最后一张
        $slides.css({transform: 'translateX(0px)'})
            .one('transitionend',function () {
                $slides.hide().offset()
                $slides.css({transform: `translateX(${-(index+1)*300}px)`})
                    .show()
            })

    }else{
        $slides.css({transform: `translateX(${-(index+1)*300}px)`})
    }
    current=index
}



function makeFakeSlides(){
    let $firstCopy= $images.eq(0).clone(true)
    console.log($firstCopy[0].outerHTML)
    let $lastCopy=$images.eq($images.length-1).clone(true)
    console.log($lastCopy[0].outerHTML)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}