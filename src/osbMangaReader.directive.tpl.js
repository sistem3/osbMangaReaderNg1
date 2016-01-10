angular.module('osb-manga-reader-template', ['osbMangaReader.tpl.html']);

angular.module("osbMangaReader.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("osbMangaReader.tpl.html",
    "<section class=\"container\">\n" +
    "  <!-- Main Nav Starts -->\n" +
    "  <div class=\"row\">\n" +
    "    <nav class=\"col-md-12 main-nav\">\n" +
    "      <ul class=\"list-unstyled list-inline col-md-7\">\n" +
    "        <!--<li ng-hide=\"osbMangaReader.settings.hideMenu\">\n" +
    "          <button class=\"btn btn-primary\"><i class=\"fa fa-sign-in\"></i></button>\n" +
    "        </li>-->\n" +
    "        <li ng-hide=\"osbMangaReader.settings.hideMenu\">\n" +
    "          <button class=\"btn btn-primary\" ng-click=\"osbMangaReader.functions.getSiteMangaList()\">Site Favourites <i class=\"fa fa-diamond\"></i></button>\n" +
    "        </li>\n" +
    "        <li ng-hide=\"osbMangaReader.settings.hideMenu\">\n" +
    "          <button class=\"btn btn-primary\" ng-click=\"osbMangaReader.functions.getMangaList()\">All Titles <i class=\"fa fa-list\"></i></button>\n" +
    "        </li>\n" +
    "        <li ng-hide=\"osbMangaReader.settings.hideMenu\">\n" +
    "          <input class=\"form-control\" type=\"text\" ng-model=\"searchTerm\" placeholder=\"Search titles...\">\n" +
    "        </li>\n" +
    "        <li ng-hide=\"osbMangaReader.settings.hideMenu\">\n" +
    "          <button class=\"btn btn-primary\" ng-click=\"osbMangaReader.functions.searchMangaTitles(searchTerm)\"><i class=\"fa fa-search\"></i></button>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <button class=\"btn btn-primary\" ng-click=\"osbMangaReader.settings.hideMenu = !osbMangaReader.settings.hideMenu\"><i class=\"fa fa-chevron-left\" ng-class=\"{'fa-chevron-left': !osbMangaReader.settings.hideMenu, 'fa-chevron-right': osbMangaReader.settings.hideMenu}\"></i></button>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <div class=\"col-md-5\">\n" +
    "        <ul class=\"list-unstyled list-inline pull-right\" ng-if=\"osbMangaReader.settings.defaultView == 'manga-viewer'\">\n" +
    "          <li>Chapter: <span ng-bind=\"osbMangaReader.settings.viewer.chapterNumber\"></span> | Page: <span ng-bind=\"osbMangaReader.settings.viewer.pageNumber\"></span>/<span ng-bind=\"osbMangaReader.settings.viewer.totalPageNumber\"></span></li>\n" +
    "          <li>\n" +
    "            <button class=\"btn btn-primary bookmark\" ng-click=\"osbMangaReader.functions.setBookmark()\"><i class=\"fa fa-bookmark-o\"></i></button>\n" +
    "          </li>\n" +
    "          <li ng-show=\"osbMangaReader.settings.viewer.bookmarkActive\">\n" +
    "            <button class=\"btn btn-primary\" ng-hide=\"osbMangaReader.settings.viewer.noLessBookmarks\" ng-click=\"osbMangaReader.functions.goToPrevBookMark()\"><i class=\"fa fa-chevron-left\"></i></button>\n" +
    "            <button class=\"btn btn-primary\" ng-hide=\"osbMangaReader.settings.viewer.noMoreBookmarks\" ng-click=\"osbMangaReader.functions.goToBookMark()\"><i class=\"fa fa-chevron-right\"></i></button>\n" +
    "          </li>\n" +
    "          <!--<li ng-show=\"osbMangaReader.settings.viewer.showTools\"><button class=\"btn btn-primary magnify\"><i class=\"fa fa-search-plus\"></i></button></li>\n" +
    "          <li ng-show=\"osbMangaReader.settings.viewer.showTools\"><button class=\"btn btn-primary two-up\"><i class=\"fa fa-columns\"></i></button></li>\n" +
    "          <li ng-show=\"osbMangaReader.settings.viewer.showTools\"><button class=\"btn btn-primary full-screen\"><i class=\"fa fa-expand\"></i></button></li>\n" +
    "          <li><button class=\"btn btn-primary full-screen\" ng-click=\"osbMangaReader.settings.viewer.showTools = !osbMangaReader.settings.viewer.showTools\"><i class=\"fa fa-cogs\"></i></button></li>-->\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </nav>\n" +
    "  </div>\n" +
    "  <!-- Main Nav Ends -->\n" +
    "  <!-- Credits Starts -->\n" +
    "  <div class=\"row credits\" ng-class=\"{'visible': !osbMangaReader.settings.hideMenu, 'invisible': osbMangaReader.settings.hideMenu}\">\n" +
    "    <div class=\"col-md-6\"><small>Powered by MangaScraper API and MangaReader.net</small></div>\n" +
    "  </div>\n" +
    "  <!-- Credits Ends -->\n" +
    "  <!-- Manga List Starts -->\n" +
    "  <section ng-if=\"osbMangaReader.settings.defaultView == 'manga-list'\" class=\"mangaList\">\n" +
    "    <div infinite-scroll=\"osbMangaReader.functions.showMoreManga()\" infinite-scroll-disabled=\"osbMangaReader.settings.mangaListLoading\" infinite-scroll-distance=\"2\">\n" +
    "      <ul class=\"list-unstyled\">\n" +
    "        <li ng-repeat=\"manga in osbMangaReader.settings.mangaList | limitTo: osbMangaReader.settings.mangaListAmount\" class=\"row mangaTitle\">\n" +
    "          <article class=\"container-fluid\">\n" +
    "            <div class=\"col-md-2 col-sm-4 col-xs-12 mainImage\"><img ng-src=\"{{manga.cover}}\" class=\"img-responsive center-block\" /></div>\n" +
    "            <div class=\"col-md-10 col-sm-8 col-xs-12\">\n" +
    "              <h2 ng-bind=\"manga.name\"></h2>\n" +
    "              <p ng-bind-html=\"manga.info\"></p>\n" +
    "              <button class=\"btn btn-primary\" ng-click=\"osbMangaReader.functions.getMangaTitle(manga.mangaId)\">View Manga Info <i class=\"fa fa-info-circle\"></i></button>\n" +
    "              <button class=\"btn btn-primary\">Add to favourites <i class=\"fa fa-heart-o\"></i></button>\n" +
    "              <button class=\"btn btn-primary\" ng-click=\"osbMangaReader.functions.getMangaChapter(manga.mangaId, 1)\">Start Reading <i class=\"fa fa-book\"></i></button>\n" +
    "            </div>\n" +
    "          </article>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "  <!-- Manga List Ends -->\n" +
    "  <!-- Manga Site Picks Starts -->\n" +
    "  <section ng-if=\"osbMangaReader.settings.defaultView == 'manga-site-picks'\" class=\"mangaList\">\n" +
    "    <ul class=\"list-unstyled\">\n" +
    "      <li ng-repeat=\"manga in osbMangaReader.settings.mangaSitePicksList\" class=\"row mangaTitle\">\n" +
    "        <article class=\"container-fluid\">\n" +
    "          <div class=\"col-md-2 col-sm-4 col-xs-12 mainImage\"><img ng-src=\"{{manga.cover}}\" class=\"img-responsive center-block\" /></div>\n" +
    "          <div class=\"col-md-10 col-sm-8 col-xs-12\">\n" +
    "            <h2 ng-bind=\"manga.name\"></h2>\n" +
    "            <p ng-bind-html=\"manga.info\"></p>\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"osbMangaReader.functions.getMangaTitle(manga.mangaId)\">View Manga Info <i class=\"fa fa-info-circle\"></i></button>\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"osbMangaReader.functions.setFavourite(manga.mangaId)\">Add to favourites <i class=\"fa fa-heart-o\"></i></button>\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"osbMangaReader.functions.getMangaChapter(manga.mangaId, 1)\">Start Reading <i class=\"fa fa-book\"></i></button>\n" +
    "          </div>\n" +
    "        </article>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </section>\n" +
    "  <!-- Manga Site Picks Ends -->\n" +
    "  <!-- Manga Title Starts -->\n" +
    "  <section ng-if=\"osbMangaReader.settings.defaultView == 'manga-title'\" class=\"mangaTitle\">\n" +
    "    <article>\n" +
    "      <div class=\"col-md-3 mainImage\">\n" +
    "        <img ng-src=\"{{osbMangaReader.settings.mangaTitle.cover}}\" class=\"img-responsive\">\n" +
    "      </div>\n" +
    "      <div class=\"col-md-9\">\n" +
    "        <h2 ng-bind=\"osbMangaReader.settings.mangaTitle.name\"></h2>\n" +
    "        <nav class=\"form-inline\">\n" +
    "          <label for=\"chapterSelect\">Chapter: </label>\n" +
    "          <select id=\"chapterSelect\" class=\"form-control\" ng-model=\"osbMangaReader.settings.mangaTitle.chapter\" ng-options=\"item.name for item in osbMangaReader.settings.mangaTitle.chapters\"></select>\n" +
    "          <button class=\"btn btn-primary\"><i class=\"fa fa-chevron-right\"></i></button>\n" +
    "        </nav>\n" +
    "        <p ng-bind-html=\"osbMangaReader.settings.mangaTitle.info\"></p>\n" +
    "        <p>Date released: <span ng-bind=\"osbMangaReader.settings.mangaTitle.yearOfRelease\"></span></p>\n" +
    "        <!--<p>Last Updated: <span ng-bind=\"osbMangaReader.settings.mangaTitle.yearOfRelease | date: 'mediumDate'\"></span></p>-->\n" +
    "        <p>Status: <span ng-bind=\"osbMangaReader.settings.mangaTitle.status\"></span></p>\n" +
    "        <!--<p>Author: <span ng-repeat=\"authors in osbMangaReader.settings.mangaTitle\"><span ng-bind=\"author.key\"></span></span></p>-->\n" +
    "      </div>\n" +
    "    </article>\n" +
    "  </section>\n" +
    "  <!-- Manga Title Ends -->\n" +
    "  <!-- Manga Viewer Starts -->\n" +
    "  <section ng-if=\"osbMangaReader.settings.defaultView == 'manga-viewer'\">\n" +
    "    <article class=\"mangaViewer swiper-container\">\n" +
    "      <div class=\"swiper-wrapper\">\n" +
    "        <div ng-repeat=\"page in osbMangaReader.settings.mangaChapter.pages\" class=\"swiper-slide mangaPage\">\n" +
    "          <img ng-src=\"{{page.url}}\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </article>\n" +
    "  </section>\n" +
    "  <!-- Manga Viewer Ends -->\n" +
    "  <!-- Manga Search Results Starts -->\n" +
    "  <section ng-if=\"osbMangaReader.settings.defaultView == 'manga-results'\">\n" +
    "    <ul class=\"list-unstyled\">\n" +
    "      <li ng-repeat=\"item in osbMangaReader.settings.searchResults\" class=\"row mangaTitle\">\n" +
    "        <article class=\"container-fluid\">\n" +
    "          <div class=\"col-md-2 col-sm-4 col-xs-12\"><img ng-src=\"{{item.cover}}\" class=\"img-responsive\" /></div>\n" +
    "          <div class=\"col-md-10 col-sm-8 col-xs-12\">\n" +
    "            <h2 ng-bind=\"item.name\"></h2>\n" +
    "            <p ng-bind-html=\"item.info\"></p>\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"osbMangaReader.functions.getMangaTitle(manga.mangaId)\">View Manga Info <i class=\"fa fa-info-circle\"></i></button>\n" +
    "            <button class=\"btn btn-primary\">Add to favourites <i class=\"fa fa-heart-o\"></i></button>\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"osbMangaReader.functions.getMangaChapter(manga.mangaId, 1)\">Start Reading <i class=\"fa fa-book\"></i></button>\n" +
    "          </div>\n" +
    "        </article>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </section>\n" +
    "  <!-- Manga Search Results Ends -->\n" +
    "  <!-- Manga Loading Icon Starts -->\n" +
    "  <section ng-if=\"osbMangaReader.settings.defaultView == 'manga-loading'\" class=\"mangaLoader\">\n" +
    "    <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "  </section>\n" +
    "  <!-- Manga Loading Icon Ends -->\n" +
    "</section>\n" +
    "");
}]);
