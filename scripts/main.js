(function(){
  function getPrefix(){
    return window.location.pathname.includes('/pages/') ? '..' : '.';
  }

  function inject(id, url){
    return fetch(url)
      .then(function(res){return res.text();})
      .then(function(html){
        var target = document.getElementById(id);
        if (target) {
          target.innerHTML = html;
        }
      });
  }

  function init(){
    var prefix = getPrefix();
    Promise.all([
      inject('site-header', prefix + '/header.html'),
      inject('site-footer', prefix + '/footer.html')
    ]).then(function(){
      window.toggleMobileNav = function(){
        var nav = document.getElementById('mobileNav');
        if (!nav) return;
        nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
      };
    }).catch(function(){
      // fail silently if partials are missing
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
