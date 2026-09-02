jQuery(document).ready(function($) {
    function switch_style(themeName) {
        $('body').removeClass('default-theme low-contrast');
        $('body').addClass(themeName);
        localStorage.setItem('selectedTheme', themeName);
    }

    var savedTheme = localStorage.getItem('selectedTheme') || 'default-theme';
    switch_style(savedTheme);

    $('.colorTheme a').on('click', function(e) {
        e.preventDefault();
        var themeName = $(this).data('theme');
        switch_style(themeName);
    });
});
