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

'use strict';

angular.module('sistem3.osb-manga-reader', ['osb-manga-reader-template'])
  .directive('osbMangaReader', ['$http', '$timeout', 'localStorageService', function ($http, $timeout, localStorageService) {
    return {
      templateUrl: 'app/osbMangaReader/osbMangaReader.html',
      restrict: 'EA',
      link: function ($scope, $element) {
        console.log('Adding Manga Reader');
        /*-- Init object --*/
        $scope.osbMangaReader = {};
        /*-- Init Settings --*/
        // App Settings
        $scope.osbMangaReader.settings = {
          'baseUrl': 'https://doodle-manga-scraper.p.mashape.com/',
          'defaultSite': 'mangareader.net',
          'apiKey': 'xiQSdA9ACbmshUxnm4ZBC8nn2umSp1LeqQfjsnnVeMWHHSIQy0',
          'mangaList': [],
          'mangaListAmount': 30,
          'mangaListLoading': true,
          'mangaSitePicksList': [],
          'mangaSitePicksPopulated': false,
          'mangaChapterLoading': true,
          'defaultView': 'manga-loading',
          'hideMenu': false,
          'osbFavourites': [
            {title: '20th Century Boys', id: '20th-century-boys'},
            {title: 'Akira', id: 'akira'},
            {title: 'Attack on Titan', id: 'shingeki-no-kyojin'},
            {title: 'Battle Angel Alita: Last Order', id: 'battle-angel-alita-last-order'},
            {title: 'Beelzebub', id: 'beelzebub'},
            {title: 'Bleach', id: 'bleach'},
            {title: 'Claymore', id: 'claymore'},
            {title: 'D-Gray Man', id: 'd-gray-man'},
            {title: 'Deadman Wonderland', id: 'deadman-wonderland'},
            {title: 'Fairy Tail', id: 'fairy-tail'},
            {title: 'Gantz', id: 'gantz'},
            {title: 'Naruto', id: 'naruto'},
            {title: 'One Piece', id: 'one-piece'},
            {title: 'Soul Eater', id: 'soul-eater'},
            {title: 'Vagabond', id: 'vagabond'}
          ]
        };
        // User settings
        $scope.osbMangaReader.settings.user = {
          'hasBookmarks': false,
          'bookmarks': [],
          'hasFavourites': false,
          'favourites': []
        };
        // Viewer Settings
        $scope.osbMangaReader.settings.mangaTitle = '';
        $scope.osbMangaReader.settings.viewer = {
          'pageNumber': 0,
          'totalPageNumber': 0,
          'chapterNumber': 0,
          'chapterName': 0,
          'showTools': false,
          'isReading': false,
          'bookmarkActive': false,
          'bookmarkActiveNumber': 0,
          'noMoreBookmarks': false,
          'noLessBookmarks':  false,
          'titleBookmarks': []
        };
        // Slider Params
        $scope.osbMangaReader.settings.viewer.sliderParams = {
          'slidesPerView': 1,
          'keyboardControl': true,
          'preloadImages': false,
          'lazyLoading': true
        };
        // Swiper Callback functions
        $scope.osbMangaReader.settings.viewer.sliderParams.onSlideChangeEnd = function(swiper) {
          $scope.osbMangaReader.settings.viewer.pageNumber = swiper.activeIndex + 1;
          $scope.$apply();
        };
        $scope.osbMangaReader.settings.viewer.sliderParams.onReachEnd = function() {
          console.log('Reaching the end brah');
          $scope.osbMangaReader.settings.viewer.chapterNumber = $scope.osbMangaReader.settings.viewer.chapterNumber + 1;
          $scope.osbMangaReader.functions.getMangaChapter($scope.osbMangaReader.settings.mangaTitle, $scope.osbMangaReader.settings.viewer.chapterNumber);
        };
        $scope.osbMangaReader.settings.viewer.sliderParams.onInit = function(swiper) {
          $scope.osbMangaReader.settings.viewer.totalPageNumber = swiper.slides.length - 1;
          $scope.$apply();
        };
        /*-- Main Functions --*/
        $scope.osbMangaReader.functions = {};
        $scope.osbMangaReader.functions.checkUniqueBookmark = function(bookmark, bookmarks) {
          var isUnique = true;
          angular.forEach(bookmarks, function(key) {
            if (key.name == bookmark.name && key.page == bookmark.page && key.chapter == bookmark.chapter) {
              isUnique = false;
            }
          });
          return isUnique;
        };
        // Set Bookmark
        $scope.osbMangaReader.functions.setBookmark = function() {
          //console.log('Save that page brah');
          var newBookMark = {
            title: $scope.osbMangaReader.settings.mangaTitle,
            chapter: $scope.osbMangaReader.settings.viewer.chapterNumber,
            page: $scope.osbMangaReader.settings.viewer.pageNumber - 1
          };
          if (!$scope.osbMangaReader.settings.user.hasBookmarks) {
            //console.log('Add intial bookmark brah');
            $scope.osbMangaReader.settings.user.hasBookmarks = true;
            $scope.osbMangaReader.settings.user.bookmarks.push(newBookMark);
            localStorageService.set('mangaReader.bookmark', $scope.osbMangaReader.settings.user.bookmarks);
            $scope.osbMangaReader.functions.checkBookmark(newBookMark.title);
          } else {
            //console.log('Is this unique brah');
            // Check if unique then add
            if ($scope.osbMangaReader.functions.checkUniqueBookmark(newBookMark, $scope.osbMangaReader.settings.user.bookmarks)) {
              //console.log('Add unique brah');
              $scope.osbMangaReader.settings.user.bookmarks.push(newBookMark);
              localStorageService.set('mangaReader.bookmark', $scope.osbMangaReader.settings.user.bookmarks);
              $scope.osbMangaReader.functions.checkBookmark(newBookMark.title);
            }
          }
        };
        // Get Bookmark
        $scope.osbMangaReader.functions.getBookmarks = function() {
          //console.log('Getting bookmarks brah');
          $scope.osbMangaReader.settings.user.bookmarks = localStorageService.get('mangaReader.bookmark');
          if (!$scope.osbMangaReader.settings.user.bookmarks) {
            $scope.osbMangaReader.settings.user.bookmarks = [];
            $scope.osbMangaReader.settings.user.hasBookmarks = false;
          } else {
            $scope.osbMangaReader.settings.user.hasBookmarks = true;
          }
        };
        // Check Bookmarks
        $scope.osbMangaReader.functions.checkBookmark = function(title) {
          //console.log('Check for bookmarks');
          if (!title === $scope.osbMangaReader.settings.mangaTitle) {
            $scope.osbMangaReader.settings.viewer.bookmarkActive = false;
          } else {
            angular.forEach($scope.osbMangaReader.settings.user.bookmarks, function(key, value) {
              if (key.title === title && $scope.osbMangaReader.settings.viewer.titleBookmarks.indexOf(key) == -1) {
                $scope.osbMangaReader.settings.viewer.titleBookmarks.push(key);
                $scope.osbMangaReader.settings.viewer.bookmarkActive = true;
              }
            });
            $scope.osbMangaReader.functions.getBookmarkStatus();
          }
        };
        // GoTo Bookmark
        $scope.osbMangaReader.functions.goToBookMark = function() {
          //console.log('Go to bookmark brah');
          // Check if there are Bookmarks coming up
          if ($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber] === null ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber] === '' ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber] === undefined) {
            //console.log('Aint no more brah');
            return false;
          }
          $scope.osbMangaReader.functions.getBookmarkStatus();
          // Check if Bookmark is in Next Chapter
          if ($scope.osbMangaReader.settings.viewer.chapterNumber < $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].chapter) {
            console.log('Load next chapter');
            $scope.osbMangaReader.functions.getMangaChapter(
              $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].title,
              $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].chapter,
              $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].page
            );
            if (!$scope.osbMangaReader.settings.viewer.noMoreBookmarks) {
              $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber = $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber + 1;
            }
          }
          // If is the same Chapter goTo Slide
          if ($scope.osbMangaReader.settings.viewer.pageNumber - 1 < $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].page &&
            $scope.osbMangaReader.settings.viewer.chapterNumber === $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].chapter) {
            console.log('Load next page');
            // Get next Bookmark
            $scope.osbMangaReader.mangaView.slideTo($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].page);
            if (!$scope.osbMangaReader.settings.viewer.noMoreBookmarks) {
              $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber = $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber + 1;
            }
          }
        };
        // GoTo Prev Bookmark
        $scope.osbMangaReader.functions.goToPrevBookMark = function() {
          //console.log('Go to previous bookmark brah');
          // Check if Bookmark is in Next Chapter
          console.log($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1]);
          if ($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === null ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === '' ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === undefined) {
            //console.log('Aint no more brah');
            return false;
          }
          $scope.osbMangaReader.functions.getBookmarkStatus();
          if ($scope.osbMangaReader.settings.viewer.chapterNumber > $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].chapter) {
            console.log('Load next chapter');
            $scope.osbMangaReader.functions.getMangaChapter(
              $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].title,
              $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].chapter,
              $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].page
            );
            if (!$scope.osbMangaReader.settings.viewer.noLessBookmarks) {
              $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber = $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1;
            }
          }
          // If is the same Chapter goTo Slide
          if ($scope.osbMangaReader.settings.viewer.pageNumber - 1 > $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].page &&
            $scope.osbMangaReader.settings.viewer.chapterNumber === $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].chapter) {
            console.log('Load next page');
            // Get next Bookmark
            $scope.osbMangaReader.mangaView.slideTo($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].page);
            if (!$scope.osbMangaReader.settings.viewer.noLessBookmarks) {
              $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber = $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1;
            }
          }
        };
        // Get Bookmark Status
        $scope.osbMangaReader.functions.getBookmarkStatus = function() {
          //console.log('Get Bookmark status brah');
          if ($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === null ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === '' ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === undefined ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === -1) {
            console.log('No less');
            $scope.osbMangaReader.settings.viewer.noLessBookmarks = true;
          } else {
            $scope.osbMangaReader.settings.viewer.noLessBookmarks = false;
          }

          if ($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber + 1] === null ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber + 1] === '' ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber + 1] === undefined) {
            console.log('No more');
            $scope.osbMangaReader.settings.viewer.noMoreBookmarks = true;
          } else {
            $scope.osbMangaReader.settings.viewer.noMoreBookmarks = false;
          }
        };
        // Set Favourite
        $scope.osbMangaReader.functions.setFavourite = function(title) {
          if (!$scope.osbMangaReader.settings.user.hasFavourites) {
            //console.log('Add intial bookmark brah');
            $scope.osbMangaReader.settings.user.hasFavourites = true;
            $scope.osbMangaReader.settings.user.favourites.push(title);
            localStorageService.set('mangaReader.favourites', $scope.osbMangaReader.settings.user.favourites);
            //$scope.osbMangaReader.functions.checkBookmark(newBookMark.title);
          } else {
            //console.log('Is this unique brah');
            // Check if unique then add
            if ($scope.osbMangaReader.settings.user.favourites.indexOf(title) == -1) {
              //console.log('Add unique brah');
              $scope.osbMangaReader.settings.user.favourites.push(title);
              localStorageService.set('mangaReader.favourites', $scope.osbMangaReader.settings.user.favourites);
              //$scope.osbMangaReader.functions.checkBookmark(newBookMark.title);
            }
          }
        };
        // Get Favourites
        $scope.osbMangaReader.functions.getFavourites = function() {
          $scope.osbMangaReader.settings.user.favourites = localStorageService.get('mangaReader.favourites');
          if (!$scope.osbMangaReader.settings.user.favourites) {
            $scope.osbMangaReader.settings.user.favourites = [];
            $scope.osbMangaReader.settings.user.favourites = false;
          } else {
            $scope.osbMangaReader.settings.user.favourites = true;
          }
        };
        // Check if favourite
        $scope.osbMangaReader.functions.checkForFavourite = function(title) {
          console.log('Check if ya got some favourites brah');
        };
        // Get Main Manga List
        $scope.osbMangaReader.functions.getMangaList = function() {
          //console.log('Getting Manga List');
          $scope.osbMangaReader.settings.defaultView = 'manga-loading';
          $scope.osbMangaReader.settings.viewer.isReading = false;
          $http.get(
            $scope.osbMangaReader.settings.baseUrl + $scope.osbMangaReader.settings.defaultSite,
            {
              headers:{'X-Mashape-Authorization': $scope.osbMangaReader.settings.apiKey},
              params: {'cover':'1','info':'1'}
            }
          ).success(function (data) {
              //console.log(data);
              $scope.osbMangaReader.settings.defaultView = 'manga-list';
              $scope.osbMangaReader.settings.mangaListLoading = false;
              $scope.osbMangaReader.settings.mangaList = data;
          });
        };
        // Show more Manga List
        $scope.osbMangaReader.functions.showMoreManga = function() {
          //console.log('Show me more manga brah');
          $scope.osbMangaReader.settings.mangaListAmount = $scope.osbMangaReader.settings.mangaListAmount + 30;
        };
        // Get Site Favourites Titles
        $scope.osbMangaReader.functions.getSiteFavourites = function() {
          $scope.osbMangaReader.settings.mangaSitePicksPopulated = true;
          angular.forEach($scope.osbMangaReader.settings.osbFavourites, function(key) {
            $http.get(
              $scope.osbMangaReader.settings.baseUrl + $scope.osbMangaReader.settings.defaultSite + '/manga/' + key.id,
              {
                headers:{'X-Mashape-Authorization': $scope.osbMangaReader.settings.apiKey}
              }
            ).success(function (data) {
                data.mangaId = key.id;
                $scope.osbMangaReader.settings.mangaSitePicksList.push(data);
                $scope.osbMangaReader.settings.defaultView = 'manga-site-picks';
              });
          });
        };
        // Get Site Favourites List
        $scope.osbMangaReader.functions.getSiteMangaList = function() {
          //console.log('Where my Manga at brah');
          $scope.osbMangaReader.settings.defaultView = 'manga-loading';
          $scope.osbMangaReader.settings.viewer.isReading = false;
          if (!$scope.osbMangaReader.settings.mangaSitePicksPopulated) {
            $scope.osbMangaReader.functions.getSiteFavourites();
          } else {
            $scope.osbMangaReader.settings.defaultView = 'manga-site-picks';
          }
        };
        // Get Manga Title
        $scope.osbMangaReader.functions.getMangaTitle = function(title) {
          //console.log('Get me some manga info brah');
          $scope.osbMangaReader.settings.defaultView = 'manga-loading';
          $scope.osbMangaReader.settings.viewer.isReading = false;
          $http.get(
            $scope.osbMangaReader.settings.baseUrl + $scope.osbMangaReader.settings.defaultSite + '/manga/' + title,
            {
              headers:{'X-Mashape-Authorization': $scope.osbMangaReader.settings.apiKey}
            }
          ).success(function (data) {
              //console.log(data);
              $scope.osbMangaReader.settings.mangaTitle = data;
              $scope.osbMangaReader.settings.defaultView = 'manga-title';
            });
        };
        // Init Slider
        $scope.osbMangaReader.functions.initSlider = function() {
          $timeout(function(){
            $scope.osbMangaReader.mangaView = new Swiper($element.find('.swiper-container'), $scope.osbMangaReader.settings.viewer.sliderParams);
          }, 250);
        };
        // Get Manga Chapter
        $scope.osbMangaReader.functions.getMangaChapter = function(title, chapter, page) {
          console.log('Show me some manga brah');
          $scope.osbMangaReader.settings.defaultView = 'manga-loading';
          // GoTo Page if needed
          if (page) {
            $scope.osbMangaReader.settings.viewer.sliderParams.initialSlide = page;
          } else {
            $scope.osbMangaReader.settings.viewer.sliderParams.initialSlide = 0;
          }
          // Check for bookmarks
          $scope.osbMangaReader.functions.checkBookmark(title);
          // Destroy Slider if not defined
          if ($scope.osbMangaReader.mangaView) {
            $scope.osbMangaReader.mangaView.destroy();
          }
          $scope.osbMangaReader.settings.mangaTitle = title;
          $scope.osbMangaReader.settings.viewer.pageNumber = 1;
          $scope.osbMangaReader.settings.viewer.chapterNumber = chapter;
          $scope.osbMangaReader.settings.viewer.isReading = true;
          $http.get(
            $scope.osbMangaReader.settings.baseUrl + $scope.osbMangaReader.settings.defaultSite + '/manga/' + title + '/' + chapter,
            {
              headers:{'X-Mashape-Authorization': $scope.osbMangaReader.settings.apiKey}
            }
          ).success(function (data) {
              //console.log(data);
              $scope.osbMangaReader.settings.mangaChapterLoading = false;
              $scope.osbMangaReader.settings.mangaChapter = data;
              $scope.osbMangaReader.settings.defaultView = 'manga-viewer';
              $scope.osbMangaReader.functions.initSlider();
            });
        };
        // Search Manga Titles
        $scope.osbMangaReader.functions.searchMangaTitles = function(title) {
          console.log('Find me some manga brah');
          $scope.osbMangaReader.settings.defaultView = 'manga-loading';
          $scope.osbMangaReader.settings.viewer.isReading = false;
          $http.get(
            $scope.osbMangaReader.settings.baseUrl + $scope.osbMangaReader.settings.defaultSite + '/search',
            {
              headers:{'X-Mashape-Authorization': $scope.osbMangaReader.settings.apiKey},
              params: {'cover':'1','info':'1', 'q': title}
            }
          ).success(function (data) {
              //console.log(data);
              $scope.osbMangaReader.settings.searchResults = data;
              $scope.osbMangaReader.settings.defaultView = 'manga-results';
            });
        };
        // Set isReading
        $scope.osbMangaReader.functions.setIsReading = function () {
          var isReading = {
            reading: $scope.osbMangaReader.settings.viewer.isReading,
            title: $scope.osbMangaReader.settings.mangaTitle,
            chapter: $scope.osbMangaReader.settings.viewer.chapterNumber,
            page: $scope.osbMangaReader.settings.viewer.pageNumber
          };
          localStorageService.set('mangaReader.reading', isReading);
        };
        // Init App
        $scope.osbMangaReader.functions.initMangaReader = function() {
          //console.log('Start it up brah');
          $scope.osbMangaReader.functions.getSiteMangaList();
          $scope.osbMangaReader.functions.getBookmarks();
        };
        $scope.osbMangaReader.functions.initMangaReader();
      }

    };
  }]);
