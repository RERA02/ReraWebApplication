$(document).on('click', '.mega-menu .dropdown-menu', function (e) {
  e.stopPropagation()
});

(function ($) {
    $(function () {
      // On click: remember the top-level parent menu <li> id for this tab
      $('#mega-menu-primary').on('click', 'a.mega-menu-link', function () {
        var $link = $(this);

        // Find the outermost ancestor li.mega-menu-item under #mega-menu-primary
        // Start from the li containing the clicked link:
        var $li = $link.closest('li.mega-menu-item');

        // If it's nested, get the outermost ancestor (the last in parents list)
        var $outer = $li.parents('li.mega-menu-item');
        if ($outer.length) {
          $li = $outer.last();
        }

        // Ensure the item has an id; if not, create a data marker (safer to give li an id server-side)
        var id = $li.attr('id');
        if (!id) {
          // fallback: generate an id and set it on the element (won't persist between page loads)
          id = 'mega-menu-gen-' + Math.random().toString(36).substr(2, 9);
          $li.attr('id', id);
        }

        // save chosen menu id in sessionStorage (per-tab)
        try {
          sessionStorage.setItem('megaActiveMenuId', id);
        } catch (e) {
          // storage may be disabled; ignore silently
        }

        // Note: we don't prevent default — allow navigation to proceed normally.
      });

      // On page load: apply saved active menu (if any). Otherwise fallback to URL-match logic.
      try {
        var savedId = sessionStorage.getItem('megaActiveMenuId');
      } catch (e) {
        var savedId = null;
      }

      function applyActiveById(id) {
        if (!id) return false;
        var $target = $('#' + id);
        if ($target.length) {
          $('#mega-menu-primary li').removeClass('mega-current-menu-ancestor');
          $target.addClass('mega-current-menu-ancestor');
          return true;
        }
        return false;
      }

      var applied = false;
      if (savedId) {
        applied = applyActiveById(savedId);
      }

      // If no saved id or saved id not found, fallback to URL matching:
      if (!applied) {
        var currentPath = window.location.pathname.toLowerCase();

        // Try exact href match first (covers /ProjectSearch and /ProjectSearch/?status=... variations)
        $('#mega-menu-primary a.mega-menu-link').each(function () {
          var href = $(this).attr('href');
          if (!href) return;

          // Normalize URLs (strip domain and trailing slash)
          var a = document.createElement('a');
          a.href = href;
          var linkPath = a.pathname.toLowerCase();

          if (linkPath === currentPath) {
            // Mark outermost parent of this link as active
            var $li = $(this).closest('li.mega-menu-item');
            var $outer = $li.parents('li.mega-menu-item');
            if ($outer.length) $li = $outer.last();

            $('#mega-menu-primary li').removeClass('mega-current-menu-ancestor');
            $li.addClass('mega-current-menu-ancestor');

            applied = true;
            return false; // break .each()
          }
        });
      }

      // Optional: clear saved id if user navigated to a different site root page (so stale id isn't used)
      // If you want to clear after applying once, uncomment:
      // if (applied) { try { sessionStorage.removeItem('megaActiveMenuId'); } catch(e){} }

      // Optional: clear the saved id when user clicks logout or specific links
      // $('#logoutLinkSelector').on('click', function(){ sessionStorage.removeItem('megaActiveMenuId'); });
    });
  })(jQuery);
