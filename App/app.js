!function () {
    GoTop.init($(".body"));

    let pageIndex = 1,
        index = 1,
        target = '',
        $searchBtn = $('.search-btn'),
        $input = $('.search-input'),
        $lists = $('.lists'),
        $item = $('.item'),
        $load = $('.load-more'),
        $info = $('.info'),
        $infoWrapper = $('.info-wrapper'),
        $reminder = $('.reminder'),
        $loadimg = $('.load-img'),
        BScroll = window.BScroll;

    $searchBtn.click(function () {
        pageIndex = 1;
        $info.html('');
        $lists.empty(); // 初次查询清空之前的
        $loadimg.fadeIn(100)
        $reminder.fadeOut(300)
        $infoWrapper.hide();
        $searchBtn.prop('disabled', true);
        target = $input.val();
        getPage(pageIndex, target);
    });

    $load.click(function (e) {
        e.preventDefault();
        $info.html('');
        $loadimg.fadeIn(200);
        $infoWrapper.hide();
        $searchBtn.prop('disabled', true);
        pageIndex += 1;
        target = $input.val();
        getPage(pageIndex, target);
    })

    function getPage(pageIndex, target) {
        $.ajax({
            url: 'getPage',
            type: 'get',
            data: {
                pageIndex: pageIndex,
                target: target
            },
            success: (data) => {
                $loadimg.hide()
                $searchBtn.prop('disabled', false);
                console.log(data, pageIndex);
                if (data.length === 0) {
                    $infoWrapper.fadeIn(200);
                    $load.show();
                    $info.html('第' + pageIndex + '页 没有与 “' + target + '” 有关的房源信息');
                } else {
                    $load.show();
                    data.forEach(function (e) {
                        let html = tplHtml(e, index);
                        $lists.append(html);
                        let itemIndex = 'item' + index;
                        new BScroll(`.${itemIndex} .pic-wrapper`, {
                            scrollX: true,
                            eventPassthrough: 'vertical'
                        })
                        index++;
                    })
                }
            },
            error: (error) => {
                console.log(error)
            }
        })
    }

    function tplHtml(data, index) {
        let html;
        let pic = ``;
        let details = data.details.length > 0 ? data.details : '';
        let picture = data.picture.length > 0 ? data.picture : '';
        if (picture) {
            for (let i = 0; i < picture.length; i++) {
                pic += `<li><img src="${picture[i]}" class="pic" alt="#"></li>`;
            }
        }
        html = `
      <li class="item${index} item">
        <h3><a href="${data.url}" target="_blank">${data.title}</a></h3>
        <p class="details">${details}</p>
        <div class="pic-wrapper">
            <ul style="width: ${picture.length * 100 + (picture.length - 1) * 8}px" class="pic-content">
                 ${pic}
            </ul>
        </div>
      </li>
`;
        return html;
    }
}()