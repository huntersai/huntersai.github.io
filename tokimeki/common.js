(function($){
  // ブレークポイント
  const break_point = 992;
  // 可視幅
  const effective_width = 1100;
  // PageTopリンク
  const $pagetop = $('#page-top');
  // 非表示コンテンツ
  const $contents = $('#contents');
  
  const lpUtil = {
    //ブラウザ判定
    getBrowser: function() {
      const ua = window.navigator.userAgent.toLowerCase();
      const ver = window.navigator.appVersion.toLowerCase();
      let name = 'unknown';
      if (ua.indexOf("msie") != -1) {
        if (ver.indexOf("msie 6.") != -1) {
          name = 'ie ie6';
        } else if (ver.indexOf("msie 7.") != -1) {
          name = 'ie ie7';
        } else if (ver.indexOf("msie 8.") != -1) {
          name = 'ie ie8';
        } else if (ver.indexOf("msie 9.") != -1) {
          name = 'ie ie9';
        } else if (ver.indexOf("msie 10.") != -1) {
          name = 'ie ie10';
        } else {
          name = 'ie';
        }
      } else if (ua.indexOf('trident/7') != -1) {
        name = 'ie ie11';
      } else if (ua.indexOf('chrome') != -1) {
        name = 'chrome';
      } else if (ua.indexOf('safari') != -1) {
        name = 'safari';
      } else if (ua.indexOf('opera') != -1) {
        name = 'opera';
      } else if (ua.indexOf('firefox') != -1) {
        name = 'firefox';
      }
      return name;
    },

    // アニメーション初期化
    init_animation: function() {
      AOS.init();
    },

    // アコーディオン
    init_accordion: function() {
      $contents.on('shown.bs.collapse', function () {
        const speed = 500;
        $("html, body").animate({scrollTop:$(this).offset().top}, speed, "swing");
        AOS.init(); // コンテンツ表示直後にAOS再初期化
      })
    },

    // スムーススクロール
    init_smoothscroll: function() {
      $('a[href^="#"]').not('.no-link').click(function(){
        const speed = 500;
        const offset = 25;
        const href= $(this).attr("href");
        const target = $(href == "#" || href == "" ? 'html' : href);
        const position = target.offset().top - offset;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
      });
    },

    // 画像保護
    init_protection: function() {
      $('img').each(function(){
        $(this)
          .attr('onmousedown', 'return false')
          .attr('onselectstart', 'return false')
          .attr('oncontextmenu', 'return false');
      });
    },

    // 画像サイズ自動計算
    init_autofit: function() {
      $(window).on('load resize scroll', function() {
        const winW = $(this).width();
        $('img[autofit]').each(function(){
          // ブレークポイント以下
          if (winW < break_point) {
            const img = $(this)[0];
            const nW = img.naturalWidth;
            const nH = img.naturalHeight;
            if (/*nW < winW*/ false) {
              $(this).css({
                objectFit: 'unset',
                width: 'auto',
                height: 'auto',
              });
            } else {
              if (nW < effective_width) {
                $(this).css({
                  objectFit: 'cover',
                  width: 'auto',
                  height: 'calc(100vw * (' + nH + ' / ' + effective_width + '))',
                });
              } else {
                $(this).css({
                  objectFit: 'cover',
                  width: '100%',
                  height: 'calc(100vw * (' + nH + ' / ' + effective_width + '))',
                });
              }
            }
          }
          // ブレークポイント以上
          else {
            /*
            $(this).css({
              objectFit: 'unset',
              width: 'auto',
              height: 'auto',
            });*/
            $(this).attr('style','');
          }
        });
      });
    },

    // PageTopに戻る
    init_pagetop: function() {
      const threshold = 100;
      $(window).on('load resize scroll', function(){
        if ($(this).scrollTop() > threshold) {
          $('#page-top').addClass('show');
        } else {
          $('#page-top').removeClass('show');
        }
      });
    },
    
    // カウントダウン
    init_count: function() {
      /*
      $('.countdown').each(function(){
        const $target   = $(this);
        const count     = 1 * 60 * 60 * 1000;
        const startTime = (new Date()).getTime();
        const endText   = '終了準備中';
        let timerID     = 0;
        function tickCount() {
          const currentTime = (new Date()).getTime();
          const passedTime  = currentTime - startTime;
          if (passedTime < count) {
            $target.html([
              String('0' + Math.floor((count - passedTime) / 1000 / 60) % 60).slice(-2),
              String('0' + Math.floor((count - passedTime) / 1000) % 60).slice(-2),
              String('0' + Math.floor(count - passedTime) % 1000).slice(-2),
            ].join(':'));
            timerID = setTimeout(tickCount, 100);
          } else {
            clearTimeout(timerID);
            $target.html(endText);
          }
        }
        tickCount();
      });
      */
      $('.countdown').each(function(){
        const $target   = $(this);
        const count     = 1 * 60 * 60 * 1000;
        const startTime = (new Date()).getTime();
        const endText   = '終了準備中';
        let timerID     = 0;
        function tickCount() {
          const currentTime = (new Date()).getTime();
          const passedTime  = currentTime - startTime;
          if (passedTime < count) {
            $target.html([
              String('0' + Math.floor((count - passedTime) / 1000 / 60 / 60) % 60).slice(-2),
              String('0' + Math.floor((count - passedTime) / 1000 / 60) % 60).slice(-2),
              String('0' + Math.floor((count - passedTime) / 1000) % 60).slice(-2),
            ].join(':'));
            timerID = setTimeout(tickCount, 100);
          } else {
            clearTimeout(timerID);
            $target.html(endText);
          }
        }
        tickCount();
      });
    },

    // ページ読み込み完了イベント
    init: function() {
      // ブラウザ判定クラス追加
      $("html").addClass(this.getBrowser());
      // 各種初期化
      this.init_animation();
      this.init_accordion();
      this.init_smoothscroll();
      this.init_protection();
      this.init_autofit();
      this.init_pagetop();
      this.init_count();
    }
  }

  lpUtil.init();

})(jQuery);